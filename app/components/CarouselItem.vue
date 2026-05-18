<script setup lang="ts">
import useEmblaCarousel from 'embla-carousel-vue'
import type { EmblaCarouselType } from 'embla-carousel'

const props = defineProps({
  slides: {
    type: Array<string>,
    validator(value: Array<string>) {
      return value.length > 0
    },
    required: true
  },
  date: {
    type: String,
    required: true
  },
  link: String
})

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, containScroll: 'trimSnaps' })
// To suppress unused variable hint:
emblaRef

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}

const disableOverscroll = (emblaApi: EmblaCarouselType) => {
  const {
    limit,
    target,
    location,
    offsetLocation,
    scrollTo,
    translate,
    scrollBody
  } = emblaApi.internalEngine()

  let edge: number | null = null

  if (location.get() >= limit.max) edge = limit.max;
  if (location.get() <= limit.min) edge = limit.min;

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

const updateSlideIndex = (emblaApi: EmblaCarouselType) => {
  slideIndex.value = emblaApi.selectedScrollSnap()
}

watch(
  emblaApi,
  (api) => {
    if (!api) return
    api.on('scroll', disableOverscroll)
    api.on('reInit', updateSlideIndex)
    api.on('select', updateSlideIndex)
  },
  { immediate: true }
)

const scrollPrev = () => emblaApi.value?.scrollPrev()
const scrollNext = () => emblaApi.value?.scrollNext()
const slideIndex = ref(0)
</script>

<template>
  <div class="post">
    <div class="post__titlebox">
      <div class="post__titleboxleft">
        <NuxtImg class="post__titlelogo" src="/v1779095891/siifinsta_j2bg1x.jpg" />
        <p class="text text--p post__titletext"><strong>{{ "siif_unimelb" }}</strong> • {{ (new Date(date)).toLocaleDateString(undefined, dateOptions) }}</p>
      </div>
      <NuxtLink v-show="link" :href="props.link">
        <svg class="post__titlelink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M451.5 160C434.9 160 418.8 164.5 404.7 172.7C388.9 156.7 370.5 143.3 350.2 133.2C378.4 109.2 414.3 96 451.5 96C537.9 96 608 166 608 252.5C608 294 591.5 333.8 562.2 363.1L491.1 434.2C461.8 463.5 422 480 380.5 480C294.1 480 224 410 224 323.5C224 322 224 320.5 224.1 319C224.6 301.3 239.3 287.4 257 287.9C274.7 288.4 288.6 303.1 288.1 320.8C288.1 321.7 288.1 322.6 288.1 323.4C288.1 374.5 329.5 415.9 380.6 415.9C405.1 415.9 428.6 406.2 446 388.8L517.1 317.7C534.4 300.4 544.2 276.8 544.2 252.3C544.2 201.2 502.8 159.8 451.7 159.8zM307.2 237.3C305.3 236.5 303.4 235.4 301.7 234.2C289.1 227.7 274.7 224 259.6 224C235.1 224 211.6 233.7 194.2 251.1L123.1 322.2C105.8 339.5 96 363.1 96 387.6C96 438.7 137.4 480.1 188.5 480.1C205 480.1 221.1 475.7 235.2 467.5C251 483.5 269.4 496.9 289.8 507C261.6 530.9 225.8 544.2 188.5 544.2C102.1 544.2 32 474.2 32 387.7C32 346.2 48.5 306.4 77.8 277.1L148.9 206C178.2 176.7 218 160.2 259.5 160.2C346.1 160.2 416 230.8 416 317.1C416 318.4 416 319.7 416 321C415.6 338.7 400.9 352.6 383.2 352.2C365.5 351.8 351.6 337.1 352 319.4C352 318.6 352 317.9 352 317.1C352 283.4 334 253.8 307.2 237.5z"/></svg>
      </NuxtLink>
    </div>
    <div class="embla">
      <div class="embla__viewport" ref="emblaRef">
        <div class="embla__container">
          <NuxtImg class="embla__slide" v-for="slide in props.slides" :src="slide" />
        </div>
      </div>
      <div class="embla__overlay">
        <button class="embla__button embla__prev" @click="scrollPrev">◀</button>
        <div class="embla__middle">
          <div v-for="index in slides.keys()" :class="index == slideIndex && 'embla__dot--selected'" class="embla__dot">●</div>
        </div>
        <button class="embla__button embla__next" @click="scrollNext">▶</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post {
}

.embla {
  position: relative
}

.post__titlebox {
  display: flex;
  align-items: center;
  height: 4rem;
  padding: 0 1rem;
  justify-content: space-between
}

.post__titleboxleft {
  gap: 1rem;
  display: flex;
  align-items: center;
}

.post__titletext {
  margin: 0;
  font-size: 1rem;
}

.post__titlelogo {
  border-radius: 50%;
  height: 2rem;
}


.post__titlelink {
  height: 2rem;
}

.embla__viewport {
  overflow: hidden;
}

.embla__container {
  display: flex;
  touch-action: pan-y pinch-zoom;
}

.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
}

.embla__overlay {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
}

.embla__button {
  pointer-events: auto;
  cursor: pointer;
  height: 100%;
  width: 4rem;
  font-size: 2rem;
  background: none;
  border: none;
  transition: all 0.2s ease-out;
  -webkit-text-stroke: 2px var(--off-white);
}

/* .embla__prev { */
/*   position: absolute; */
/*   left: 0 */
/* } */
/**/
/* .embla__next { */
/*   position: absolute; */
/*   right: 0 */
/* } */

.embla__button:hover {
  background: color-mix(in srgb, var(--off-white) 50%, transparent);
  -webkit-text-stroke: rgba(0,0,0,0);
}

.embla__middle {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 1rem;
}

.embla__dot {
  -webkit-text-stroke: 2px var(--off-white);
  color: rgba(0,0,0,0);
  font-size: 1rem;
  display: inline;
  transition: all 0.2s ease-out;
}

.embla__dot--selected {
  color: var(--off-white);
}
</style>
