<template>
  <div class="hero-banner" :style="backgroundStyles">
    <h1 class="text text--h1 text--serif text--invert">{{ title }}</h1>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
})

const imgUrl = '/images/cityscape-header.png'
const backgroundStyles = {
  backgroundImage: `linear-gradient(180deg, rgba(15, 20, 36, 0.5) 0%, rgba(15, 20, 36, 0.82) 100%), url('${imgUrl}')`
}

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
  background-color: #0f1424;
  background-position: center, center 42%;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  box-sizing: border-box;
  text-align: center;
}

.hero-banner .text {
  transform: translateY(var(--subpage-header-title-offset));
}
</style>
