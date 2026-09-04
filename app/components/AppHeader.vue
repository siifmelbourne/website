<template>
  <header class="site-nav">
    <NuxtLink href="/">
      <img
        class="site-nav__logo"
        src="/images/siif-white-logo.png"
        alt="SIIF Logo"
      />
    </NuxtLink>
    <ul class="site-nav__links">
      <li class="text"><NuxtLink href="/about-us">about us</NuxtLink></li>
      <li class="text"><NuxtLink href="/committee">committee</NuxtLink></li>
      <li class="text"><NuxtLink href="/events">events</NuxtLink></li>
      <li class="text"><NuxtLink href="/publications">publications</NuxtLink></li>
      <li class="text"><NuxtLink href="/contact">contact</NuxtLink></li>
    </ul>
    <MenuIcon />
  </header>
</template>

<style scoped>
.site-nav {
  height: 6rem;
  background: var(--dark-blue);
  border-bottom: 1px solid rgba(255, 245, 238, 0.12);
  color: var(--off-white);
  padding: 0 max(1rem, 3vw);
  display: flex;
  align-items: center;
  justify-content: space-between
}

.site-nav__logo {
  display: block;
  height: 3.1rem;
  width: auto
}

.site-nav__links {
  display: none;
  padding-right: 1rem
}

/* See global.css for scroll disable */

body:has(#site-overlay:target) .site-nav__links {
  display: none;
}

@media (min-width: 992px) {
  .site-nav__links {
    display: flex;
    gap: 2rem;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase
  }
}
</style>
