<script setup>
if (import.meta.server) {
  useSeoMeta({
    title: 'About Us | Social Impact Investment Fund',
    description: 'Learn about SIIF, Victoria’s first student-led investment fund managing real capital for social impact.',
    robots: 'index, follow',
    ogTitle: 'About SIIF',
    ogDescription: 'Victoria’s first student-led investment fund managing real capital for social impact.',
    twitterCard: 'summary_large_image',
    twitterTitle: 'About SIIF',
    twitterDescription: 'Victoria’s first student-led investment fund managing real capital for social impact.'
  })
}

const committeeImage = '/images/hero-committee.png'
const closingImage = '/images/second-committee.png'

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: committeeImage,
      fetchpriority: 'high'
    },
    {
      rel: 'preload',
      as: 'image',
      href: closingImage
    }
  ]
})

useSeoMeta({
  ogImage: committeeImage,
  twitterImage: committeeImage
})

const timeline = ['2020', '2024', '2026']

const values = [
  {
    title: 'Inclusivity',
    icon: 'people',
    copy: 'We welcome students from every discipline and level of experience, building confidence through shared learning.'
  },
  {
    title: 'Community',
    icon: 'globe',
    copy: 'SIIF is built around collaboration: members, partners, alumni, and charities all contribute to the fund’s story.'
  },
  {
    title: 'Social Impact',
    icon: 'hands',
    copy: 'Our returns support nominated charities, turning financial education into practical community outcomes.'
  }
]

const missionIntro = [
  "SIIF didn't start as any other university club.",
  'It started with a question:',
  "What if students didn’t just learn about markets — but actually operated in them?",
  "And what if: the returns didn’t stop at profit, but created real social impact?"
]

const pillars = [
  {
    title: 'Impact',
    copy: 'By donating 100% of investment returns, SIIF transforms financial literacy into tangible social outcomes. Markets become a tool, not the objective. Profit becomes a means, not an end. This structure forces a different kind of thinking'
  },
  {
    title: 'Education',
    copy: 'From pitching stocks and building valuation models to debating macro trends and risk, members experience what it’s like to operate inside an investment fund. Mistakes are real. Wins are real. And the learning curve is steep — by design.'
  },
  {
    title: 'Community',
    copy: 'SIIF is powered by students who are curious, ambitious, and willing to challenge the status quo. Our members come from diverse degrees and backgrounds, united by a shared belief that finance can — and should — be used for good. Inside SIIF, collaboration beats competition, and learning is collective. From late-night pitch prep to industry networking nights, SIIF is as much about the people as it is about the portfolio.'
  }
]
</script>

