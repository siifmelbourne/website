<template>
  <section class="hero-banner" :aria-labelledby="titleId">
    <div class="hero-banner__inner">
      <h1 :id="titleId" class="hero-banner__title text--serif">{{ title }}</h1>
      <div class="hero-banner__divider" aria-hidden="true"></div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const titleId = computed(() => `${props.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-page-title`)

const imgUrl = '/images/cityscape-header.png'

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: imgUrl,
      fetchpriority: 'high'
    }
  ]
})
</script>

<style scoped>
.hero-banner {
  width: 100%;
  min-height: clamp(9rem, 20vw, 14rem);
  box-sizing: border-box;
  background-color: #0f1424;
  background-image:
    linear-gradient(180deg, rgba(15, 20, 36, 0.5) 0%, rgba(15, 20, 36, 0.82) 100%),
    var(--subpage-cityscape-header);
  background-position: center, center 42%;
  background-repeat: no-repeat;
  background-size: cover, cover;
  display: grid;
  place-items: center;
  padding: clamp(2.1rem, 5vw, 4rem) max(1.25rem, 7vw) clamp(1.7rem, 3.6vw, 2.9rem);
  text-align: center;
}

.hero-banner__inner {
  display: grid;
  justify-items: center;
  transform: translateY(var(--subpage-header-title-offset));
}

.hero-banner__title {
  color: #eff8ff;
  font-family: var(--font-serif);
  font-size: clamp(2.84rem, 5.35vw, 4.65rem);
  font-weight: 400;
  line-height: 0.98;
  margin: 0;
}

.hero-banner__divider {
  width: min(8.5rem, 34vw);
  height: 0.12rem;
  margin: clamp(0.65rem, 1vw, 0.9rem) auto 0;
  background: #7981d7;
}

@media (max-width: 560px) {
  .hero-banner__title {
    font-size: 2.55rem;
  }
}
</style>
