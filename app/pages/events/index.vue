<script setup lang="ts">
type EventRecord = {
  id: string
  title: string
  start: string
  end?: string
  location: string
  category: string
  description?: string
  image: string
  signupUrl?: string
  detailsUrl: string
  status: 'upcoming' | 'past'
}

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

const { data, pending, error } = await useFetch<EventRecord[]>('/api/events', {
  default: () => []
})

const selectedFilter = ref('All')

const events = computed(() => data.value || [])

const filterOptions = computed(() => {
  const categories = events.value
    .map((event) => event.category)
    .filter(Boolean)
    .filter((value, index, list) => list.indexOf(value) === index)

  return ['All', ...categories]
})

const selectedFilterLabel = computed(() =>
  selectedFilter.value === 'All' ? 'Filter by State or Campus' : selectedFilter.value
)

const filteredEvents = computed(() =>
  selectedFilter.value === 'All'
    ? events.value
    : events.value.filter((event) => event.category === selectedFilter.value)
)

const eventTime = (event: EventRecord) => new Date(event.start).getTime()

const upcomingEvents = computed(() =>
  filteredEvents.value
    .filter((event) => eventTime(event) >= Date.now())
    .sort((a, b) => eventTime(a) - eventTime(b))
)

const previousEvents = computed(() =>
  filteredEvents.value
    .filter((event) => eventTime(event) < Date.now())
    .sort((a, b) => eventTime(b) - eventTime(a))
)

const eventSections = computed(() => [
  {
    key: 'upcoming',
    title: 'Upcoming Events',
    emptyMessage: 'No upcoming events match this filter yet.',
    events: upcomingEvents.value
  },
  {
    key: 'previous',
    title: 'Previous Events',
    emptyMessage: 'No previous events match this filter yet.',
    events: previousEvents.value
  }
])

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Australia/Melbourne'
  }).format(new Date(value))

const isExternalUrl = (value: string) => value.startsWith('http://') || value.startsWith('https://')

const fallbackImage = '/images/second-committee.png'

const handleImageError = (event: Event) => {
  const image = event.target as HTMLImageElement
  image.src = fallbackImage
}
</script>

<template>
  <Banner title="Our Events" />
  <main class="events-page">
    <section class="events-shell" aria-label="SIIF events">
      <details class="events-filter">
        <summary class="events-filter__summary text--sans">
          {{ selectedFilterLabel }}
        </summary>
        <div class="events-filter__menu" aria-label="Filter by state or campus">
          <button
            v-for="option in filterOptions"
            :key="option"
            class="events-filter__option text--sans"
            :class="{ 'events-filter__option--active': option === selectedFilter }"
            type="button"
            @click="selectedFilter = option"
          >
            {{ option }}
          </button>
        </div>
      </details>

      <div v-if="pending" class="events-state text--sans">Loading events...</div>
      <div v-else-if="error" class="events-state events-state--error text--sans">
        Events could not be loaded from Notion.
      </div>
      <div v-else-if="!filteredEvents.length" class="events-state text--sans">
        No events match this filter yet.
      </div>

      <div v-else class="events-sections">
        <section
          v-for="section in eventSections"
          :key="section.key"
          class="events-section"
          :aria-labelledby="`${section.key}-events-title`"
        >
          <header class="events-section__header">
            <h2 :id="`${section.key}-events-title`" class="events-section__title text--serif">
              {{ section.title }}
            </h2>
            <span class="events-section__count text--sans">{{ section.events.length }}</span>
          </header>

          <p v-if="!section.events.length" class="events-section__empty text--sans">
            {{ section.emptyMessage }}
          </p>

          <div v-else class="events-list">
            <article
              v-for="event in section.events"
              :id="event.id"
              :key="event.id"
              class="event-card"
              :class="{ 'event-card--past': section.key === 'previous' }"
            >
              <a
                class="event-card__media"
                :href="event.detailsUrl"
                :target="isExternalUrl(event.detailsUrl) ? '_blank' : undefined"
                :rel="isExternalUrl(event.detailsUrl) ? 'noopener noreferrer' : undefined"
                :aria-label="`Find out more about ${event.title}`"
              >
                <img
                  class="event-card__image"
                  :src="event.image || fallbackImage"
                  :alt="`${event.title} event preview`"
                  @error="handleImageError"
                />
              </a>

              <div class="event-card__content">
                <p class="event-card__category text--sans">{{ event.category }}</p>
                <h3 class="event-card__title text--serif">{{ event.title }}</h3>

                <dl class="event-card__meta text--sans">
                  <div class="event-card__meta-row event-card__meta-row--time">
                    <dt>Time</dt>
                    <dd>{{ formatDate(event.start) }}</dd>
                  </div>
                  <div class="event-card__meta-row event-card__meta-row--location">
                    <dt>Location</dt>
                    <dd>{{ event.location }}</dd>
                  </div>
                </dl>

                <p v-if="event.description" class="event-card__description text--sans">
                  {{ event.description }}
                </p>

                <div class="event-card__actions">
                  <a
                    v-if="event.signupUrl && section.key === 'upcoming'"
                    class="event-card__button event-card__button--primary text--sans"
                    :href="event.signupUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sign Up
                  </a>
                  <a
                    class="event-card__button text--sans"
                    :href="event.detailsUrl"
                    :target="isExternalUrl(event.detailsUrl) ? '_blank' : undefined"
                    :rel="isExternalUrl(event.detailsUrl) ? 'noopener noreferrer' : undefined"
                  >
                    Find Out More
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<style scoped>
.events-page {
  --events-bg: #fbfaf7;
  --events-ink: #0f1424;
  --events-muted: rgba(15, 20, 36, 0.68);
  --events-soft: #eef3f8;
  --events-line: rgba(15, 20, 36, 0.12);
  --events-accent: #c69a43;
  --events-shadow: 0 1.3rem 3rem rgba(15, 20, 36, 0.13);

  background: var(--events-bg);
  color: var(--events-ink);
  min-height: 100vh;
}

