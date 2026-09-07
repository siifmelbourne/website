<script setup lang="ts">
type CommitteeMember = {
  name: string
  url: string
  title: string
  last_edited_time?: string
}

type RawCommitteeGroup = CommitteeMember[][]

const investmentManagerNames = [
  'Aikie Davoren',
  'Joel Jacobson'
]

const investmentPodDefinitions = [
  {
    title: 'Pod #1',
    leads: ['Danny Tran'],
    analysts: ['Jenny Tran', 'Joseph Abi Raad', 'Panav Jaura']
  },
  {
    title: 'Pod #2',
    leads: ['Hannah Manne'],
    analysts: ['Tenko OBrien', 'Zif Morris', 'Matea Milisavljevie']
  },
  {
    title: 'Pod #3',
    leads: ['Jayshant'],
    analysts: ['Jack Maxwell-Davis', 'Daniel Raie', 'Justin Tran', 'Annabelle Chang']
  },
  {
    title: 'Pod #4',
    leads: ['Rohan Hariharan'],
    analysts: ['Eric Chen', 'Rui Ke Yap', 'William Lynch']
  },
  {
    title: 'Pod #5',
    leads: ['Sagar Hubli'],
    analysts: ['Mia Wegner', 'Eleni Girma', 'Ranak Jaiswal']
  }
]

const props = defineProps<{
  year: string
}>()

const { data, error, pending } = await useAsyncData(
  `committee-${props.year}`,
  () => $fetch<RawCommitteeGroup[]>(`/api/committee?year=${encodeURIComponent(props.year)}`),
  {
    keepPreviousData: true
  }
)

const displayYear = computed(() => {
  const match = props.year.match(/^(\d{4})-sem-(\d)$/)

  if (!match) {
    return props.year.replace(/-/g, ' ')
  }

  const semester = match[2] === '1' ? 'One' : 'Two'
  return `Semester ${semester}, ${match[1]}`
})

