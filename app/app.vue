<template>
  <div class="page">
    <div class="not-footer">
      <NuxtRouteAnnouncer />
      <AppHeader />
      <div class="route-viewport">
        <NuxtPage />
      </div>
    </div>
  </div>
  <AppFooter />
  <AppModal />
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex; 
  flex-direction: column; 
}

.not-footer {
  flex: 1;
}

.route-viewport {
  min-width: 0;
  position: relative;
}
</style>
