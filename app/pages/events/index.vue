<script setup>
if (import.meta.server) {
  useSeoMeta({
    title: 'Events | Social Impact Investment Fund',
    description: 'Explore upcoming SIIF events, workshops, and student investment nights.',
    robots: 'index, follow',
    ogTitle: 'SIIF Events',
    ogDescription: 'Explore upcoming SIIF events, workshops, and student investment nights.',
    twitterCard: 'summary_large_image',
    twitterTitle: 'SIIF Events',
    twitterDescription: 'Explore upcoming SIIF events, workshops, and student investment nights.'
  })
}

const events = [
  {
    title: 'Introduction to Investment Management',
    time: 'Time',
    location: 'Location',
    detailsUrl: '#introduction-to-investment-management',
    signupUrl: 'https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/7509/',
    image: '/images/second-committee.png'
  },
  {
    title: 'Stock Pitch Night',
    time: 'Time',
    location: 'Location',
    detailsUrl: '#stock-pitch-night',
    signupUrl: 'https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/7509/',
    image: '/images/hero-committee.png'
  }
]
</script>

<template>
  <main class="events-page">
    <section class="events-hero" aria-labelledby="events-title">
      <h1 id="events-title" class="events-hero__title text--serif">Events</h1>
      <div class="events-hero__divider" aria-hidden="true"></div>
    </section>

    <section class="events-list" aria-label="Upcoming SIIF events">
      <article v-for="event in events" :id="event.detailsUrl.slice(1)" :key="event.title" class="event-card">
        <div class="event-card__media">
          <img class="event-card__image" :src="event.image" :alt="`${event.title} event preview`" />
        </div>

        <div class="event-card__content">
          <h2 class="event-card__title text--serif">{{ event.title }}</h2>

          <dl class="event-card__meta text--sans">
            <div>
              <dt>Time</dt>
              <dd>{{ event.time }}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{{ event.location }}</dd>
            </div>
          </dl>

          <div class="event-card__actions">
            <a class="event-card__button text--sans" :href="event.detailsUrl">Details</a>
            <a
              class="event-card__button text--sans"
              :href="event.signupUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sign Up
            </a>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.events-page {
  --events-ink: #0f1424;
  --events-light: #eff8ff;
  --events-card: #fbfaf7;
  --events-media: #e7f1f8;
  --events-button: #131b38;
  --events-muted: rgba(19, 27, 56, 0.72);
  --events-accent: #7981d7;

  background: var(--events-ink);
  color: var(--events-light);
  min-height: 100vh;
  padding: clamp(1.7rem, 4vw, 3.4rem) max(1.25rem, 7vw) clamp(18rem, 34vw, 31rem);
}

.events-hero {
  text-align: center;
}

.events-hero__title {
  color: var(--events-light);
  font-family: var(--font-serif);
  font-size: clamp(2.75rem, 5vw, 4.65rem);
  font-weight: 400;
  line-height: 0.95;
  margin: 0;
}

.events-hero__divider {
  background: var(--events-accent);
  height: 0.12rem;
  margin: clamp(0.65rem, 1vw, 0.9rem) auto 0;
  width: min(8.5rem, 34vw);
}

.events-list {
  display: grid;
  gap: clamp(1rem, 2vw, 1.5rem);
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: clamp(2.6rem, 5vw, 4.2rem) auto 0;
  max-width: 68rem;
}

.event-card {
  background: var(--events-card);
  border-radius: 0.5rem;
  color: var(--events-button);
  display: grid;
  grid-template-columns: minmax(8.5rem, 0.78fr) minmax(10rem, 1fr);
  min-height: clamp(9rem, 15vw, 12rem);
  overflow: hidden;
}

.event-card__media {
  background: var(--events-media);
  overflow: hidden;
}

.event-card__image {
  display: block;
  height: 100%;
  object-fit: cover;
  opacity: 0.18;
  width: 100%;
}

.event-card__content {
  display: flex;
  flex-direction: column;
  gap: clamp(0.7rem, 1.2vw, 1rem);
  justify-content: center;
  padding: clamp(1rem, 2vw, 1.4rem);
}

.event-card__title {
  color: var(--events-button);
  font-family: var(--font-serif);
  font-size: clamp(1rem, 1.55vw, 1.34rem);
  font-weight: 400;
  line-height: 1.02;
  margin: 0;
}

.event-card__meta {
  display: grid;
  gap: 0.3rem;
  margin: 0;
}

.event-card__meta div {
  align-items: center;
  display: grid;
  gap: 0.42rem;
  grid-template-columns: 0.54rem minmax(0, 1fr);
}

.event-card__meta dt {
  font-size: 0;
}

.event-card__meta dt::before {
  background: var(--events-button);
  border-radius: 0.5rem;
  content: "";
  display: block;
  height: 0.34rem;
  width: 0.34rem;
}

.event-card__meta dd {
  color: var(--events-muted);
  font-size: clamp(0.66rem, 0.85vw, 0.76rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.1;
  margin: 0;
  text-transform: uppercase;
}

.event-card__actions {
  display: flex;
  gap: 0.65rem;
  margin-top: 0.15rem;
}

.event-card__button {
  align-items: center;
  background: var(--events-button);
  border: 1px solid var(--events-button);
  border-radius: 0.25rem;
  box-sizing: border-box;
  color: var(--events-light);
  display: inline-flex;
  font-size: clamp(0.56rem, 0.75vw, 0.66rem);
  font-weight: 800;
  justify-content: center;
  letter-spacing: 0.1em;
  line-height: 1;
  min-height: 1.35rem;
  min-width: 0;
  padding: 0.42rem 0.78rem;
  text-align: center;
  text-transform: uppercase;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.event-card__button:hover {
  background: transparent;
  color: var(--events-button);
}

@media (max-width: 920px) {
  .events-list {
    grid-template-columns: 1fr;
    max-width: 34rem;
  }
}

@media (max-width: 520px) {
  .events-page {
    padding-inline: 1rem;
    padding-bottom: 10rem;
  }

  .event-card {
    grid-template-columns: 1fr;
  }

  .event-card__media {
    aspect-ratio: 16 / 7;
  }

  .event-card__content {
    min-height: 9.5rem;
  }
}
</style>