const sections = computed(() => {
  return (data.value || [])
    .map((group, index) => {
      const directors = group?.[0] || []
      const officers = group?.[1] || []
      const members = [...directors, ...officers]

      return {
        id: `${index}-${sectionTitle(members, index).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        title: sectionTitle(members, index),
        directors,
        officers,
        members
      }
    })
    .filter((section) => section.members.length > 0)
})

function sectionTitle(members: CommitteeMember[], index: number) {
  const titles = members.map((member) => member.title || '')

  if (titles.some((title) => /president|treasurer|secretary|\bcoo\b|\bcio\b/i.test(title))) {
    return 'Executives'
  }

  if (titles.some((title) => /lead analyst|portfolio manager|support analyst/i.test(title))) {
    return 'Investments'
  }

  const firstTitle = titles.find(Boolean)

  if (!firstTitle) {
    return `Team ${index + 1}`
  }

  return firstTitle
    .replace(/\s+(director|officer)s?$/i, '')
    .replace(/^people and culture$/i, 'People & Culture')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function memberImage(member: CommitteeMember) {
  return member.url
}

function memberRole(member: CommitteeMember) {
  if (/people and culture/i.test(member.title || '')) {
    return normalizeName(member.name) === 'olivialiu' ? 'P&C Director' : 'P&C Officer'
  }

  return member.title
}

function normalizeName(name: string) {
  return name
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

function membersByName(section: { members: CommitteeMember[] }, names: string[]) {
  return names
    .map((name) => {
      const targetName = normalizeName(name)

      return section.members.find((member) => {
        const memberName = normalizeName(member.name)
        return memberName === targetName || memberName.includes(targetName)
      })
    })
    .filter((member): member is CommitteeMember => Boolean(member))
}

function investmentManagers(section: { members: CommitteeMember[] }) {
  return membersByName(section, investmentManagerNames)
}

function investmentPods(section: { members: CommitteeMember[] }) {
  return investmentPodDefinitions.map((pod) => ({
    title: pod.title,
    leads: membersByName(section, pod.leads),
    analysts: membersByName(section, pod.analysts)
  }))
}
</script>

<template>
  <main class="committee-page">
    <section class="committee-hero" aria-labelledby="committee-title">
      <div class="committee-hero__inner">
        <h1 id="committee-title" class="committee-hero__title text--serif">Our Committee</h1>
        <div class="committee-hero__divider" aria-hidden="true"></div>
      </div>
    </section>

    <section class="committee-board" aria-label="Committee members">
      <div v-if="pending" class="committee-state text--sans">Loading committee members...</div>

      <div v-else-if="error" class="committee-state committee-state--error text--sans">
        The committee release could not be loaded.
      </div>

      <div v-else-if="!sections.length" class="committee-state text--sans">
        No committee members are available for {{ displayYear }} yet.
      </div>

      <div v-else class="committee-board__inner">
        <article
          v-for="section in sections"
          :key="section.id"
          class="committee-section"
          :class="{ 'committee-section--executives': section.title === 'Executives' }"
        >
          <header class="committee-section__header">
            <span class="committee-section__rule" aria-hidden="true"></span>
            <h2 class="committee-section__title text--serif">{{ section.title }}</h2>
            <span class="committee-section__rule" aria-hidden="true"></span>
          </header>

          <div
            v-if="section.title === 'Investments'"
            class="investment-layout"
          >
            <div class="committee-section__members investment-managers">
              <article
                v-for="member in investmentManagers(section)"
                :key="`${section.id}-manager-${member.name}`"
                class="member-card"
              >
                <NuxtImg
                  class="member-card__image"
                  :src="memberImage(member)"
                  :alt="member.name"
                  width="190"
                  height="190"
                  fit="thumb"
                  :modifiers="{ gravity: 'face', zoom: 0.72 }"
                  loading="lazy"
                />
                <h3 class="member-card__name text--sans">{{ member.name }}</h3>
                <p class="member-card__role text--sans">Portfolio Manager</p>
              </article>
            </div>

            <div class="investment-pods" aria-label="Investment pods">
              <article
                v-for="pod in investmentPods(section)"
                :key="pod.title"
                class="investment-pod"
              >
                <h3 class="investment-pod__title text--serif">{{ pod.title }}</h3>

                <div class="committee-section__members investment-pod__row">
                  <article
                    v-for="member in pod.leads"
                    :key="`${pod.title}-lead-${member.name}`"
                    class="member-card"
                  >
                    <NuxtImg
                      class="member-card__image"
                      :src="memberImage(member)"
                      :alt="member.name"
                      width="190"
                      height="190"
                      fit="thumb"
                      :modifiers="{ gravity: 'face', zoom: 0.72 }"
                      loading="lazy"
                    />
                    <h3 class="member-card__name text--sans">{{ member.name }}</h3>
                    <p class="member-card__role text--sans">Lead Analyst</p>
                  </article>

                  <article
                    v-for="member in pod.analysts"
                    :key="`${pod.title}-analyst-${member.name}`"
                    class="member-card member-card--small"
                  >
                    <NuxtImg
                      class="member-card__image"
                      :src="memberImage(member)"
                      :alt="member.name"
                      width="170"
                      height="170"
                      fit="thumb"
                      :modifiers="{ gravity: 'face', zoom: 0.72 }"
                      loading="lazy"
                    />
                    <h3 class="member-card__name text--sans">{{ member.name }}</h3>
                    <p class="member-card__role text--sans">Analyst</p>
                  </article>
                </div>
              </article>
            </div>
          </div>

          <div
            v-else-if="section.directors.length >= 2"
            class="committee-section__tiers"
          >
            <div class="committee-section__members committee-section__members--directors">
              <article
                v-for="member in section.directors"
                :key="`${section.id}-director-${member.name}-${member.title}`"
                class="member-card"
              >
                <NuxtImg
                  class="member-card__image"
                  :src="memberImage(member)"
                  :alt="member.name"
                  width="190"
                  height="190"
                  fit="thumb"
                  :modifiers="{ gravity: 'face', zoom: 0.72 }"
                  loading="lazy"
                />
                <h3 class="member-card__name text--sans">{{ member.name }}</h3>
                <p class="member-card__role text--sans">{{ memberRole(member) }}</p>
              </article>
            </div>

            <div class="committee-section__members committee-section__members--officers">
              <article
                v-for="member in section.officers"
                :key="`${section.id}-officer-${member.name}-${member.title}`"
                class="member-card"
              >
                <NuxtImg
                  class="member-card__image"
                  :src="memberImage(member)"
                  :alt="member.name"
                  width="190"
                  height="190"
                  fit="thumb"
                  :modifiers="{ gravity: 'face', zoom: 0.72 }"
                  loading="lazy"
                />
                <h3 class="member-card__name text--sans">{{ member.name }}</h3>
                <p class="member-card__role text--sans">{{ memberRole(member) }}</p>
              </article>
            </div>
          </div>

          <div v-else class="committee-section__members">
            <article
              v-for="member in section.members"
              :key="`${section.id}-${member.name}-${member.title}`"
              class="member-card"
            >
              <NuxtImg
                class="member-card__image"
                :src="memberImage(member)"
                :alt="member.name"
                width="190"
                height="190"
                fit="thumb"
                :modifiers="{ gravity: 'face', zoom: 0.72 }"
                loading="lazy"
              />
              <h3 class="member-card__name text--sans">{{ member.name }}</h3>
              <p class="member-card__role text--sans">{{ memberRole(member) }}</p>
            </article>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.committee-page {
  --committee-bg: #0f1424;
  --committee-panel: #1a253e;
  --committee-ink: #eff8ff;
  --committee-muted: rgba(239, 248, 255, 0.72);
  --committee-line: rgba(239, 248, 255, 0.28);
  --committee-accent: #7981d7;

  background: var(--committee-bg);
  color: var(--committee-ink);
  min-height: 100vh;
}

.committee-hero {
  background-color: var(--committee-bg);
  background-image:
    linear-gradient(180deg, rgba(15, 20, 36, 0.5) 0%, rgba(15, 20, 36, 0.82) 100%),
    var(--subpage-cityscape-header);
  background-position: center, center 42%;
  background-repeat: no-repeat;
  background-size: cover, cover;
  min-height: clamp(9rem, 20vw, 14rem);
  padding: clamp(2.4rem, 5vw, 4.2rem) max(1.15rem, 7vw) clamp(1.7rem, 4vw, 3rem);
  text-align: center;
}

.committee-hero__inner {
  margin: 0 auto;
  max-width: 72rem;
  transform: translateY(var(--subpage-header-title-offset));
}

.committee-hero__title {
  color: var(--committee-ink);
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 400;
  letter-spacing: 0;
  line-height: 0.86;
  margin: 0;
}

.committee-hero__divider {
  background: var(--committee-accent);
  height: 0.12rem;
  margin: clamp(1rem, 2vw, 1.4rem) auto 0;
  width: min(12rem, 40vw);
}

.committee-board {
  padding: clamp(1.5rem, 3.8vw, 3.5rem) max(1rem, 5vw) clamp(4rem, 7vw, 6.5rem);
}

.committee-board__inner {
  display: grid;
  gap: clamp(2.6rem, 6vw, 5.5rem);
  margin: 0 auto;
  max-width: 78rem;
}

.committee-section {
  display: grid;
  gap: clamp(1.2rem, 2.4vw, 2rem);
}

.committee-section__header {
  align-items: center;
  display: grid;
  gap: clamp(0.8rem, 2vw, 1.3rem);
  grid-template-columns: minmax(1.8rem, 1fr) auto minmax(1.8rem, 1fr);
}

.committee-section__rule {
  background: var(--committee-line);
  display: block;
  height: 1px;
}

.committee-section__title {
  color: var(--committee-ink);
  font-size: clamp(1.7rem, 3vw, 2.8rem);
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1;
  margin: 0;
  text-align: center;
}

.committee-section__members {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1.25rem, 2.2vw, 2.2rem) clamp(0.9rem, 1.8vw, 1.6rem);
  justify-content: center;
}

.committee-section__tiers {
  display: grid;
  gap: clamp(1.65rem, 3vw, 2.7rem);
}

.committee-section__members--directors {
  margin-inline: auto;
  max-width: 38rem;
  width: 100%;
}

.committee-section--executives .committee-section__members {
  margin: 0 auto;
  max-width: 58rem;
  width: 100%;
}

.investment-layout {
  display: grid;
  gap: clamp(2.1rem, 4.5vw, 4rem);
}

.investment-managers {
  margin-inline: auto;
  max-width: 38rem;
  width: 100%;
}

.investment-pods {
  display: grid;
  gap: clamp(2rem, 4vw, 3.4rem);
  grid-template-columns: 1fr;
}

.investment-pod {
  border-top: 1px solid var(--committee-line);
  display: grid;
  gap: clamp(1rem, 2vw, 1.65rem);
  padding-top: clamp(1rem, 2vw, 1.45rem);
}

.investment-pod__title {
  color: var(--committee-ink);
  font-size: clamp(1.15rem, 2vw, 1.7rem);
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
}

.investment-pod__row {
  column-gap: clamp(0.65rem, 1.4vw, 1.05rem);
  row-gap: clamp(0.9rem, 1.8vw, 1.3rem);
}

.member-card {
  align-items: center;
  display: grid;
  gap: 0.42rem;
  justify-items: center;
  max-width: 10.8rem;
  min-width: 0;
  text-align: center;
  width: clamp(8.5rem, 13vw, 10.8rem);
}

.member-card--small {
  width: clamp(7.6rem, 11vw, 9.5rem);
}

.member-card__image {
  aspect-ratio: 1;
  background: var(--committee-panel);
  border: 1px solid rgba(239, 248, 255, 0.26);
  border-radius: 999px;
  box-shadow: 0 1.2rem 2.5rem rgba(0, 0, 0, 0.18);
  display: block;
  height: clamp(6.7rem, 11vw, 9.5rem);
  object-fit: cover;
  object-position: center;
  width: clamp(6.7rem, 11vw, 9.5rem);
}

.member-card--small .member-card__image {
  height: clamp(6.1rem, 9.5vw, 8.4rem);
  width: clamp(6.1rem, 9.5vw, 8.4rem);
}

.member-card__name {
  color: var(--committee-ink);
  font-size: clamp(0.78rem, 1vw, 0.95rem);
  font-weight: 800;
  letter-spacing: 0.03em;
  line-height: 1.12;
  margin: 0.22rem 0 0;
  max-width: 100%;
  overflow-wrap: anywhere;
  text-transform: uppercase;
}

.member-card__role {
  color: var(--committee-muted);
  font-family: var(--font-serif);
  font-size: clamp(0.68rem, 0.9vw, 0.78rem);
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 1.18;
  margin: 0;
  max-width: 100%;
  overflow-wrap: anywhere;
  text-transform: uppercase;
}

.committee-state {
  border: 1px solid var(--committee-line);
  color: var(--committee-muted);
  font-size: clamp(0.88rem, 1.2vw, 1rem);
  line-height: 1.5;
  margin: 0 auto;
  max-width: 44rem;
  padding: 1.2rem;
  text-align: center;
}

.committee-state--error {
  color: #ffd6d6;
}

@media (max-width: 640px) {
  .committee-hero {
    padding-top: 2rem;
  }

  .committee-section__header {
    grid-template-columns: 1fr;
  }

  .committee-section__rule {
    margin: 0 auto;
    width: min(10rem, 44vw);
  }

}

@media (max-width: 390px) {
  .member-card {
    width: min(100%, 11rem);
  }
}
</style>
