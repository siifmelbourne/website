<script setup>
import Articles from '~/components/publications/Articles.vue'
import MacroMarkets from '~/components/publications/MacroMarkets.vue'

const route = useRoute()

const sections = {
  "articles": Articles,
  "macro-markets": MacroMarkets,
}

const section = computed(() => {
  const current = route.params.section
  return current
})
</script>

<template>
  <Banner title="Publications" />
  <main class="main">
    <nav class="main-nav">
      <ul>
        <li class="text text--h3 text--serif"><NuxtLink href="/publications/articles">articles</NuxtLink></li>
        <li class="text text--h3 text--serif"><NuxtLink href="/publications/macro-markets">macro markets</NuxtLink></li>
      </ul>
    </nav>
    <section class="main-section">
      <component :is="sections[section]" />
    </section>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem max(2rem, 5%);
  gap: 2rem;
}

.main-nav {
  display: flex;
  flex-direction: column;
  min-width: 18rem;
  text-align: center;
}

.main-nav > ul {
  padding: 0
}

.main-section {
  flex-grow: 1;
  text-align: center;
}


@media (min-width: 992px) {
  .main {
    flex-direction: row;
    padding: 6rem max(2rem, 10%);
    gap: 6rem;
  }

  .main-nav {
    text-align: left;
  }

  .main-section {
    text-align: left;
  }
}
</style>
