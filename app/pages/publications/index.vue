<script setup lang="ts">
import PublicationsMacroCarousel from '~/components/publications/PublicationsMacroCarousel.vue'

if (import.meta.server) {
  useSeoMeta({
    title: 'Publications | Social Impact Investment Fund',
    description: 'Read SIIF macro market updates and student-written interest pieces.',
    robots: 'index, follow',
    ogTitle: 'SIIF Publications',
    ogDescription: 'Read SIIF macro market updates and student-written interest pieces.',
    twitterCard: 'summary_large_image',
    twitterTitle: 'SIIF Publications',
    twitterDescription: 'Read SIIF macro market updates and student-written interest pieces.'
  })
}

type MacroUpdate = {
  date: string
  link: string
  title: string
  fallbackImage: string
}

type MacroFrame = {
  date: string
  link?: string
  slides: string[]
}

type InterestPiece = {
  title: string
  description: string
  date: string
  link: string
  image: string
}

// Historical 2025 posts are kept as a local UI fallback. Newer 2026 post links
// and carousel slide data are provided centrally by /api/macro-markets.
const legacyMacroUpdates: MacroUpdate[] = [
  { date: 'October 13, 2025', title: 'Macro Market Update', link: 'https://www.instagram.com/p/DPvm9NCk4lM/', fallbackImage: '/images/macro-market-cover-aug.png' },
  { date: 'September 29, 2025', title: 'Macro Market Update', link: 'https://www.instagram.com/p/DPK0IYPk06i/', fallbackImage: '/images/macro-market-movements-aug.png' },
  { date: 'September 15, 2025', title: 'Macro Market Update', link: 'https://www.instagram.com/p/DOma6AVEzJ4/', fallbackImage: '/images/macro-market-cover-aug.png' },
  { date: 'September 1, 2025', title: 'Macro Market Update', link: 'https://www.instagram.com/p/DOCXyftEwGK/', fallbackImage: '/images/macro-market-movements-aug.png' },
  { date: 'August 18, 2025', title: 'Macro Market Update', link: 'https://www.instagram.com/p/DNemFRrzYsd/', fallbackImage: '/images/macro-market-cover-aug.png' },
  { date: 'May 5, 2025', title: 'Macro Market Update', link: 'https://www.instagram.com/p/DJQJOpfTQEU/', fallbackImage: '/images/macro-market-movements-aug.png' },
  { date: 'April 28, 2025', title: 'Macro Market Update', link: 'https://www.instagram.com/p/DI-OmyLT6sR/', fallbackImage: '/images/macro-market-cover-aug.png' },
  { date: 'April 7, 2025', title: 'Macro Market Update', link: 'https://www.instagram.com/p/DIIQjRATEiX/', fallbackImage: '/images/macro-market-movements-aug.png' },
  { date: 'March 31, 2025', title: 'Macro Market Update', link: 'https://www.instagram.com/p/DH2fz0qT3hB/', fallbackImage: '/images/macro-market-cover-aug.png' },
  { date: 'March 24, 2025', title: 'Macro Market Update', link: 'https://www.instagram.com/p/DHkwIrNTd5a/', fallbackImage: '/images/macro-market-movements-aug.png' }
]

const interestPieces: InterestPiece[] = [
  {
    title: 'Global Macro Outlook',
    description: 'A concise macroeconomic briefing exploring inflation, interest-rate trends, commodity cycles and foreign-exchange outlooks shaping global markets over 2025–27.',
    date: 'December 17, 2025',
    link: '/publications/articles',
    image: '/images/macro-market-cover-aug.png'
  },
  {
    title: 'Enterprise Value vs. Equity Value: Interview Guide',
    description: 'A clear, interview-focused guide explaining the difference between Enterprise Value and Equity Value in company valuation.',
    date: 'May 24, 2025',
    link: '/publications/articles',
    image: '/images/macro-market-movements-aug.png'
  },
  {
    title: 'DCF Analysis: Interview Guide',
    description: 'A concise interview guide to walking through a DCF analysis, breaking down the key steps, formulas and valuation logic.',
    date: 'May 11, 2025',
    link: '/publications/articles',
    image: '/images/macro-market-update-aug.png'
  }
]

const { data: macroFeed } = await useAsyncData<MacroFrame[]>(
  'publications-macro-feed',
  () => $fetch('/api/macro-markets'),
  { default: () => [] }
)

const latestVisibleMacroDate = '2026-05-18'

const normaliseDate = (value: string) => {
  const isoDay = value.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (isoDay) return `${isoDay[1]}-${isoDay[2]}-${isoDay[3]}`

  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString().slice(0, 10)
}

