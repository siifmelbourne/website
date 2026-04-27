<template>
  <div class="role-card">
    <h3 class="text text--h3 text--serif">{{ title }}</h3>
    <NuxtImg
      class="member-img"
      :src="url" 
      width="160"
      height="160"
      :alt="name"
      fit="thumb"
      :modifiers="{ gravity: 'face', zoom: 0.7 }"
    />
    <p class="text text--p">{{ name }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  url: String,
  name: String
})
</script>

<style scoped>
.role-card {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center
}

.member-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.member {
  text-align: center;
  padding: 1rem;
  width: 10rem;
}

.member-img {
  width: 10rem;
  height: 10rem;
  object-fit: cover;
  border-radius: 50%;
}
</style>
