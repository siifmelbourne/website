<template>
  <footer class="site-footer">
    <div class="site-footer__main">
      <section class="footer-info" aria-label="SIIF contact details">
        <p class="footer-info__line">Victoria's premier student-led<br>investment fund.</p>
        <p class="footer-info__line">Mailbox 23, Level 4, Building 168,<br>University of Melbourne VIC 3010</p>
        <p class="footer-info__line">siif.melbourne@gmail.com</p>
      </section>

      <nav class="footer-nav" aria-label="Footer navigation">
        <section class="footer-nav__column">
          <h2 class="footer-nav__title">About Us</h2>
          <ul class="footer-nav__list">
            <li><NuxtLink to="/about-us">Who We Are</NuxtLink></li>
            <li><NuxtLink to="/committee/2026-sem-1">Committee</NuxtLink></li>
            <li><NuxtLink to="/contact/corporate-partner">Partner</NuxtLink></li>
            <li><NuxtLink to="/contact/corporate-partner">Sponsors</NuxtLink></li>
          </ul>
        </section>

        <section class="footer-nav__column">
          <h2 class="footer-nav__title">Investments</h2>
          <ul class="footer-nav__list">
            <li><NuxtLink to="/analysis">Analysis</NuxtLink></li>
            <li><NuxtLink to="/publications/macro-markets">Macro Markets</NuxtLink></li>
            <li><NuxtLink to="/publications/articles">Featured Ideas</NuxtLink></li>
          </ul>
        </section>

        <section class="footer-nav__column">
          <h2 class="footer-nav__title">Publications</h2>
          <ul class="footer-nav__list">
            <li><NuxtLink to="/publications/macro-markets">Macro Updates</NuxtLink></li>
            <li><NuxtLink to="/publications/articles">Featured Pieces</NuxtLink></li>
          </ul>
        </section>

        <section class="footer-nav__column">
          <h2 class="footer-nav__title">Contact</h2>
          <ul class="footer-nav__list">
            <li><NuxtLink to="/contact/club-membership">Join Us</NuxtLink></li>
            <li><NuxtLink to="/contact/corporate-partner">Partner With Us</NuxtLink></li>
            <li><NuxtLink to="/contact/contact-us">Contact Us</NuxtLink></li>
            <li><NuxtLink to="/events">Events</NuxtLink></li>
          </ul>
        </section>
      </nav>
    </div>

    <div class="site-footer__bottom">
      <div class="footer-socials" aria-label="SIIF social links">
        <a
          class="footer-socials__join"
          href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/7509/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Join SIIF through UMSU"
        >
          ↗
        </a>
        <a href="https://www.facebook.com/siifund/" target="_blank" rel="noopener noreferrer" aria-label="SIIF on Facebook">
          <img class="footer-socials__icon" src="/facebook.webp" alt="" />
        </a>
        <a href="https://instagram.com/siifund_unimelb" target="_blank" rel="noopener noreferrer" aria-label="SIIF on Instagram">
          <img class="footer-socials__icon" src="/instagram.webp" alt="" />
        </a>
        <a href="https://www.linkedin.com/company/siif-unimelb/?originalSubdomain=au" target="_blank" rel="noopener noreferrer" aria-label="SIIF on LinkedIn">
          <img class="footer-socials__icon" src="/linkedin.webp" alt="" />
        </a>
      </div>

      <p class="footer-copyright">
        Copyright © 2026.<br>
        Social Impact Investment Fund.<br>
        All Rights Reserved
      </p>
    </div>
  </footer>
  <noscript>
    <dialog class="nojs-popup" open>
      <div class="nojs-popup__wrapper">
        <div class="nojs-popup__msg-box text--mono">
          <p class="nojs-popup__msg">It looks like you don't have JavaScript enabled! The website should still work (though with a bit less functionality).</p>
        </div>
        <form method="dialog">
          <button class="nojs-popup__dismiss">&times;</button>
        </form>
      </div>
    </dialog>
  </noscript>
</template>

<style scoped>
.site-footer {
  background: #000000;
  box-sizing: border-box;
  color: #eff8ff;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 3.6vw, 3.2rem);
  padding: clamp(2.6rem, 4.5vw, 4rem) max(1.5rem, 4vw) clamp(2rem, 3vw, 3rem);
  text-transform: uppercase;
}

