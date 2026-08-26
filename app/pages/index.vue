<script setup>
if (import.meta.server) {
  useSeoMeta({
    title: 'Social Impact Investment Fund | Home',
    description: "Australia's premier buy-side, student-led investment fund at the University of Melbourne.",
    robots: 'index, follow',
    ogTitle: 'Social Impact Investment Fund',
    ogUrl: 'https://www.siifmelbourne.com/',
    ogDescription: "Australia's premier buy-side, student-led investment fund at the University of Melbourne.",
    twitterCard: 'summary_large_image',
    twitterTitle: 'Social Impact Investment Fund',
    twitterDescription: "Australia's premier buy-side, student-led investment fund at the University of Melbourne.",
  })
}

const heroImage = '/images/hero-committee.png'
const ogImage = heroImage

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: heroImage,
      fetchpriority: 'high'
    }
  ]
})

useSeoMeta({
  ogImage,
  twitterImage: ogImage
})

const heroStyles = {
  backgroundImage: `linear-gradient(rgba(15, 20, 36, 0.62), rgba(15, 20, 36, 0.66)), url('${heroImage}')`
}

const stats = [
  {
    value: '$23,000+',
    label: 'Donated',
    detail: 'All proceeds support our nominated charities.'
  },
  {
    value: '$5,000+',
    label: 'Capital under management',
    detail: 'Real capital deployed through student-led ideas.'
  },
  {
    value: '1,300+',
    label: 'Members',
    detail: 'A growing community across the University of Melbourne.'
  }
]

const partnerLogosImage = '/images/logos-partners.png'
</script>

<template>
  <main class="landing">
    <section class="hero" :style="heroStyles" aria-labelledby="home-title">
      <div class="hero__inner">
        <h1 id="home-title" class="hero__title text--serif">
          Social Impact<br>
          <span class="hero__title-line">Investment Fund</span>
        </h1>
        <div class="hero__divider" aria-hidden="true"></div>
        <p class="hero__subtitle text--sans">Australia's premier buy-side, student-led investment fund</p>
      </div>
    </section>

    <section class="stat-strip" aria-label="SIIF at a glance">
      <article v-for="stat in stats" :key="stat.label" class="stat-card">
        <p class="stat-card__value text--serif">{{ stat.value }}</p>
        <h2 class="stat-card__label text--sans">{{ stat.label }}</h2>
        <p class="stat-card__detail text--sans">{{ stat.detail }}</p>
      </article>
    </section>

    <section class="intro-section">
      <div class="intro-section__left">
        <h2 class="section-title text--serif">
          <span class="intro-section__title-line">We’re Australia’s premier-run student</span><br>
          <span class="intro-section__title-line">investment fund.</span>
        </h2>
        <div class="intro-section__media" aria-label="SIIF committee placeholder image">
          <img
            class="intro-section__image"
            src="/images/second-committee.png"
            alt="SIIF committee members gathered in front of stone arches"
          />
        </div>
      </div>
      <div class="intro-section__copy">
        <div class="intro-section__divider" aria-hidden="true"></div>
        <p class="section-body text--sans">
          The Social Impact Investment Fund is the first<br>
          and only student led investment fund in<br>
          Victoria managing real capital. We provide<br>
          students the opportunity to pitch investment<br>
          ideas to a team of committee and partner<br>
          representatives, and employ those ideas into a<br>
          tangible portfolio.
        </p>
        <p class="section-body section-body--emphasis text--sans"><em>All</em> proceeds go towards our nominated<br>charities.</p>
        <NuxtLink class="intro-section__link text--sans" to="/contact">Contact us</NuxtLink>
      </div>
    </section>

    <section class="partners-section" aria-labelledby="partners-title">
      <div class="partners-section__heading">
        <p class="partners-section__eyebrow text--serif">Our amazing work wouldn't be possible without...</p>
        <h2 id="partners-title" class="partners-section__title text--serif">Our Partners</h2>
      </div>
      <div class="partners-grid" aria-label="SIIF partners">
        <img
          class="partner-logo__image"
          :src="partnerLogosImage"
          alt="River Capital, Susquehanna, Inaam, and YouTrip partner logos"
        />
      </div>
    </section>

    <section class="join-section">
      <div class="join-section__panel">
        <h2 class="join-section__title text--serif">Why not join us?</h2>
        <p class="join-section__body text--sans">
          We want <em>you</em> to be a part of siif.<br>
          Follow us on our socials or contact us to get involved!
        </p>
        <div class="join-section__divider" aria-hidden="true"></div>
      </div>
      <div class="join-section__aside">
        <img
          class="join-section__image"
          src="/images/snapshots-community.png"
          alt="Snapshots of SIIF events, student trips, pitch nights, and community gatherings"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.landing {
  --landing-cream: #fff8ef;
  --landing-ink: #0f1424;
  --landing-muted: #5f625c;
  --landing-gold: #c69a43;
  --landing-sage: #dce5d1;
  --landing-line: rgba(15, 20, 36, 0.16);
  --landing-azure: #eff8ff;

  background: var(--landing-cream);
  color: var(--landing-ink);
}

