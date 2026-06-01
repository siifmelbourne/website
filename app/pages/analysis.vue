<template>
  <Banner title="streamlit dashboards" />
  <main class="main">
    <iframe
      class="embed"
      src="https://siif-dashboard-11-05-26.happydesert-94097712.japaneast.azurecontainerapps.io"
      title="Dashboard"
      loading="lazy"
      allowfullscreen
    />
  </main>
</template>

<style scoped>
.main {
  padding: 0;
}
.embed {
  display: block;
  width: 100%;
  height: calc(100vh - 4rem); /* tweak to taste */
  border: 0;
}
</style>
