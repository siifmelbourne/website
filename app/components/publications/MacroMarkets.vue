<script setup>
const { data } = await useAsyncData(
  "macro-markets",
  () => $fetch(`/api/macro-markets`),
  {
    keepPreviousData: true
  }
)
</script>

<template>
  <div>
    <h2 class="text text--h2">Macro Markets</h2>
    <p class="text text--p">A data-driven insight into market trends, key developments, and indicators to watch in the week ahead.</p>
    <div class="article-body">
      <div class="article-col">

      <!-- <PictureItem title="October 13, 2025" url="https://www.instagram.com/p/DPvm9NCk4lM/"/> -->
      <!-- <PictureItem title="September 29, 2025" url="https://www.instagram.com/p/DPK0IYPk06i/"/> -->
      <!-- <PictureItem title="September 15, 2025" url="https://www.instagram.com/p/DOma6AVEzJ4/"/> -->
      <!-- <PictureItem title="September 1, 2025" url="https://www.instagram.com/p/DOCXyftEwGK/"/> -->
      <!-- <PictureItem title="August 18, 2025" url="https://www.instagram.com/p/DNemFRrzYsd/"/> -->
      <!-- <PictureItem title="May 5, 2025" url="https://www.instagram.com/p/DJQJOpfTQEU/"/> -->
      <!-- <PictureItem title="April 28, 2025" url="https://www.instagram.com/p/DI-OmyLT6sR/"/> -->
      <!-- <PictureItem title="April 7, 2025" url="https://www.instagram.com/p/DIIQjRATEiX/"/> -->
      <!-- <PictureItem title="March 31, 2025" url="https://www.instagram.com/p/DH2fz0qT3hB/"/> -->
      <!-- <PictureItem title="March 24, 2025" url="https://www.instagram.com/p/DHkwIrNTd5a/"/> -->
        <CarouselItem 
          v-for="frame in data"
          :slides=frame.slides
          :date=frame.date
          :link=frame.link
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.article-col {
  display: flex;
  flex-direction: column;
  gap: 2rem 0;
  max-width: 40rem;
}
</style>