const macroUpdates = computed<MacroUpdate[]>(() => {
  const byDate = new Map<string, MacroUpdate>()

  for (const item of legacyMacroUpdates) {
    byDate.set(normaliseDate(item.date), item)
  }

  for (const frame of macroFeed.value) {
    if (!frame?.date || !frame?.slides?.length) continue
    const key = normaliseDate(frame.date)
    if (key > latestVisibleMacroDate) continue
    byDate.set(key, {
      date: frame.date,
      title: 'Macro Market Update',
      link: frame.link || '',
      fallbackImage: frame.slides[0]
    })
  }

  return [...byDate.values()].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
})

const activeMacroIndex = ref(0)
const activeSlideIndex = ref(0)
const activeMacro = computed(() => macroUpdates.value[activeMacroIndex.value] || legacyMacroUpdates[0])
const activeFeedFrame = computed(() => {
  const target = normaliseDate(activeMacro.value.date)
  return macroFeed.value.find((frame) => normaliseDate(frame.date) === target)
})
const activeSlides = computed(() => {
  const slides = activeFeedFrame.value?.slides?.filter(Boolean) ?? []
  return slides.length ? slides : [activeMacro.value.fallbackImage]
})
const activeInstagramLink = computed(() => activeFeedFrame.value?.link || activeMacro.value.link)
const macroList = ref<HTMLElement | null>(null)
const selectMacro = (index: number) => {
  activeMacroIndex.value = index
  activeSlideIndex.value = 0
}

const moveMacro = (direction: number) => {
  const next = Math.min(
    Math.max(activeMacroIndex.value + direction, 0),
    macroUpdates.value.length - 1
  )

  selectMacro(next)
}

const formatCompactDate = (date: string) => {
  const parsed = new Date(date)
  return new Intl.DateTimeFormat('en-AU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(parsed)
}
</script>

<template>
  <main class="publications-page">
    <section class="publications-hero" aria-labelledby="publications-title">
      <div class="publications-hero__shade"></div>
      <div class="publications-hero__content">
        <h1 id="publications-title" class="publications-hero__title text--serif">Publications</h1>
        <span class="publications-hero__rule" aria-hidden="true"></span>
      </div>
    </section>

    <section class="publication-section" aria-labelledby="macro-title">
      <div class="section-heading">
        <h2 id="macro-title" class="section-heading__title text--serif">Macro Market Updates</h2>
      </div>

      <div class="macro-shell">
        <aside class="macro-sidebar" aria-label="Macro market update dates">
          <div class="macro-sidebar__rail" aria-hidden="true">........</div>
          <ol ref="macroList" class="macro-date-list">
            <li v-for="(update, index) in macroUpdates" :key="update.date">
              <button
                type="button"
                class="macro-date"
                :class="{ 'macro-date--active': index === activeMacroIndex }"
                :aria-current="index === activeMacroIndex ? 'date' : undefined"
                @click="selectMacro(index)"
              >
                <span class="macro-date__dot" aria-hidden="true">·</span>
                <span>{{ formatCompactDate(update.date) }}</span>
              </button>
            </li>
          </ol>
          <div class="macro-sidebar__rail macro-sidebar__rail--bottom" aria-hidden="true">........</div>
        </aside>

        <div class="macro-viewer-wrap">
          <div class="macro-viewer-toolbar">
            <div>
              <p class="macro-viewer-toolbar__eyebrow">Selected update</p>
              <p class="macro-viewer-toolbar__date">{{ activeMacro.date }}</p>
            </div>
            <a
              class="macro-viewer-toolbar__link"
              :href="activeInstagramLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read post on Instagram ↗
            </a>
          </div>

          <div class="macro-carousel-shell" aria-live="polite">
            <PublicationsMacroCarousel
              :key="normaliseDate(activeMacro.date)"
              :slides="activeSlides"
              :alt-base="`${activeMacro.title} – ${activeMacro.date}`"
              @slide-change="activeSlideIndex = $event"
            />
          </div>

          <div class="macro-viewer-controls" aria-label="Macro update navigation">
            <button type="button" :disabled="activeMacroIndex === 0" @click="moveMacro(-1)">← Newer update</button>
            <span>{{ activeSlideIndex + 1 }} / {{ activeSlides.length }} pages</span>
            <button type="button" :disabled="activeMacroIndex === macroUpdates.length - 1" @click="moveMacro(1)">Older update →</button>
          </div>
        </div>
      </div>
    </section>

    <section class="publication-section publication-section--interest" aria-labelledby="interest-title">
      <div class="section-heading section-heading--stacked">
        <h2 id="interest-title" class="section-heading__title text--serif">Interest Pieces</h2>
        <p class="section-heading__subtitle">Student-written insights on markets, investing, and the global economy.</p>
      </div>

      <div class="interest-grid">
        <NuxtLink
          v-for="piece in interestPieces"
          :key="piece.title"
          :to="piece.link"
          class="interest-card"
        >
          <div class="interest-card__image-wrap">
            <img class="interest-card__image" :src="piece.image" :alt="piece.title" />
          </div>
          <div class="interest-card__content">
            <p class="interest-card__date">{{ piece.date }}</p>
            <h3 class="interest-card__title text--serif">{{ piece.title }}</h3>
            <p class="interest-card__description">{{ piece.description }}</p>
            <span class="interest-card__cta">Read piece ↗</span>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.publications-page {
  --publication-bg: #0f1424;
  --publication-fg: #f5f5f0;
  --publication-muted: rgba(245, 245, 240, 0.7);
  --publication-line: rgba(245, 245, 240, 0.52);
  --publication-panel: rgba(255, 255, 255, 0.025);
  --publication-accent: #c9ced9;

  min-height: 100vh;
  color: var(--publication-fg);
  background: var(--publication-bg);
}

.publications-hero {
  min-height: clamp(9rem, 20vw, 14rem);
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  background-color: var(--publication-bg);
  background-image: var(--subpage-cityscape-header);
  background-size: cover;
  background-position: center 42%;
  background-repeat: no-repeat;
}

.publications-hero__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 20, 36, 0.5) 0%, rgba(15, 20, 36, 0.82) 100%);
}

