<script setup lang="ts">
import CommitteeBoard from '~/components/committee/CommitteeBoard.vue'

const year = '2026-sem-2'

useSeoMeta({
  title: 'Committee | Social Impact Investment Fund',
  description: 'Meet the Social Impact Investment Fund committee.',
  robots: 'index, follow',
  ogTitle: 'SIIF Committee',
  ogDescription: 'Meet the Social Impact Investment Fund committee.',
  twitterCard: 'summary_large_image',
  twitterTitle: 'SIIF Committee',
  twitterDescription: 'Meet the Social Impact Investment Fund committee.'
})
</script>

<template>
  <CommitteeBoard :year="year" />
</template>
