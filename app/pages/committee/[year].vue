<template>
  <Banner title="our committee" />

  <section class="main">
    <div class="year-picker">
      <ul>
        <li class="text text--h3 text--serif">
          <NuxtLink
            to="/committee/2026 Sem 1"
            class="nav-link"
          >
            2026 sem 1
          </NuxtLink>
        </li>

        <li class="text text--h3 text--serif">
          <NuxtLink
            to="/committee/2025 Sem 2"
            class="nav-link"
          >
            2025 sem 2
          </NuxtLink>
        </li>

        <li class="text text--h3 text--serif">
          <NuxtLink
            to="/committee/2025 Sem 1"
            class="nav-link"
          >
            2025 sem 1
          </NuxtLink>
        </li>
      </ul>
    </div>
    <MemberSection :year="year" />

  </section>
</template>

<style scoped>
.year-picker {
  min-width: 18rem;
  text-align: center;
}

.year-picker > ul {
  padding: 0;
  text-align: left;
}

.main {
  display: flex;
  flex-direction: column;
  padding: 2rem max(2rem, 10%);
  gap: 2rem;
}


.committee-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.committee {
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.nav-link {
  color: grey
}

.nav-link:hover {
  color: var(--off-black);  
}

.nav-link.router-link-exact-active {
  color: var(--off-black);
}

@media (min-width: 992px) {
  .main {
    flex-direction: row;
    padding: 6rem max(2rem, 10%);
    gap: 6rem;
  }

  .committee-row {
    flex-direction: row;
  }
}
</style>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const year = route.params.year as string
console.log(year)
</script>
