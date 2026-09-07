<script setup>
import ClubMembership from '~/components/contact/ClubMembership.vue'
import CorporatePartner from '~/components/contact/CorporatePartner.vue'
import ContactUs from '~/components/contact/ContactUs.vue'

const route = useRoute()

const sections = {
  'club-membership': ClubMembership,
  'corporate-partner': CorporatePartner,
  'contact-us': ContactUs
}

const contactTabs = [
  {
    key: 'club-membership',
    label: 'Club Membership',
    eyebrow: 'Join the community'
  },
  {
    key: 'corporate-partner',
    label: 'Corporate Partner',
    eyebrow: 'Work with SIIF'
  },
  {
    key: 'contact-us',
    label: 'Contact Us',
    eyebrow: ''
  }
]

const section = computed(() => {
  const current = route.params.section
  return sections[current] ? current : 'club-membership'
})

const activeTab = computed(() => contactTabs.find((tab) => tab.key === section.value) ?? contactTabs[0])

if (import.meta.server) {
  useSeoMeta({
    title: 'Contact Us | Social Impact Investment Fund',
    description: 'Join SIIF, partner with the fund, or get in touch with the team.',
    robots: 'index, follow',
    ogTitle: 'Contact SIIF',
    ogDescription: 'Join SIIF, partner with the fund, or get in touch with the team.',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Contact SIIF',
    twitterDescription: 'Join SIIF, partner with the fund, or get in touch with the team.'
  })
}
</script>

<template>
  <main class="contact-page">
    <section class="contact-hero" aria-labelledby="contact-title">
      <h1 id="contact-title" class="contact-hero__title text--serif">Contact Us</h1>
      <div class="contact-hero__divider" aria-hidden="true"></div>
    </section>

    <section class="contact-shell" :aria-labelledby="`${section}-title`">
      <nav class="contact-tabs" aria-label="Contact sections">
        <NuxtLink
          v-for="tab in contactTabs"
          :key="tab.key"
          class="contact-tab"
          :class="{ 'contact-tab--active': tab.key === section }"
          :to="`/contact/${tab.key}`"
        >
          <span v-if="tab.eyebrow" class="contact-tab__eyebrow text--sans">{{ tab.eyebrow }}</span>
          <span class="contact-tab__label text--serif">{{ tab.label }}</span>
        </NuxtLink>
      </nav>

      <div class="contact-content">
        <aside class="contact-content__aside" aria-hidden="true">
          <p v-if="activeTab.eyebrow" class="contact-content__kicker text--sans">{{ activeTab.eyebrow }}</p>
          <p class="contact-content__section text--serif">{{ activeTab.label }}</p>
        </aside>

        <section class="contact-content__main">
          <component :is="sections[section]" />
        </section>
      </div>
    </section>
  </main>
</template>

<style scoped>
.contact-page {
  --contact-ink: #0f1424;
  --contact-panel: #111827;
  --contact-light: #eff8ff;
  --contact-muted: rgba(239, 248, 255, 0.72);
  --contact-line: rgba(239, 248, 255, 0.34);
  --contact-accent: #7981d7;
  --contact-pad-block-start: clamp(1.7rem, 4vw, 3.4rem);
  --contact-pad-inline: max(1.25rem, 7vw);

  background: var(--contact-ink);
  color: var(--contact-light);
  min-height: 100vh;
  padding: var(--contact-pad-block-start) var(--contact-pad-inline) clamp(4rem, 7vw, 6rem);
}

.contact-hero {
  background-color: var(--contact-ink);
  background-image:
    linear-gradient(180deg, rgba(15, 20, 36, 0.5) 0%, rgba(15, 20, 36, 0.82) 100%),
    var(--subpage-cityscape-header);
  background-position: center, center 42%;
  background-repeat: no-repeat;
  background-size: cover, cover;
  display: grid;
  justify-items: center;
  margin: calc(0rem - var(--contact-pad-block-start)) calc(0rem - var(--contact-pad-inline)) 0;
  min-height: clamp(9rem, 20vw, 14rem);
  padding: clamp(2.1rem, 5vw, 4rem) var(--contact-pad-inline) clamp(1.7rem, 3.6vw, 2.9rem);
  text-align: center;
}

.contact-hero__title {
  color: var(--contact-light);
  font-family: var(--font-serif);
  font-size: clamp(2.75rem, 5vw, 4.65rem);
  font-weight: 400;
  line-height: 0.95;
  margin: 0;
  transform: translateY(var(--subpage-header-title-offset));
}

