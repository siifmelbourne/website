<template>
  <div class="menu-icon">
    <div class="menu-icon__bar"></div>
    <div class="menu-icon__bar"></div>
    <div class="menu-icon__bar"></div>
    <a class="cross" href="#" aria-label="Close navigation modal"></a>
    <a class="hamburger" href="#site-overlay" aria-label="Open navigation modal"></a>
  </div>
</template>

<style scoped>
.menu-icon {
  height: 1rem;
  width: 2rem;
  position: relative;
  pointer-events: none;
}

.menu-icon__bar {
  height: 2px;
  background-color: var(--off-black);
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  position: absolute;
  width: 100%;
  transform-origin: center;
  pointer-events: none;
  transition: all 0.220s ease-out;
}

.hamburger, .cross {
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  pointer-events: auto;
}

.menu-icon__bar:first-of-type {
  top: 0
}

.menu-icon__bar:last-of-type {
  top: 100%
}

body:has(#site-overlay:target) .hamburger {
  display: none;
}

body:has(#site-overlay:target) .menu-icon__bar:nth-of-type(1) {
  transform: translate(-50%, -50%) rotate(45deg);
  top: 50%;
}

body:has(#site-overlay:target) .menu-icon__bar:nth-of-type(2) {
  width: 0
}

body:has(#site-overlay:target) .menu-icon__bar:nth-of-type(3) {
  transform: translate(-50%, -50%) rotate(-45deg);
  top: 50%;
}

/* @keyframes first-hamburger {
  0% {
    top: 0;
  }
  50% {
    transform: translate(-50%, -50%) rotate(0);
    top: 50%
  }
  100% {
    transform: translate(-50%, -50%) rotate(45deg);
    top: 50%
  }
}

@keyframes middle-hamburger {
  0% {
    opacity: 1
  }
  50% {
    animation-timing-function: steps(1, end);
    opacity: 0
  }
  100% {
    opacity: 0
  }
}

@keyframes last-hamburger {
  0% {
    top: 100%;
  }
  50% {
    transform: translate(-50%, -50%) rotate(0);
    top: 50%
  }
  100% {
    transform: translate(-50%, -50%) rotate(-45deg);
    top: 50%
  }
} */

@media (min-width: 992px) {
  body:not(:has(#site-overlay:target)) .menu-icon {
    display: none
  }
}
</style>