.publications-hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: clamp(2.1rem, 5vw, 4rem) 1.5rem clamp(1.7rem, 3.6vw, 2.9rem);
}

.publications-hero__title {
  margin: 0;
  color: var(--publication-fg);
  font-family: var(--font-serif);
  font-size: clamp(2.65rem, 5vw, 4.55rem);
  font-weight: 400;
  line-height: 0.95;
  transform: translateY(var(--subpage-header-title-offset));
}

.publications-hero__rule {
  width: min(8.5rem, 34vw);
  height: 0.12rem;
  display: block;
  margin: clamp(0.65rem, 1vw, 0.9rem) auto 0;
  background: #7981d7;
  transform: translateY(var(--subpage-header-title-offset));
}

.publication-section {
  width: min(86rem, calc(100% - 2.5rem));
  margin: 0 auto;
  padding-top: clamp(4rem, 7vw, 7rem);
}

.publication-section--interest {
  padding-bottom: clamp(5rem, 8vw, 8rem);
}

.section-heading {
  border-bottom: 1px solid var(--publication-line);
  padding: 0 1.25rem 0.75rem;
}

.section-heading--stacked {
  display: grid;
  gap: 0.55rem;
}

.section-heading__title {
  margin: 0;
  color: var(--publication-fg);
  font-size: clamp(1.8rem, 2.55vw, 2.8rem);
  font-weight: 400;
  line-height: 1.1;
}

.section-heading__subtitle {
  margin: 0;
  color: var(--publication-muted);
  font-family: var(--font-sans);
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  letter-spacing: 0.01em;
}

.macro-shell {
  display: grid;
  grid-template-columns: minmax(12rem, 0.34fr) minmax(0, 1fr);
  gap: clamp(2.5rem, 5vw, 5.5rem);
  padding: clamp(1.8rem, 3vw, 2.8rem) clamp(0.25rem, 1.5vw, 1.25rem) 0;
}

.macro-sidebar {
  min-width: 0;
}

.macro-sidebar__rail {
  width: fit-content;
  margin: 0.25rem auto 1rem;
  color: rgba(245, 245, 240, 0.62);
  letter-spacing: 0.12em;
}

.macro-sidebar__rail--bottom {
  margin: 1rem auto 0;
}

.macro-date-list {
  max-height: 25.5rem;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(245, 245, 240, 0.45) transparent;
  display: grid;
  gap: 0.45rem;
  margin: 0;
  padding: 0.35rem 0.85rem 0.35rem 0;
  list-style: none;
}

.macro-date {
  width: 100%;
  display: grid;
  grid-template-columns: 1.35rem 1fr;
  align-items: center;
  gap: 0.25rem;
  border: 0;
  background: transparent;
  color: rgba(245, 245, 240, 0.76);
  padding: 0.44rem 0;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-serif);
  font-size: clamp(1.05rem, 1.45vw, 1.38rem);
  transition: color 180ms ease, transform 180ms ease;
}

.macro-date:hover,
.macro-date--active {
  color: var(--publication-fg);
  transform: translateX(0.2rem);
}

.macro-date--active {
  font-weight: 700;
}

.macro-date__dot {
  text-align: center;
}

.macro-viewer-wrap {
  min-width: 0;
}

