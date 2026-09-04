<template>
  <dialog class="site-overlay" id="site-overlay">
    <div class="site-overlay__window"></div>
    <nav class="site-overlay__body">
      <NuxtLink class="site-overlay__link text--sans" href="/about-us">about us</NuxtLink>
      <NuxtLink class="site-overlay__link text--sans" href="/committee">committee</NuxtLink>
      <NuxtLink class="site-overlay__link text--sans" href="/events">events</NuxtLink>
      <NuxtLink class="site-overlay__link text--sans" href="/publications">publications</NuxtLink>
      <NuxtLink class="site-overlay__link text--sans" href="/contact">contact</NuxtLink>
    </nav>
  </dialog>
</template>

<style scoped>
.site-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  flex-direction: column;
  pointer-events: none
}

.site-overlay:target {
  display: flex 
}

.site-overlay__window {
  height: 6rem;
  background: none;
}

.site-overlay__body {
  background-color: var(--dark-blue);
  color: var(--off-white);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(255, 245, 238, 0.14);
  pointer-events: auto
}

.site-overlay__link {
  padding: 1rem;
}
</style>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
function updateTarget() {
  /*
    This might seem nonsensical, but it"s a quirk of SPAs.
    If the target was set to nothing, it doesn"t refresh until
    page reload. To force the modal to disappear we force a hash update.
    This issue doesn"t occur when JavaScript is disabled.
  */
  if (window.location.hash == "") {
    window.location.replace("#");
  }
}

watch(() => route.hash, updateTarget);
</script>
