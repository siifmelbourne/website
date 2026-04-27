<template>
  <div class="committee">
    <div v-for="team in data">
      <div v-for="role in team">
        <div v-for="member in role">
          <RoleCard
            :title="member.title"
            :url="member.url"
            :name="member.name"
          />
        </div>
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
.committee-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