.macro-viewer-toolbar,
.macro-viewer-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.macro-viewer-toolbar {
  margin-bottom: 0.8rem;
  color: var(--publication-muted);
}

.macro-viewer-toolbar__eyebrow {
  margin: 0 0 0.18rem;
  font: 700 0.7rem/1 var(--font-sans);
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.macro-viewer-toolbar__date {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 1.05rem;
  color: var(--publication-fg);
}

.macro-viewer-toolbar__link,
.macro-post__instagram,
.interest-card__cta {
  color: var(--publication-fg);
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.macro-carousel-shell {
  position: relative;
  width: min(100%, 46rem);
  margin: 0 auto;
  border: 1px solid rgba(245, 245, 240, 0.3);
  background: rgba(255, 255, 255, 0.018);
  overflow: hidden;
}

.macro-viewer-controls {
  padding-top: 0.85rem;
  color: var(--publication-muted);
  font-family: var(--font-sans);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.macro-viewer-controls button {
  border: 0;
  background: transparent;
  color: var(--publication-fg);
  cursor: pointer;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  padding: 0.35rem 0;
}

.macro-viewer-controls button:disabled {
  opacity: 0.3;
  cursor: default;
}

.interest-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1.4rem, 2.5vw, 2.4rem);
  padding: clamp(2rem, 3.5vw, 3rem) clamp(0.25rem, 1.5vw, 1.25rem) 0;
}

.interest-card {
  min-width: 0;
  border: 1px solid rgba(245, 245, 240, 0.52);
  background: rgba(255, 255, 255, 0.018);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;
}

.interest-card:hover {
  transform: translateY(-0.28rem);
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(245, 245, 240, 0.82);
}

.interest-card__image-wrap {
  aspect-ratio: 1.1 / 1;
  overflow: hidden;
  border-bottom: 1px solid rgba(245, 245, 240, 0.28);
}

.interest-card__image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  filter: saturate(0.72) brightness(0.82);
  transition: transform 260ms ease, filter 260ms ease;
}

.interest-card:hover .interest-card__image {
  transform: scale(1.025);
  filter: saturate(0.88) brightness(0.9);
}

.interest-card__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: clamp(1.2rem, 2vw, 1.7rem);
}

.interest-card__date {
  margin: 0 0 0.7rem;
  color: var(--publication-muted);
  font-family: var(--font-serif);
  font-size: 0.92rem;
}

.interest-card__title {
  margin: 0;
  color: var(--publication-fg);
  font-family: var(--font-serif);
  font-size: clamp(1.45rem, 2.1vw, 2.1rem);
  font-weight: 400;
  line-height: 1.05;
}

.interest-card__description {
  margin: 1rem 0 1.6rem;
  color: rgba(245, 245, 240, 0.72);
  font-family: var(--font-sans);
  font-size: 0.94rem;
  line-height: 1.6;
}

.interest-card__cta {
  margin-top: auto;
}

@media (max-width: 900px) {
  .macro-shell {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .macro-sidebar {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.75rem;
  }

  .macro-sidebar__rail,
  .macro-sidebar__rail--bottom {
    margin: 0;
    writing-mode: vertical-rl;
    max-height: 4rem;
    overflow: hidden;
  }

  .macro-date-list {
    display: flex;
    max-height: none;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 0.5rem;
    padding: 0.35rem 0 0.65rem;
  }

  .macro-date-list li {
    flex: 0 0 auto;
  }

  .macro-date {
    width: auto;
    grid-template-columns: auto 1fr;
    padding: 0.45rem 0.75rem;
    border: 1px solid rgba(245, 245, 240, 0.22);
  }

  .macro-date:hover,
  .macro-date--active {
    transform: none;
    border-color: rgba(245, 245, 240, 0.75);
  }

  .interest-grid {
    grid-template-columns: 1fr;
  }

  .interest-card {
    display: grid;
    grid-template-columns: minmax(10rem, 0.8fr) minmax(0, 1.2fr);
  }

  .interest-card__image-wrap {
    min-height: 15rem;
    aspect-ratio: auto;
    border-right: 1px solid rgba(245, 245, 240, 0.28);
    border-bottom: 0;
  }
}

@media (max-width: 620px) {
  .publication-section {
    width: min(100% - 1.4rem, 86rem);
  }

  .section-heading {
    padding-inline: 0.35rem;
  }

  .macro-shell,
  .interest-grid {
    padding-inline: 0;
  }

  .macro-viewer-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .interest-card {
    grid-template-columns: 1fr;
  }

  .interest-card__image-wrap {
    min-height: 0;
    aspect-ratio: 1.55 / 1;
    border-right: 0;
    border-bottom: 1px solid rgba(245, 245, 240, 0.28);
  }
}
</style>
