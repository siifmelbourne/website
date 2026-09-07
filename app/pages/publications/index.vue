<script setup>
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

const macroUpdates = [
  {
    title: 'Macro Market Update',
    date: '03/08/2026',
    image: '/images/macro-market-cover-aug.png'
  },
  {
    title: 'Market Movements',
    date: '10/08/2026',
    image: '/images/macro-market-movements-aug.png'
  },
  {
    title: 'Macro Market Update',
    date: '17/08/2026',
    image: '/images/macro-market-cover-aug.png'
  },
  {
    title: 'Market Movements',
    date: '24/08/2026',
    image: '/images/macro-market-movements-aug.png'
  },
  {
    title: 'Macro Market Update',
    date: '31/08/2026',
    image: '/images/macro-market-cover-aug.png'
  }
]

const activeMacroIndex = ref(0)
const macroScroller = ref(null)
const macroCards = ref([])

const setMacroCardRef = (element, index) => {
  if (element) {
    macroCards.value[index] = element
  }
}

const handleMacroScroll = () => {
  const scroller = macroScroller.value

  if (!scroller) return

  const scrollerCenter = scroller.scrollLeft + scroller.clientWidth / 2
  let closestIndex = 0
  let closestDistance = Number.POSITIVE_INFINITY

  macroCards.value.forEach((card, index) => {
    if (!card) return

    const cardCenter = card.offsetLeft + card.offsetWidth / 2
    const distance = Math.abs(cardCenter - scrollerCenter)

    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  })

  activeMacroIndex.value = closestIndex
}

const scrollToMacro = (index) => {
  const card = macroCards.value[index]

  activeMacroIndex.value = index
  card?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center'
  })
}

onMounted(() => {
  handleMacroScroll()
})

const interestPieces = [
  {
    title: 'Piece Title',
    author: '[writer name]',
    date: '17/08/2026',
    link: '/publications/articles',
    theme: 'earth'
  },
  {
    title: 'Piece Title',
    author: '[writer name]',
    date: '24/08/2026',
    link: '/publications/articles',
    theme: 'blueprint'
  },
  {
    title: 'Piece Title',
    author: '[writer name]',
    date: '31/08/2026',
    link: '/publications/articles',
    theme: 'chart'
  },
  {
    title: 'Piece Title',
    author: '[writer name]',
    date: '03/08/2026',
    link: '/publications/articles',
    theme: 'exchange'
  }
]
</script>