.site-footer__main {
  align-items: center;
  display: grid;
  gap: clamp(2rem, 4vw, 4.2rem);
  grid-template-columns: minmax(16rem, 0.65fr) minmax(0, 2fr);
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: clamp(1.1rem, 2vw, 1.65rem);
  font-family: var(--font-sans);
  font-size: clamp(0.92rem, 1.1vw, 1.05rem);
  font-weight: 800;
  letter-spacing: 0.02em;
  line-height: 0.96;
}

.footer-info__line {
  margin: 0;
}

.footer-nav {
  border: 1px solid rgba(239, 248, 255, 0.34);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  min-height: clamp(13rem, 21vw, 19rem);
}

.footer-nav__column {
  border-left: 1px solid rgba(239, 248, 255, 0.34);
  padding: clamp(1.35rem, 2vw, 1.9rem);
}

.footer-nav__column:first-child {
  border-left: 0;
}

.footer-nav__title {
  color: #eff8ff;
  font-family: var(--font-sans);
  font-size: clamp(1.05rem, 1.45vw, 1.45rem);
  font-weight: 600;
  letter-spacing: 0.07em;
  line-height: 1.1;
  margin: 0 0 clamp(1.4rem, 2.4vw, 2.25rem);
}

.footer-nav__list {
  display: flex;
  flex-direction: column;
  gap: clamp(0.85rem, 1.45vw, 1.25rem);
  font-family: var(--font-sans);
  font-size: clamp(0.82rem, 1vw, 0.98rem);
  font-weight: 800;
  letter-spacing: 0.03em;
  line-height: 1.1;
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer-nav__list a,
.footer-socials a {
  transition: color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
}

.footer-nav__list a:hover,
.footer-socials a:hover {
  opacity: 0.72;
}

.site-footer__bottom {
  align-items: end;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.footer-socials {
  align-items: center;
  display: flex;
  gap: clamp(1.25rem, 2vw, 2rem);
}

.footer-socials__join {
  align-items: center;
  background: #eff8ff;
  border-radius: 999px;
  color: #0f1424;
  display: inline-flex;
  font-family: var(--font-sans);
  font-size: 1.25rem;
  font-weight: 700;
  height: 2.7rem;
  justify-content: center;
  line-height: 1;
  width: 2.7rem;
}

.footer-socials__icon {
  display: block;
  filter: brightness(0) invert(96%) sepia(7%) saturate(609%) hue-rotate(176deg) brightness(104%) contrast(102%);
  height: clamp(2.2rem, 3vw, 3rem);
  object-fit: contain;
  width: auto;
}

.footer-copyright {
  color: #eff8ff;
  font-family: var(--font-sans);
  font-size: clamp(1rem, 1.25vw, 1.22rem);
  font-weight: 800;
  letter-spacing: 0.03em;
  line-height: 0.9;
  margin: 0;
  text-align: left;
}

.nojs-popup__msg-box {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.nojs-popup__dismiss {
  height: 3rem;
  width: 3rem;
  color: var(--off-white);
  border: 1px solid var(--off-white);
  background: none;
  border-radius: 1rem;
  font-size: 1.5rem;
}

/* The popup doesn't like having its display set */
.nojs-popup {
  width: 100%;
  background-color: var(--off-black);
  padding: 1rem;
  box-sizing: border-box;
  color: var(--off-white);
  position: fixed;
  bottom: 0;
}

.nojs-popup__wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
}

@media (max-width: 980px) {
  .site-footer__main {
    align-items: stretch;
    grid-template-columns: 1fr;
  }

  .footer-nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .footer-nav__column:nth-child(odd) {
    border-left: 0;
  }

  .footer-nav__column:nth-child(n + 3) {
    border-top: 1px solid rgba(239, 248, 255, 0.34);
  }
}

@media (max-width: 620px) {
  .site-footer {
    padding-inline: 1.25rem;
  }

  .footer-nav {
    grid-template-columns: 1fr;
  }

  .footer-nav__column,
  .footer-nav__column:nth-child(odd) {
    border-left: 0;
  }

  .footer-nav__column:not(:first-child) {
    border-top: 1px solid rgba(239, 248, 255, 0.34);
  }

  .site-footer__bottom {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
