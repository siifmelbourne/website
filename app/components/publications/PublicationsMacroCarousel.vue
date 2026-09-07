<script setup lang="ts">
import useEmblaCarousel from 'embla-carousel-vue'
import type { EmblaCarouselType } from 'embla-carousel'

const props = defineProps<{
  slides: string[]
  altBase: string
}>()

const emit = defineEmits<{
  slideChange: [index: number]
}>()

// This intentionally mirrors the Embla implementation used by the existing
// SIIF Macro Markets page. The carousel itself owns the drag/scroll state,
// rather than relying on native scrollLeft calculations.
const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: false,
  containScroll: 'trimSnaps',
  align: 'start'
})


const disableOverscroll = (api: EmblaCarouselType) => {
  const {
    limit,
    target,
    location,
    offsetLocation,
    scrollTo,
    translate,
    scrollBody
  } = api.internalEngine()

  let edge: number | null = null

  if (location.get() >= limit.max) edge = limit.max
  if (location.get() <= limit.min) edge = limit.min

  if (edge !== null) {
    offsetLocation.set(edge)
    location.set(edge)
    target.set(edge)
    translate.to(edge)
    translate.toggleActive(false)
    scrollBody.useDuration(0).useFriction(0)
    scrollTo.distance(0, false)
  } else {
    translate.toggleActive(true)
  }
}

const selectedIndex = ref(0)
const canScrollPrev = ref(false)
const canScrollNext = ref(false)

const updateCarouselState = (api: EmblaCarouselType) => {
  selectedIndex.value = api.selectedScrollSnap()
  canScrollPrev.value = api.canScrollPrev()
  canScrollNext.value = api.canScrollNext()
  emit('slideChange', selectedIndex.value)
}

const scrollPrev = () => emblaApi.value?.scrollPrev()
const scrollNext = () => emblaApi.value?.scrollNext()
const scrollTo = (index: number) => emblaApi.value?.scrollTo(index)

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    scrollPrev()
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    scrollNext()
  }
}

watch(
  emblaApi,
  (api, previousApi) => {
    if (previousApi) {
      previousApi.off('scroll', disableOverscroll)
      previousApi.off('select', updateCarouselState)
      previousApi.off('reInit', updateCarouselState)
    }

    if (!api) return

    api.on('scroll', disableOverscroll)
    api.on('select', updateCarouselState)
    api.on('reInit', updateCarouselState)
    updateCarouselState(api)
  },
  { immediate: true }
)

// The active update changes while this component is mounted in development/HMR
// and can also change if the API refreshes. Re-initialising Embla makes sure its
// snap list always matches the current set of Instagram pages.
watch(
  () => props.slides,
  async () => {
    await nextTick()
    const api = emblaApi.value
    if (!api) return
    api.reInit()
    api.scrollTo(0, true)
    updateCarouselState(api)
  },
  { deep: true }
)
</script>

<template>
  <div class="publication-embla">
    <div
      ref="emblaRef"
      class="publication-embla__viewport"
      tabindex="0"
      aria-label="Macro Market Update pages"
      @keydown="onKeydown"
    >
      <div class="publication-embla__container">
        <div
          v-for="(slide, index) in slides"
          :key="`${slide}-${index}`"
          class="publication-embla__slide"
        >
          <NuxtImg
            class="publication-embla__image"
            :src="slide"
            :alt="`${altBase}, page ${index + 1}`"
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <button
      class="publication-embla__button publication-embla__button--prev"
      type="button"
      :disabled="!canScrollPrev"
      aria-label="Previous page"
      @click="scrollPrev"
    >
      ‹
    </button>

    <button
      class="publication-embla__button publication-embla__button--next"
      type="button"
      :disabled="!canScrollNext"
      aria-label="Next page"
      @click="scrollNext"
    >
      ›
    </button>

    <div v-if="slides.length > 1" class="publication-embla__dots" aria-label="Carousel pages">
      <button
        v-for="(_, index) in slides"
        :key="index"
        class="publication-embla__dot"
        :class="{ 'publication-embla__dot--selected': index === selectedIndex }"
        type="button"
        :aria-label="`Go to page ${index + 1}`"
        :aria-current="index === selectedIndex ? 'true' : undefined"
        @click="scrollTo(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.publication-embla {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #0b1020;
}

.publication-embla__viewport {
  width: 100%;
  overflow: hidden;
  outline: none;
}

.publication-embla__viewport:focus-visible {
  box-shadow: inset 0 0 0 2px rgba(245, 245, 240, 0.8);
}

.publication-embla__container {
  display: flex;
  align-items: flex-start;
  touch-action: pan-y pinch-zoom;
}

.publication-embla__slide {
  flex: 0 0 100%;
  min-width: 0;
  overflow: hidden;
}

.publication-embla__image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
}

.publication-embla__button {
  position: absolute;
  top: 50%;
  z-index: 3;
  width: 3.25rem;
  height: clamp(4.5rem, 18%, 6rem);
  transform: translateY(-50%);
  border: 0;
  background: rgba(8, 12, 22, 0.58);
  color: var(--publication-fg, #f5f5f0);
  font-family: var(--font-serif);
  font-size: 3rem;
  line-height: 1;
  cursor: pointer;
  transition: background 160ms ease, opacity 160ms ease;
}

.publication-embla__button:hover:not(:disabled) {
  background: rgba(8, 12, 22, 0.84);
}

.publication-embla__button:disabled {
  opacity: 0.18;
  cursor: default;
}

.publication-embla__button--prev {
  left: 0;
}

.publication-embla__button--next {
  right: 0;
}

.publication-embla__dots {
  position: absolute;
  z-index: 3;
  left: 50%;
  bottom: 0.9rem;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.42rem;
  max-width: calc(100% - 7rem);
  padding: 0.4rem 0.58rem;
  overflow-x: auto;
  scrollbar-width: none;
  border-radius: 999px;
  background: rgba(8, 12, 22, 0.62);
}

.publication-embla__dots::-webkit-scrollbar {
  display: none;
}

.publication-embla__dot {
  flex: 0 0 auto;
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
  border: 1px solid rgba(245, 245, 240, 0.84);
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}

.publication-embla__dot--selected {
  background: var(--publication-fg, #f5f5f0);
}

@media (max-width: 620px) {
  .publication-embla__button {
    width: 2.75rem;
    height: 4.5rem;
    font-size: 2.5rem;
  }
}
</style>