.events-shell {
  margin: 0 auto;
  max-width: 80rem;
  padding: clamp(2.8rem, 5vw, 4.4rem) max(1.25rem, 7vw) clamp(5rem, 8vw, 7rem);
}

.events-filter {
  display: inline-block;
  margin-bottom: clamp(1.2rem, 2.4vw, 1.9rem);
  position: relative;
  z-index: 2;
}

.events-filter__summary {
  align-items: center;
  background: var(--events-ink);
  border-radius: 0.34rem;
  color: #eff8ff;
  cursor: pointer;
  display: inline-flex;
  font-size: 0.92rem;
  font-weight: 800;
  gap: 1rem;
  justify-content: space-between;
  line-height: 1;
  list-style: none;
  min-width: min(18rem, calc(100vw - 2.5rem));
  padding: 1rem 1.1rem;
}

.events-filter__summary::-webkit-details-marker {
  display: none;
}

.events-filter__summary::after {
  border-bottom: 2px solid currentColor;
  border-right: 2px solid currentColor;
  content: "";
  height: 0.42rem;
  transform: rotate(45deg) translateY(-0.12rem);
  width: 0.42rem;
}

.events-filter[open] .events-filter__summary::after {
  transform: rotate(-135deg) translateY(-0.06rem);
}

.events-filter__menu {
  background: #ffffff;
  border: 1px solid var(--events-line);
  border-radius: 0.34rem;
  box-shadow: var(--events-shadow);
  display: grid;
  gap: 0.25rem;
  left: 0;
  margin-top: 0.45rem;
  min-width: 100%;
  padding: 0.45rem;
  position: absolute;
  top: 100%;
}

.events-filter__option {
  background: transparent;
  border: 0;
  border-radius: 0.22rem;
  color: var(--events-ink);
  cursor: pointer;
  font-size: 0.86rem;
  font-weight: 700;
  line-height: 1.1;
  padding: 0.72rem 0.8rem;
  text-align: left;
  transition: background-color 0.18s ease, color 0.18s ease;
  white-space: nowrap;
}

.events-filter__option:hover,
.events-filter__option--active {
  background: var(--events-ink);
  color: #eff8ff;
}

.events-sections {
  display: grid;
  gap: clamp(3rem, 5vw, 4.5rem);
}

.events-section {
  display: grid;
  gap: clamp(1.25rem, 2.4vw, 1.9rem);
}

.events-section__header {
  align-items: center;
  border-bottom: 1px solid var(--events-line);
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding-bottom: 0.8rem;
}

.events-section__title {
  color: var(--events-ink);
  font-family: var(--font-serif);
  font-size: clamp(2rem, 3.6vw, 3.5rem);
  font-weight: 400;
  letter-spacing: 0;
  line-height: 0.98;
  margin: 0;
}

.events-section__count {
  align-items: center;
  background: var(--events-ink);
  border-radius: 999px;
  color: #eff8ff;
  display: inline-flex;
  font-size: 0.78rem;
  font-weight: 800;
  height: 2rem;
  justify-content: center;
  min-width: 2rem;
  padding: 0 0.65rem;
}