<template>
  <main class="publications-page">
    <section class="publications-hero" aria-labelledby="publications-title">
      <h1 id="publications-title" class="publications-hero__title text--serif">Publications</h1>
      <div class="publications-hero__divider" aria-hidden="true"></div>
    </section>

    <section class="publication-section publication-section--macro" aria-labelledby="macro-title">
      <div class="section-label">
        <h2 id="macro-title" class="section-label__title text--serif">Macro Market Update</h2>
        <NuxtLink class="section-label__link text--sans" to="/publications/macro-markets">........</NuxtLink>
      </div>

      <div class="macro-layout">
        <ol class="date-list text--serif" aria-label="Macro market update dates">
          <li v-for="(update, index) in macroUpdates" :key="update.date">
            <button
              class="date-list__button"
              :class="{ 'date-list__button--active': activeMacroIndex === index }"
              type="button"
              :aria-current="activeMacroIndex === index ? 'true' : undefined"
              @click="scrollToMacro(index)"
            >
              <span aria-hidden="true">·</span>
              {{ update.date }}
            </button>
          </li>
        </ol>

        <div
          ref="macroScroller"
          class="macro-card-row"
          aria-label="Scrollable macro market updates"
          @scroll.passive="handleMacroScroll"
        >
          <article
            v-for="(update, index) in macroUpdates"
            :key="`${update.title}-${update.date}`"
            :ref="(element) => setMacroCardRef(element, index)"
            class="macro-card"
          >
            <NuxtLink class="macro-card__link" to="/publications/macro-markets">
              <img class="macro-card__image" :src="update.image" :alt="update.title" />
              <span class="macro-card__date text--sans">{{ update.date }}</span>
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>

    <section class="publication-section publication-section--pieces" aria-labelledby="pieces-title">
      <div class="section-label">
        <h2 id="pieces-title" class="section-label__title text--serif">Interest Pieces</h2>
        <NuxtLink class="section-label__link text--sans" to="/publications/articles">.........</NuxtLink>
      </div>

      <div class="piece-grid">
        <NuxtLink
          v-for="piece in interestPieces"
          :key="`${piece.title}-${piece.date}`"
          class="piece-card"
          :class="`piece-card--${piece.theme}`"
          :to="piece.link"
        >
          <div class="piece-card__visual" aria-hidden="true"></div>
          <div class="piece-card__copy">
            <h3 class="piece-card__title text--sans">{{ piece.title }}</h3>
            <p class="piece-card__author text--sans">by {{ piece.author }}</p>
            <p class="piece-card__date text--serif">· {{ piece.date }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.publications-page {
  --publications-ink: #0f1424;
  --publications-light: #eff8ff;
  --publications-line: rgba(239, 248, 255, 0.42);
  --publications-muted: rgba(239, 248, 255, 0.72);
  --publications-accent: #7981d7;
  --publications-pad-block-start: clamp(1.7rem, 4vw, 3.4rem);
  --publications-pad-inline: max(1.25rem, 7vw);

  background: var(--publications-ink);
  color: var(--publications-light);
  min-height: 100vh;
  padding: var(--publications-pad-block-start) var(--publications-pad-inline) clamp(4rem, 7vw, 6rem);
}

.publications-hero {
  background-color: var(--publications-ink);
  background-image:
    linear-gradient(180deg, rgba(15, 20, 36, 0.5) 0%, rgba(15, 20, 36, 0.82) 100%),
    var(--subpage-cityscape-header);
  background-position: center, center 42%;
  background-repeat: no-repeat;
  background-size: cover, cover;
  display: grid;
  justify-items: center;
  margin: calc(0rem - var(--publications-pad-block-start)) calc(0rem - var(--publications-pad-inline)) 0;
  min-height: clamp(9rem, 20vw, 14rem);
  padding: clamp(2.1rem, 5vw, 4rem) var(--publications-pad-inline) clamp(1.7rem, 3.6vw, 2.9rem);
  text-align: center;
}

.publications-hero__title {
  color: var(--publications-light);
  font-family: var(--font-serif);
  font-size: clamp(2.65rem, 5vw, 4.55rem);
  font-weight: 400;
  line-height: 0.95;
  margin: 0;
  transform: translateY(var(--subpage-header-title-offset));
}

.publications-hero__divider {
  background: var(--publications-accent);
  height: 0.12rem;
  margin: clamp(0.65rem, 1vw, 0.9rem) auto 0;
  transform: translateY(var(--subpage-header-title-offset));
  width: min(8.5rem, 34vw);
}

.publication-section {
  margin: clamp(3.4rem, 6vw, 5.2rem) auto 0;
  max-width: 78rem;
}

.section-label {
  align-items: end;
  border-bottom: 1px solid var(--publications-line);
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.42rem;
}

.section-label__title {
  color: var(--publications-light);
  font-family: var(--font-serif);
  font-size: clamp(1.45rem, 2.1vw, 2rem);
  font-weight: 400;
  letter-spacing: 0.08em;
  line-height: 1;
  margin: 0;
  text-transform: uppercase;
}

.section-label__link {
  color: var(--publications-muted);
  font-size: 0.84rem;
  letter-spacing: 0.12em;
  line-height: 1;
  text-transform: uppercase;
  transition: color 0.2s ease;
}

.section-label__link:hover {
  color: var(--publications-light);
}

.macro-layout {
  align-items: start;
  display: grid;
  gap: clamp(1.7rem, 4vw, 3.5rem);
  grid-template-columns: minmax(8rem, 0.32fr) minmax(0, 1fr);
  margin-top: clamp(1.5rem, 3vw, 2.4rem);
}

.date-list {
  display: grid;
  font-family: var(--font-serif);
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  gap: 0.42rem;
  line-height: 1.2;
  list-style: none;
  margin: 0;
  padding: clamp(0.5rem, 1vw, 0.8rem) 0 0;
}

.date-list__button {
  background: transparent;
  border: 0;
  color: var(--publications-muted);
  cursor: pointer;
  font: inherit;
  letter-spacing: 0.02em;
  line-height: 1.2;
  padding: 0;
  text-align: left;
  transition: color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
}

.date-list__button:hover,
.date-list__button--active {
  color: var(--publications-light);
}

.date-list__button--active {
  transform: translateX(0.18rem);
}

.macro-card-row {
  display: flex;
  gap: 0;
  max-width: min(100%, 17rem);
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scroll-padding-inline: 0;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.macro-card-row::-webkit-scrollbar {
  display: none;
}

.macro-card {
  border: 1px solid rgba(239, 248, 255, 0.28);
  flex: 0 0 100%;
  display: block;
  overflow: hidden;
  position: relative;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.macro-card__link {
  display: block;
}

.macro-card:hover,
.piece-card:hover {
  opacity: 0.86;
  transform: translateY(-0.16rem);
}

.macro-card__image {
  aspect-ratio: 1 / 1;
  display: block;
  height: auto;
  object-fit: cover;
  width: 100%;
}

.macro-card__date {
  background: rgba(15, 20, 36, 0.76);
  bottom: 0;
  color: var(--publications-light);
  font-size: 0.68rem;
  left: 0;
  letter-spacing: 0.08em;
  padding: 0.45rem 0.55rem;
  position: absolute;
  text-transform: uppercase;
}

.piece-grid {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.4rem) clamp(2rem, 5vw, 5.5rem);
  grid-template-columns: repeat(2, minmax(0, 16rem));
  justify-content: center;
  margin-top: clamp(1.6rem, 3vw, 2.5rem);
}

.piece-card {
  aspect-ratio: 1 / 1.35;
  border: 1px solid var(--publications-line);
  color: var(--publications-light);
  display: grid;
  overflow: hidden;
  position: relative;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.piece-card__visual,
.piece-card__visual::before,
.piece-card__visual::after {
  inset: 0;
  position: absolute;
}

.piece-card__visual::before,
.piece-card__visual::after {
  content: "";
}

.piece-card__copy {
  align-self: end;
  padding: clamp(1rem, 2vw, 1.35rem);
  position: relative;
  z-index: 1;
}

.piece-card__title {
  color: var(--publications-light);
  font-size: clamp(1.45rem, 2.3vw, 2.1rem);
  font-weight: 800;
  letter-spacing: 0;
  line-height: 0.9;
  margin: 0;
}

.piece-card__author,
.piece-card__date {
  color: rgba(239, 248, 255, 0.82);
  font-size: clamp(0.65rem, 0.9vw, 0.8rem);
  letter-spacing: 0.08em;
  line-height: 1.2;
  margin: 0.35rem 0 0;
  text-transform: uppercase;
}

.piece-card__date {
  color: rgba(239, 248, 255, 0.72);
  margin-top: clamp(1rem, 2.5vw, 1.6rem);
}

.piece-card--earth .piece-card__visual {
  background:
    linear-gradient(180deg, rgba(15, 20, 36, 0.1), rgba(15, 20, 36, 0.72)),
    radial-gradient(circle at 30% 12%, rgba(242, 219, 164, 0.72), transparent 7%),
    radial-gradient(circle at 58% 24%, rgba(176, 212, 238, 0.62), transparent 9%),
    linear-gradient(135deg, #23232a 0%, #46505a 45%, #121722 100%);
}

.piece-card--earth .piece-card__visual::before {
  background-image:
    linear-gradient(35deg, transparent 42%, rgba(239, 248, 255, 0.28) 43%, transparent 45%),
    linear-gradient(78deg, transparent 50%, rgba(239, 248, 255, 0.16) 51%, transparent 53%);
  background-size: 4.8rem 4.8rem, 6.2rem 6.2rem;
  opacity: 0.42;
}

.piece-card--blueprint .piece-card__visual {
  background:
    linear-gradient(180deg, rgba(9, 18, 38, 0.08), rgba(9, 18, 38, 0.7)),
    linear-gradient(135deg, #06162f 0%, #16355f 48%, #07101f 100%);
}

.piece-card--blueprint .piece-card__visual::before {
  background-image:
    linear-gradient(rgba(126, 180, 238, 0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(126, 180, 238, 0.2) 1px, transparent 1px);
  background-size: 1.25rem 1.25rem;
}

.piece-card--blueprint .piece-card__visual::after {
  border: 1px solid rgba(174, 213, 255, 0.45);
  border-radius: 42% 58% 46% 54%;
  height: 42%;
  left: 24%;
  top: 18%;
  transform: rotate(-14deg);
  width: 58%;
}

.piece-card--chart .piece-card__visual {
  background:
    linear-gradient(180deg, rgba(16, 14, 18, 0.1), rgba(16, 14, 18, 0.72)),
    linear-gradient(135deg, #151619 0%, #292319 45%, #0c0f13 100%);
}

.piece-card--chart .piece-card__visual::before {
  background:
    linear-gradient(145deg, transparent 0 47%, rgba(230, 218, 172, 0.82) 48% 50%, transparent 51%),
    linear-gradient(20deg, transparent 0 54%, rgba(239, 248, 255, 0.28) 55% 56%, transparent 57%);
  filter: blur(0.2px);
}

.piece-card--exchange .piece-card__visual {
  background:
    linear-gradient(180deg, rgba(10, 18, 30, 0.08), rgba(10, 18, 30, 0.7)),
    linear-gradient(135deg, #132a40 0%, #5d7181 48%, #07111e 100%);
}

.piece-card--exchange .piece-card__visual::before {
  background-image:
    repeating-linear-gradient(90deg, rgba(239, 248, 255, 0.26) 0 1px, transparent 1px 1.2rem),
    repeating-linear-gradient(0deg, rgba(239, 248, 255, 0.12) 0 1px, transparent 1px 1rem);
  opacity: 0.46;
}

@media (max-width: 760px) {
  .macro-layout {
    grid-template-columns: 1fr;
  }

  .date-list {
    grid-template-columns: repeat(5, auto);
    justify-content: center;
    padding-top: 0;
  }

  .piece-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .publications-page {
    padding-inline: 1rem;
  }

  .section-label {
    align-items: start;
    flex-direction: column;
  }

  .date-list {
    grid-template-columns: repeat(2, auto);
    justify-content: start;
  }

  .piece-grid {
    grid-template-columns: 1fr;
  }

  .macro-card-row {
    max-width: min(100%, 20rem);
  }

  .piece-grid {
    max-width: 20rem;
  }
}
</style>