<template>
  <main class="about-page">
    <section class="about-page-header" aria-labelledby="about-title">
      <h1 id="about-title" class="about-hero__title text--serif">About Us</h1>
      <div class="about-hero__divider" aria-hidden="true"></div>
    </section>

    <section class="about-hero" aria-label="About SIIF introduction">
      <div class="about-hero__inner">
        <img
          class="about-hero__image"
          :src="committeeImage"
          alt="SIIF committee members gathered in front of stone arches"
        />

        <div class="about-accordions" aria-label="About SIIF details">
          <details class="about-detail">
            <summary class="about-detail__summary text--serif">Our Mission</summary>
            <div class="about-detail__body text--sans">
              <p v-for="line in missionIntro" :key="line" class="about-detail__copy">{{ line }}</p>
              <p class="about-detail__copy">
                From that idea, the <span class="about-detail__emphasis">Social Impact Investment Fund</span> was born.
              </p>
              <p class="about-detail__copy">
                SIIF is Victoria’s first student-led investment fund that manages
                <strong>real capital</strong>, makes <strong>real investment decisions</strong>,
                and generates <strong>real outcomes.</strong> But unlike traditional funds, SIIF
                measures success in two ways: <strong>financial performance</strong> and
                <strong>positive impact.</strong> Every dollar earned through capital gains and
                dividends is redirected to organisations doing meaningful work in the community.
              </p>
            </div>
          </details>

          <details class="about-detail">
            <summary class="about-detail__summary text--serif">Three Pillars</summary>
            <div class="pillars-list text--sans">
              <article v-for="(pillar, index) in pillars" :key="pillar.title" class="pillar-item">
                <h2 class="pillar-item__title">{{ index + 1 }}. {{ pillar.title }}</h2>
                <p class="pillar-item__copy">{{ pillar.copy }}</p>
              </article>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section class="story-section" aria-labelledby="story-title">
      <h2 id="story-title" class="section-heading text--serif">Our Story</h2>

      <div class="story-grid">
        <ol class="timeline-list" aria-label="SIIF timeline">
          <li v-for="year in timeline" :key="year" class="timeline-list__item">
            <span class="timeline-list__dot" aria-hidden="true"></span>
            <span class="timeline-list__year text--serif">{{ year }}</span>
          </li>
        </ol>

        <p class="story-copy text--sans">
          IN 2020, THE SOCIAL IMPACT INVESTMENT FUND (SiiF) was first founded at the university of melbourne.
        </p>
      </div>
    </section>

    <section class="values-section" aria-labelledby="values-title">
      <h2 id="values-title" class="section-heading text--serif">Our Values</h2>

      <div class="values-list">
        <article v-for="value in values" :key="value.title" class="value-row">
          <div class="value-row__icon" aria-hidden="true">
            <svg v-if="value.icon === 'people'" viewBox="0 0 24 24" focusable="false">
              <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              <path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              <path d="M3.5 19c.8-3.1 2.4-4.7 4.5-4.7s3.7 1.6 4.5 4.7" />
              <path d="M11.5 19c.8-3.1 2.4-4.7 4.5-4.7s3.7 1.6 4.5 4.7" />
            </svg>
            <svg v-else-if="value.icon === 'globe'" viewBox="0 0 24 24" focusable="false">
              <circle cx="12" cy="12" r="8" />
              <path d="M4.5 12h15" />
              <path d="M12 4c2 2.1 3 4.8 3 8s-1 5.9-3 8" />
              <path d="M12 4c-2 2.1-3 4.8-3 8s1 5.9 3 8" />
            </svg>
            <svg v-else viewBox="0 0 24 24" focusable="false">
              <path d="M7.5 12.5 4.8 9.8a2.2 2.2 0 0 1 0-3.1 2.2 2.2 0 0 1 3.1 0l1.3 1.3" />
              <path d="m16.5 12.5 2.7-2.7a2.2 2.2 0 0 0 0-3.1 2.2 2.2 0 0 0-3.1 0l-1.3 1.3" />
              <path d="m8.5 13.5 2.5 2.5a1.4 1.4 0 0 0 2 0l2.5-2.5" />
              <path d="M9.2 8 12 10.8 14.8 8" />
            </svg>
          </div>
          <div class="value-row__body">
            <h3 class="value-row__title text--sans">{{ value.title }}</h3>
            <p class="value-row__copy text--sans">{{ value.copy }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="closing-section" :style="{ backgroundImage: `linear-gradient(rgba(15, 20, 36, 0.78), rgba(15, 20, 36, 0.84)), url('${closingImage}')` }">
      <div class="closing-section__inner">
        <h2 class="closing-section__title text--serif">SIIF’s story isn’t finished.</h2>
        <p class="closing-section__copy text--sans">
          Every new cohort reshapes the fund. Every investment decision leaves a mark.
          Every partner, project, and member adds a new chapter.
        </p>
        <p class="closing-section__copy text--sans">
          This is a living organisation — evolving with markets, ideas, and people.
        </p>
        <p class="closing-section__copy text--sans">
          If you’re looking for a place where finance is practical, impact is real, and
          students are trusted with responsibility, you’ve found it.
        </p>
        <NuxtLink class="closing-section__link text--sans" to="/contact/contact-us">Contact Us</NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  --about-ink: #0f1424;
  --about-ink-alt: #111827;
  --about-blue: #1a253e;
  --about-cream: #fff8ef;
  --about-light: #eff8ff;
  --about-line: rgba(239, 248, 255, 0.38);
  --about-accent: #7981d7;

  background: var(--about-ink);
  color: var(--about-light);
}

.about-page-header {
  background-color: var(--about-ink);
  background-image:
    linear-gradient(180deg, rgba(15, 20, 36, 0.5) 0%, rgba(15, 20, 36, 0.82) 100%),
    var(--subpage-cityscape-header);
  background-position: center, center 42%;
  background-repeat: no-repeat;
  background-size: cover, cover;
  display: grid;
  justify-items: center;
  min-height: clamp(9rem, 20vw, 14rem);
  padding: clamp(2.1rem, 5vw, 4rem) max(1.25rem, 7vw) clamp(1.7rem, 3.6vw, 2.9rem);
  text-align: center;
}