.events-section__empty {
  background: #ffffff;
  border: 1px solid var(--events-line);
  border-radius: 0.5rem;
  color: var(--events-muted);
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  padding: clamp(1.25rem, 2.2vw, 1.7rem);
}

.events-list {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.25rem);
}

.event-card {
  background: #ffffff;
  border: 1px solid var(--events-line);
  border-radius: 0.5rem;
  box-shadow: var(--events-shadow);
  display: grid;
  grid-template-columns: minmax(18rem, 1fr) minmax(22rem, 0.96fr);
  min-height: clamp(18rem, 28vw, 24rem);
  overflow: hidden;
}

.event-card__media {
  background: var(--events-soft);
  display: block;
  min-height: 100%;
  overflow: hidden;
}

.event-card__image {
  display: block;
  height: 100%;
  object-fit: cover;
  transition: transform 0.26s ease;
  width: 100%;
}

.event-card:hover .event-card__image {
  transform: scale(1.025);
}

.event-card--past {
  box-shadow: 0 0.8rem 2rem rgba(15, 20, 36, 0.08);
}

.event-card--past .event-card__image {
  filter: saturate(0.72) brightness(0.88);
}

.event-card--past .event-card__category::after {
  color: var(--events-muted);
  content: " / Past Event";
}

.event-card__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding: clamp(1.6rem, 3vw, 3rem);
}

.event-card__category {
  color: var(--events-accent);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  line-height: 1;
  margin: 0 0 0.9rem;
  text-transform: uppercase;
}

.event-card__title {
  color: var(--events-ink);
  font-family: var(--font-serif);
  font-size: clamp(2rem, 3.15vw, 3rem);
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.02;
  margin: 0;
}

.event-card__meta {
  display: grid;
  gap: 0.65rem;
  margin: clamp(1.25rem, 2vw, 1.8rem) 0 0;
}

.event-card__meta-row {
  align-items: start;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1.15rem minmax(0, 1fr);
}

.event-card__meta dt {
  font-size: 0;
}

.event-card__meta dt::before {
  border: 2px solid var(--events-ink);
  border-radius: 999px;
  content: "";
  display: block;
  height: 0.76rem;
  margin-top: 0.1rem;
  width: 0.76rem;
}

.event-card__meta-row--location dt::before {
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
}

.event-card__meta dd {
  color: var(--events-muted);
  font-size: clamp(0.98rem, 1.2vw, 1.1rem);
  font-weight: 600;
  line-height: 1.45;
  margin: 0;
}

.event-card__description {
  color: var(--events-muted);
  font-size: clamp(0.94rem, 1.1vw, 1.02rem);
  line-height: 1.6;
  margin: clamp(1rem, 2vw, 1.5rem) 0 0;
}

.event-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: clamp(1.45rem, 2.6vw, 2rem);
}

.event-card__button {
  align-items: center;
  border: 1px solid var(--events-ink);
  border-radius: 0.3rem;
  box-sizing: border-box;
  color: var(--events-ink);
  display: inline-flex;
  font-size: 0.78rem;
  font-weight: 800;
  justify-content: center;
  letter-spacing: 0.08em;
  line-height: 1;
  min-height: 2.6rem;
  padding: 0.85rem 1.05rem;
  text-align: center;
  text-transform: uppercase;
  transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
}

.event-card__button--primary,
.event-card__button:hover {
  background: var(--events-ink);
  color: #eff8ff;
}

.event-card__button--primary:hover {
  background: transparent;
  color: var(--events-ink);
}

.events-state {
  background: #ffffff;
  border: 1px solid var(--events-line);
  border-radius: 0.5rem;
  box-shadow: var(--events-shadow);
  color: var(--events-muted);
  font-size: 1rem;
  font-weight: 700;
  margin-top: 1rem;
  padding: 2rem;
}

.events-state--error {
  color: #8b2635;
}

@media (max-width: 900px) {
  .event-card {
    grid-template-columns: 1fr;
  }

  .event-card__media {
    aspect-ratio: 16 / 9;
  }
}

@media (max-width: 560px) {
  .events-shell {
    padding-inline: 1rem;
  }

  .events-filter,
  .events-filter__summary {
    width: 100%;
  }

  .events-filter__summary {
    min-width: 0;
  }

  .events-filter__menu {
    position: static;
  }

  .event-card__content {
    padding: 1.35rem;
  }

  .event-card__title {
    font-size: 1.72rem;
  }

  .event-card__actions {
    flex-direction: column;
  }

  .event-card__button {
    width: 100%;
  }
}
</style>
