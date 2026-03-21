<template>
  <footer class="site-footer">
    <div class="footer-left">
      <NuxtImg
        class="footer-left__image"
        src="/v1772598394/unimelb_r0vwzr.png"
        alt="UniMelb-Logo"
      />
      <div>
        <p class="text footer-left__text"><strong>Social Impact Investment Fund</strong></p>
        <p class="text footer-left__text">Mailbox 23, Level 4, Building 168, University of Melbourne VIC 3010</p>
        <p class="text footer-left__text">siif.melbourne@gmail.com</p>
        <p class="text footer-left__text">2026 Social Impact Investment Fund</p>
      </div>
    </div>
    <div class="footer-right">
      <a href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/7509/">
        <img
          class="footer-right__icon"
          src="assets/images/umsu.webp"
          alt="UMSU logo"
        />
      </a>
      <a href="https://instagram.com/siifund_unimelb">
        <img
          class="footer-right__icon"
          src="assets/images/instagram.webp"
          alt="Instagram logo"
        />
      </a>
      <a href="https://www.facebook.com/siifund/">
        <img
          class="footer-right__icon"
          src="assets/images/facebook.webp"
          alt="Facebook logo"
        />
      </a>
      <a href="https://www.linkedin.com/company/siif-unimelb/?originalSubdomain=au">
        <img
          class="footer-right__icon"
          src="assets/images/linkedin.webp"
          alt="Linkedin logo"
        />
      </a>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--dark-blue);
  gap: 1rem;
  padding: 1rem;
}

.footer-left {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-left__image {
  width: 6rem;
  height: 6rem;
}

.footer-left__text {
  color: var(--off-white);
  text-align: center;
  font-size: 0.9rem;
  margin: 0 0 0.2rem 0;
}

.footer-right {
  display: flex;
  gap: 1.5rem;
}

.footer-right__icon {
  height: 2.5rem;
  font-size: 2.5rem;
}

.fa-instagram {
  background: linear-gradient(45deg, #F58529, #E4405F, #D93F8D, #8a3ab9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.fa-facebook {
  color: #0165E1;
}

.fa-linkedin {
  color: #0A66C2;
}

@media (min-width: 992px) {
  .site-footer {
    padding: 1rem 4rem;
    flex-direction: row;
    justify-content: space-between;
  }

  .footer-left {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }

  .footer-left__text {
    text-align: left;
  }
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
</style>