.about-hero {
  background: linear-gradient(180deg, #111725 0%, var(--about-ink) 100%);
  padding: clamp(1.9rem, 4vw, 3.5rem) max(1.25rem, 7vw) clamp(1.8rem, 3.5vw, 3rem);
}

.about-hero__inner {
  margin: 0 auto;
  max-width: 75rem;
  text-align: center;
}

.about-hero__title,
.section-heading,
.closing-section__title {
  color: var(--about-light);
  font-family: var(--font-serif);
  font-weight: 400;
  letter-spacing: 0;
  margin: 0;
}

.about-hero__title {
  font-size: clamp(2.7rem, 5vw, 4.6rem);
  line-height: 0.95;
  transform: translateY(var(--subpage-header-title-offset));
}

.about-hero__divider,
.section-heading::after {
  background: var(--about-accent);
  content: "";
  display: block;
  height: 0.12rem;
  margin: clamp(0.65rem, 1.2vw, 0.95rem) auto 0;
  width: min(8rem, 34vw);
}

.about-hero__divider {
  transform: translateY(var(--subpage-header-title-offset));
}

.about-hero__image {
  aspect-ratio: 16 / 9;
  display: block;
  height: auto;
  margin: clamp(1.7rem, 3vw, 2.4rem) auto clamp(1.3rem, 2.5vw, 2.2rem);
  max-width: min(100%, 56rem);
  object-fit: cover;
  object-position: center;
  width: 100%;
}

.about-accordions {
  border-bottom: 1px solid var(--about-line);
  border-top: 1px solid var(--about-line);
  margin: 0 auto;
  max-width: min(100%, 66rem);
  text-align: left;
}

.about-detail {
  border-top: 1px solid var(--about-line);
}

.about-detail:first-child {
  border-top: 0;
}

.about-detail__summary {
  align-items: center;
  color: var(--about-light);
  cursor: pointer;
  display: flex;
  font-size: clamp(1.05rem, 1.5vw, 1.35rem);
  justify-content: space-between;
  line-height: 1;
  list-style: none;
  min-height: 3rem;
  padding: 0.55rem clamp(0.2rem, 1vw, 0.9rem);
}

.about-detail__summary::-webkit-details-marker {
  display: none;
}

.about-detail__summary::after {
  border-bottom: 1px solid currentColor;
  border-right: 1px solid currentColor;
  content: "";
  height: 0.42rem;
  margin-left: 1.5rem;
  transform: rotate(45deg);
  transition: transform 0.2s ease;
  width: 0.42rem;
}

.about-detail[open] .about-detail__summary::after {
  transform: rotate(-135deg);
}

.about-detail__body,
.pillars-list {
  color: rgba(239, 248, 255, 0.82);
  font-size: clamp(0.92rem, 1.05vw, 1.02rem);
  line-height: 1.6;
  margin: 0;
  max-width: 56rem;
  padding: 0.2rem 0.9rem 1.25rem;
}

.about-detail__body {
  display: grid;
  gap: 0.8rem;
}

.about-detail__copy {
  margin: 0;
}

.about-detail__copy strong,
.about-detail__emphasis {
  color: var(--about-light);
  font-weight: 700;
}

.pillars-list {
  display: grid;
  gap: clamp(1rem, 1.6vw, 1.35rem);
}

.pillar-item {
  display: grid;
  gap: 0.4rem;
}

.pillar-item__title {
  color: var(--about-light);
  font-size: clamp(1rem, 1.25vw, 1.16rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;
}

.pillar-item__copy {
  color: rgba(239, 248, 255, 0.82);
  font-size: inherit;
  line-height: inherit;
  margin: 0;
}

.story-section,
.values-section {
  background: var(--about-ink);
  margin: 0 auto;
  max-width: 75rem;
  padding: clamp(1.8rem, 4vw, 3.5rem) max(1.25rem, 7vw);
}

.section-heading {
  font-size: clamp(1.9rem, 3vw, 2.75rem);
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
}

.story-grid {
  align-items: center;
  display: grid;
  gap: clamp(1.6rem, 4vw, 3.5rem);
  grid-template-columns: minmax(8rem, 0.36fr) minmax(0, 1fr);
  margin: clamp(2.1rem, 4vw, 3.4rem) auto 0;
  max-width: 52rem;
}

.timeline-list {
  border-right: 1px solid var(--about-line);
  display: grid;
  gap: 0.7rem;
  list-style: none;
  margin: 0;
  padding: 0 clamp(1.2rem, 3vw, 2.2rem) 0 0;
}

.timeline-list__item {
  align-items: center;
  display: grid;
  gap: 0.65rem;
  grid-template-columns: auto 1fr;
}

.timeline-list__dot {
  background: var(--about-light);
  border-radius: 999px;
  display: block;
  height: 0.16rem;
  opacity: 0.78;
  width: 0.16rem;
}

.timeline-list__year {
  color: var(--about-light);
  font-size: clamp(0.82rem, 1vw, 0.96rem);
  line-height: 1.2;
}

.story-copy {
  color: rgba(239, 248, 255, 0.9);
  font-family: var(--font-sans);
  font-size: clamp(0.8rem, 1vw, 0.98rem);
  letter-spacing: 0.04em;
  line-height: 1.45;
  margin: 0;
  text-transform: uppercase;
}

.values-section {
  padding-bottom: clamp(3rem, 6vw, 5.5rem);
  padding-top: clamp(1.6rem, 3vw, 2.6rem);
}

.values-list {
  display: grid;
  gap: clamp(0.8rem, 1.4vw, 1rem);
  margin: clamp(2rem, 4vw, 3rem) auto 0;
  max-width: 56rem;
}

.value-row {
  align-items: stretch;
  border: 1px solid var(--about-line);
  display: grid;
  grid-template-columns: clamp(3.4rem, 6vw, 4.6rem) minmax(0, 1fr);
  min-height: clamp(3.6rem, 6vw, 4.8rem);
}

.value-row__icon {
  align-items: center;
  border-right: 1px solid var(--about-line);
  display: flex;
  justify-content: center;
}

.value-row__icon svg {
  fill: none;
  height: clamp(1.45rem, 2.2vw, 1.95rem);
  stroke: var(--about-light);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.25;
  width: clamp(1.45rem, 2.2vw, 1.95rem);
}

.value-row__body {
  align-items: center;
  display: grid;
  gap: 0.2rem;
  padding: 0.8rem clamp(0.9rem, 2vw, 1.4rem);
}

.value-row__title {
  color: var(--about-light);
  font-size: clamp(0.82rem, 1vw, 0.98rem);
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.1;
  margin: 0;
  text-transform: uppercase;
}

.value-row__copy {
  color: rgba(239, 248, 255, 0.72);
  font-size: clamp(0.78rem, 0.95vw, 0.9rem);
  line-height: 1.45;
  margin: 0;
}

.closing-section {
  background-position: center 38%;
  background-size: cover;
  min-height: clamp(22rem, 34vw, 30rem);
  padding: clamp(3.2rem, 7vw, 6rem) max(1.25rem, 7vw);
}

.closing-section__inner {
  margin: 0 auto;
  max-width: 58rem;
  text-align: center;
}

.closing-section__title {
  font-size: clamp(2.15rem, 4.2vw, 4.2rem);
  line-height: 0.98;
}

.closing-section__copy {
  color: rgba(239, 248, 255, 0.9);
  font-size: clamp(0.95rem, 1.25vw, 1.12rem);
  line-height: 1.55;
  margin: clamp(0.85rem, 1.4vw, 1.15rem) auto 0;
  max-width: 49rem;
}

.closing-section__link {
  border: 1px solid rgba(239, 248, 255, 0.74);
  color: var(--about-light);
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  line-height: 1;
  margin-top: clamp(1.7rem, 3vw, 2.5rem);
  padding: 0.7rem 1.45rem;
  text-transform: uppercase;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.closing-section__link:hover {
  background: var(--about-light);
  border-color: var(--about-light);
  color: var(--about-ink);
}

@media (max-width: 720px) {
  .about-hero {
    padding-top: 1.5rem;
  }

  .story-grid {
    align-items: start;
    grid-template-columns: 1fr;
    max-width: 34rem;
  }

  .timeline-list {
    border-bottom: 1px solid var(--about-line);
    border-right: 0;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 0 0 1.1rem;
  }

  .timeline-list__item {
    justify-content: center;
  }

  .story-copy {
    text-align: center;
  }
}

@media (max-width: 520px) {
  .about-page-header,
  .about-hero,
  .story-section,
  .values-section,
  .closing-section {
    padding-inline: 1rem;
  }

  .about-hero__title {
    font-size: 2.45rem;
  }

  .about-hero__image {
    aspect-ratio: 4 / 3;
  }

  .value-row {
    grid-template-columns: 3.25rem minmax(0, 1fr);
  }

  .value-row__copy {
    display: none;
  }
}
</style>
