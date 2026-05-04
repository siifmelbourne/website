<template>
  <div class="committee">
    <div v-for="team in data">
      <div class="committee-row" v-for="role in team">
        <RoleCard
          v-for="member in role"
          :title="member.title"
          :url="member.url"
          :name="member.name"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ year: string }>()

const { data } = await useAsyncData(
  `committee-${props.year}`,
  () => $fetch(`/api/committee?year=${encodeURIComponent(props.year)}`),
  {
    keepPreviousData: true
  }
)
</script>

<style scoped>
.committee {
  gap: 4rem;
}

.committee-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0 4rem;
}
</style>