.hero {
  min-height: clamp(43rem, 90svh, 60rem);
  background-position: 50% 52%;
  background-size: cover;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(4rem, 8vw, 8rem) max(1.5rem, 8vw) clamp(3.25rem, 7vw, 6rem);
  text-align: center;
}

.hero__inner {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: clamp(13rem, 31svh, 21rem);
  max-width: min(48rem, 92vw);
}

.section-kicker {
  color: var(--landing-gold);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  margin: 0 0 1rem;
  text-transform: uppercase;
}

.hero__title {
  color: var(--landing-azure);
  font-family: var(--font-serif);
  font-size: clamp(2.84rem, 5.35vw, 4.65rem);
  font-weight: 400;
  line-height: 0.98;
  margin: 0;
  max-width: none;
}

.hero__title-line {
  white-space: nowrap;
}

.hero__divider {
  background: #7981d7;
  height: 0.18rem;
  margin: 1.4rem 0 1.05rem;
  width: min(11.25rem, 38vw);
}

.hero__subtitle {
  color: var(--landing-azure);
  font-family: var(--font-sans);
  font-size: clamp(0.78rem, 1.25vw, 1rem);
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.5;
  margin: 0;
  text-transform: uppercase;
}

.button {
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.button--light {
  background: var(--off-white);
  border-color: var(--off-white);
  color: var(--landing-ink);
}

.button--ghost {
  border-color: rgba(255, 245, 238, 0.7);
  color: var(--off-white);
}

.button--ghost:hover {
  background: var(--off-white);
  border-color: var(--off-white);
  color: var(--landing-ink);
}

.stat-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  margin: clamp(2rem, 5vw, 4rem) auto 0;
  max-width: 108rem;
  padding: 0 max(1.5rem, 6vw);
}

.stat-card {
  background: var(--landing-cream);
  border: 1px solid var(--landing-line);
  min-height: 12rem;
  padding: clamp(1.25rem, 3vw, 2rem);
}

.stat-card__value {
  font-size: clamp(2.6rem, 6vw, 4.8rem);
  line-height: 0.95;
  margin: 0 0 0.8rem;
}

.stat-card__label {
  font-size: 0.86rem;
  letter-spacing: 0.11em;
  margin: 0 0 0.8rem;
  text-transform: uppercase;
}

.stat-card__detail {
  color: var(--landing-muted);
  font-size: 0.96rem;
  line-height: 1.55;
  margin: 0;
}

.intro-section,
.partners-section,
.join-section {
  margin: 0 auto;
  max-width: 108rem;
  padding: clamp(2.5rem, 6vw, 6rem) max(1.5rem, 8vw);
}

.intro-section {
  align-items: center;
  background: var(--dark-blue);
  color: var(--landing-azure);
  display: grid;
  gap: clamp(3rem, 7vw, 7rem);
  grid-template-columns: minmax(0, 1.12fr) minmax(19rem, 0.88fr);
  max-width: none;
  padding: clamp(4.5rem, 8vw, 7rem) max(1.5rem, 7vw);
}

.intro-section__left {
  min-width: 0;
}

.intro-section__copy {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  margin: clamp(2rem, 4vw, 4rem) 0 0 auto;
  max-width: 32rem;
  text-align: right;
}

.section-title {
  font-size: clamp(2.6rem, 6vw, 5.6rem);
  font-weight: 400;
  line-height: 0.98;
  margin: 0;
  max-width: 11ch;
}

.intro-section .section-title {
  font-family: var(--font-serif);
  font-size: clamp(1.85rem, 2.85vw, 3.05rem);
  line-height: 0.95;
  max-width: none;
}

.intro-section__title-line {
  white-space: nowrap;
}

.section-body {
  color: var(--landing-muted);
  font-size: clamp(1rem, 1.4vw, 1.18rem);
  line-height: 1.8;
  margin: 1.5rem 0 0;
  max-width: 45rem;
}

.intro-section .section-body {
  color: var(--landing-azure);
  font-family: var(--font-serif);
  font-size: clamp(1.18rem, 1.84vw, 1.56rem);
  line-height: 1.05;
  margin-left: auto;
  margin-right: 0;
  max-width: 30rem;
}

