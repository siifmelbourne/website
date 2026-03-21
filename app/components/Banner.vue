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

const img = useImage()
const imgUrl = img('/v1772458824/IMG_8254_vo2ius.jpg', { width: 1600 })
const backgroundStyles = {
  backgroundImage: `url('${imgUrl}')`
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
  height: 32rem;
  background-color: rgba(0, 0, 0, 0.7);
  background-blend-mode: darken;
  background-position: 50% 30%;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  box-sizing: border-box;
  text-align: center;
}
</style>