.contact-hero__divider {
  background: var(--contact-accent);
  height: 0.12rem;
  margin: clamp(0.65rem, 1vw, 0.9rem) auto 0;
  transform: translateY(var(--subpage-header-title-offset));
  width: min(8.5rem, 34vw);
}

.contact-shell {
  margin: clamp(2.8rem, 5vw, 4.6rem) auto 0;
  max-width: 78rem;
}

.contact-tabs {
  border: 1px solid var(--contact-line);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.contact-tab {
  color: var(--contact-muted);
  display: grid;
  gap: 0.45rem;
  min-height: clamp(7.2rem, 11vw, 9.8rem);
  padding: clamp(1.1rem, 2vw, 1.55rem);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.contact-tab + .contact-tab {
  border-left: 1px solid var(--contact-line);
}

.contact-tab:hover,
.contact-tab--active {
  background: rgba(239, 248, 255, 0.06);
  color: var(--contact-light);
}

.contact-tab--active {
  box-shadow: inset 0 -0.18rem 0 var(--contact-accent);
}

.contact-tab__eyebrow {
  align-self: start;
  font-size: clamp(0.68rem, 0.86vw, 0.8rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 1.2;
  text-transform: uppercase;
}

.contact-tab__label {
  align-self: end;
  font-family: var(--font-serif);
  font-size: clamp(1.25rem, 2vw, 1.8rem);
  font-weight: 400;
  line-height: 1;
}

.contact-content {
  border-bottom: 1px solid var(--contact-line);
  border-left: 1px solid var(--contact-line);
  border-right: 1px solid var(--contact-line);
  display: grid;
  grid-template-columns: minmax(13rem, 0.42fr) minmax(0, 1fr);
  min-height: clamp(22rem, 34vw, 31rem);
}

.contact-content__aside {
  align-content: space-between;
  background:
    linear-gradient(rgba(15, 20, 36, 0.76), rgba(15, 20, 36, 0.84)),
    url('/images/second-committee.png') center / cover;
  border-right: 1px solid var(--contact-line);
  display: grid;
  padding: clamp(1.4rem, 2.4vw, 2rem);
}

.contact-content__kicker {
  color: var(--contact-muted);
  font-size: clamp(0.7rem, 0.85vw, 0.82rem);
  font-weight: 700;
  letter-spacing: 0.12em;
  margin: 0;
  text-transform: uppercase;
}

.contact-content__section {
  color: var(--contact-light);
  font-size: clamp(2rem, 3.6vw, 3.8rem);
  line-height: 0.95;
  margin: 0;
}

.contact-content__main {
  align-items: center;
  background: var(--contact-panel);
  display: flex;
  padding: clamp(2rem, 5vw, 4.6rem);
}

.contact-content__main :deep(> div) {
  max-width: 47rem;
}

.contact-content__main :deep(h2) {
  color: var(--contact-light);
  font-family: var(--font-serif);
  font-size: clamp(2.1rem, 4vw, 4.25rem);
  font-weight: 400;
  letter-spacing: 0;
  line-height: 0.98;
  margin: 0 0 clamp(1.2rem, 2vw, 1.8rem);
}

.contact-content__main :deep(p) {
  color: rgba(239, 248, 255, 0.84);
  font-family: var(--font-sans);
  font-size: clamp(0.98rem, 1.18vw, 1.12rem);
  line-height: 1.65;
  margin: 0 0 1rem;
}

.contact-content__main :deep(.link) {
  color: var(--contact-light);
  text-decoration: underline;
  text-decoration-color: var(--contact-accent);
  text-underline-offset: 0.24em;
}

.contact-content__main :deep(.button) {
  border-color: var(--contact-light);
  color: var(--contact-light);
  font-family: var(--font-sans);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  margin-top: 0.85rem;
  text-transform: uppercase;
}

.contact-content__main :deep(.button:hover) {
  background: var(--contact-light);
  color: var(--contact-ink);
}

@media (max-width: 860px) {
  .contact-tabs,
  .contact-content {
    grid-template-columns: 1fr;
  }

  .contact-tab {
    min-height: 5rem;
  }

  .contact-tab + .contact-tab {
    border-left: 0;
    border-top: 1px solid var(--contact-line);
  }

  .contact-content__aside {
    border-bottom: 1px solid var(--contact-line);
    border-right: 0;
    min-height: 12rem;
  }
}

@media (max-width: 520px) {
  .contact-page {
    padding-inline: 1rem;
  }

  .contact-content__main {
    padding: 1.45rem;
  }
}
</style>