.section-body--emphasis {
  color: var(--landing-ink);
  font-weight: 700;
}

.intro-section .section-body--emphasis {
  color: var(--landing-azure);
  font-weight: 400;
  margin-top: 1.45rem;
}

.intro-section__divider {
  background: #7981d7;
  height: 0.16rem;
  margin-bottom: clamp(2.4rem, 5vw, 4rem);
  width: min(11rem, 48vw);
}

.intro-section__link {
  color: var(--landing-azure);
  display: inline-block;
  font-size: clamp(0.98rem, 1.2vw, 1.1rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.2;
  margin-top: clamp(4rem, 9vw, 7rem);
  text-transform: uppercase;
}

.intro-section__media {
  margin-top: clamp(2.25rem, 5vw, 4rem);
  overflow: hidden;
}

.intro-section__image {
  display: block;
  aspect-ratio: 16 / 9;
  height: auto;
  object-fit: cover;
  width: 100%;
}

.partners-section {
  align-items: center;
  background: #1a253e;
  color: var(--landing-azure);
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 1.6rem);
  max-width: none;
  padding-bottom: clamp(2rem, 3.5vw, 3rem);
  padding-top: clamp(2.4rem, 4vw, 3.4rem);
  text-align: center;
}

.partners-section__heading {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.partners-section__eyebrow {
  color: var(--landing-azure);
  font-family: var(--font-serif);
  font-size: clamp(0.95rem, 1.35vw, 1.25rem);
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
}

.partners-section__title {
  color: var(--landing-azure);
  font-family: var(--font-serif);
  font-size: clamp(3.2rem, 5.3vw, 5rem);
  font-weight: 400;
  line-height: 0.98;
  margin: 0;
}

.partners-grid {
  align-items: center;
  display: flex;
  justify-content: center;
  width: min(100%, 88rem);
}

.partner-logo__image {
  display: block;
  height: auto;
  object-fit: contain;
  width: 100%;
}

.join-section {
  align-items: center;
  background: #fbfaf7;
  display: flex;
  flex-direction: column;
  gap: clamp(0.6rem, 1.1vw, 1rem);
  max-width: none;
  padding: clamp(1.2rem, 2.4vw, 2rem) max(0.35rem, 1vw) clamp(1.2rem, 2.4vw, 2rem);
  text-align: center;
}

.join-section__panel,
.join-section__aside {
  padding: 0;
}

.join-section__panel {
  align-items: center;
  background: transparent;
  display: flex;
  flex-direction: column;
}

.join-section__title {
  color: #050506;
  font-family: var(--font-serif);
  font-size: clamp(2.35rem, 3.65vw, 3.6rem);
  font-weight: 400;
  line-height: 0.96;
  margin: 0;
}

.join-section__body {
  color: #111111;
  font-family: var(--font-sans);
  font-size: clamp(0.92rem, 1.15vw, 1.08rem);
  line-height: 1.25;
  margin: clamp(0.45rem, 0.8vw, 0.7rem) 0 0;
  max-width: 46rem;
}

.join-section__body em {
  font-style: italic;
}

.join-section__divider {
  background: #7981d7;
  height: 0.16rem;
  margin-top: clamp(0.85rem, 1.3vw, 1.2rem);
  width: min(8.6rem, 34vw);
}

.join-section__aside {
  background: transparent;
  overflow: visible;
  width: min(116rem, 99vw);
}

.join-section__image {
  display: block;
  height: auto;
  margin: 0 auto;
  max-height: 92svh;
  object-fit: contain;
  width: 100%;
}

@media (max-width: 860px) {
  .hero {
    min-height: 40rem;
  }

  .stat-strip,
  .intro-section,
  .partners-section,
  .join-section {
    grid-template-columns: 1fr;
  }

  .stat-strip {
    padding: 0 1rem;
  }

  .intro-section__media,
  .intro-section__image {
    min-height: 0;
  }

  .intro-section__copy {
    margin-top: 0;
  }

  .intro-section .section-title {
    max-width: 18ch;
  }

  .intro-section__title-line {
    white-space: normal;
  }

  .partners-grid {
    width: min(100%, 44rem);
  }
}

@media (max-width: 560px) {
  .hero {
    padding: 4rem 1.25rem;
  }

  .hero__inner {
    margin-top: clamp(9.5rem, 26svh, 14rem);
  }

  .hero__title {
    font-size: 2.55rem;
  }

  .partners-grid {
    width: min(100%, 24rem);
  }
}
</style>
