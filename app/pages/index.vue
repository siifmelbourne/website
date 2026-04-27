<script setup>
if (import.meta.server) {
  useSeoMeta({
    title: 'Social Impact Investment Fund | Home',
    description: 'The first and only student led investment fund in Victoria managing real capital, providing students the opportunity to pitch investment ideas.',
    robots: 'index, follow',

    // The title of your page without any branding such as your site name
    ogTitle: 'Home',
    ogUrl: 'https://www.siifmelbourne.com/',
    ogDescription: 'The first and only student led investment fund in Victoria managing real capital, providing students the opportunity to pitch investment ideas.',
    // ogImage: 

    twitterCard: 'summary_large_image',
    twitterTitle: 'Social Impact Investment Fund | Home',
    twitterDescription: 'The first and only student led investment fund in Victoria managing real capital, providing students the opportunity to pitch investment ideas.',
    // twitterImage:
  })
}

const committeeImages = [
  ["/v1772597859/joinus1_uaylhm.jpg", "Three young men in suits posing under a stone archway outdoors"],
  ["/v1772597859/joinus2_tuidyb.jpg", "Group of friends dining together at a restaurant table at night"],
  ["/v1772597861/joinus3_mholae.heic", "Gathering of friends at dinner table, smiling at camera"],
  ["/v1772597859/joinus4_l16ikg.heic", "Friends gathered around a table at a casual restaurant taking a selfie"],
  ["/v1772597861/joinus5_fhvw6a.heic", "Busy hallway outside of event, one person glances at the camera"],
  ["/v1772597869/joinus6_nduawb.jpg", "Three young women posing together indoors, smiling and making peace signs"],
  ["/v1772597862/joinus7_hzkxj9.jpg", "Group of friends socialising in a dimly lit bar or lounge"]
]

const img = useImage()
const imgUrl = img('/v1772458824/IMG_8254_vo2ius.jpg', { width: 1080 })

// https://developers.facebook.com/docs/sharing/best-practices#images
useSeoMeta({
  ogImage: imgUrl,
  twtterImage: imgUrl
})
</script>

<template>
  <Banner title="social impact investment fund" />
  <ul class="stats-bar">
    <li class="stat">
      <CountUp class="stat__number text--serif" :start=1000 :end=1400 prefix="$" suffix="+" :delay="-1000" />
      <p class="stat__title text--sans">donated</p>
    </li>
    <li class="stat">
      <CountUp class="stat__number text--serif" :start=10000 :end=23000 prefix="$" suffix="+" />
      <p class="stat__title text--sans">capital under management</p>
    </li>
    <li class="stat">
      <CountUp class="stat__number text--serif" :start=100 :end=500 suffix="+" :delay="1000" />
      <p class="stat__title text--sans">members</p>
    </li>
  </ul>

  <main class="homepage">
    <section class="about-us">
      <div class="about-us__left">
        <div class="about-us__text">
          <h2 class="text text--serif text--h2">who we are</h2>
          <p class="text text--p">The Social Impact Investment Fund is the first and only student led investment fund in Victoria managing real capital. We provide students the opportunity to pitch investment ideas to a team of committee and partner representatives, and employ those ideas into a tangible portfolio.</p>
          <p class="text text--p"><em>All</em> proceeds go towards our nominated charities.</p>
        </div>
        <NuxtLink class="button text--sans" to="/contact">CONTACT US</NuxtLink>
      </div>
      <div class="about-us__right">
        <NuxtImg
          class="about-us__img"
          src="/v1772546946/commitee-pic_ezp0iu.jpg"
          width="700"
          alt="Committee members in formal dress standing in front of sandstone building"
        />
      </div>
    </section>
    <section class="partners">
      <div class="partners__title">
        <p class="text text--p text--inline-block">our amazing work wouldn't be possible without...</p>
        <h2 class="text text--serif text--h2 text--inline-block">our partners</h2>
      </div>
      <div class="partners__container">
        <NuxtLink class="partners__icon" href="https://www.rivercapital.com.au/" target="_blank">
          <NuxtImg
            class="partners__icon-img"
            src="v1772595720/rc_ddibvb.png"
            alt="River Capital logo"
          />
        </NuxtLink>
        <NuxtLink class="partners__icon" href="https://sig.com/" target="_blank">
          <NuxtImg
            class="partners__icon-img"
            src="/v1772593791/susquehanna_cpwxsl.png"
            alt="Susquehanna logo"
          />
        </NuxtLink>
        <NuxtLink class="partners__icon" href="https://inaam.me/" target="_blank">
          <NuxtImg
            class="partners__icon-img"
            src="/v1772596172/inaam_fj10q4.png"
            alt="Inaam logo"
          />
        </NuxtLink>
        <NuxtLink class="partners__icon" href="https://www.you.co/" target="_blank">
          <NuxtImg
            class="partners__icon-img"
            src="/v1772596535/youtrip_tzdjz3.png"
            alt="YouTrip logo"
          />
        </NuxtLink>
        <NuxtLink class="partners__icon" href="https://www.futurefund.gov.au/" target="_blank">
          <NuxtImg
            class="partners__icon-img"
            src="/v1772596755/ff_gxvkkt.png"
            alt="Future Fund logo"
          />
        </NuxtLink>
      </div>
    </section>
    <!-- I'm really not a fan of this section's design! -->
    <!--<section class="charities">
      <div class="charities__banner">
        <h2 class="text text--serif text--h2 text--invert">our charities</h2>
        <NuxtLink class="button button--invert text--sans" to="/contact">EXPLORE</NuxtLink>
      </div>
    </section>-->
    <section class="community">
      <h2 class="text text--serif text--h2">why not join us?</h2>
      <p class="text text--p">We want <em>you</em> to be a part of SIIF.<br>Follow us on our socials or contact us to find out how to get involved!</p>
      <div class="community__container">
        <NuxtImg
          v-for="data in committeeImages"
          :key="data"
          class="community__img"
          :src="data[0]"
          width="300"
          :alt="data[1]"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 4rem max(2rem, 10%);
}

.stats-bar {
  display: flex;
  justify-content: center;
  gap: 2rem 4rem;
  padding: 2rem 4rem;
  margin: 0;
  filter: drop-shadow(0 0 1rem);
  background-color: var(--off-white);
  flex-wrap: wrap;
  align-items: center;
}

.stat {
  list-style-type: none;
  text-align: center;
  /*
    Recommendation:
      make the stat bar purposefully asymmetrical
      to disguise different stat widths
  */
}

.stat__number {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
}

.stat__title {
  margin: 0
}

.about-us {
  /* padding: 12rem max(2rem, 5%) 0; */
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
}

.about-us__left {
  text-align: center;
  padding: 1rem;
  box-sizing: border-box;
}

.about-us__text {
  padding-bottom: 0.5rem;
}

.about-us__right {
}

.about-us__img {
  width: 100%;
  min-height: 24rem;
  object-fit: cover;
}

/*
.charities {
  padding: 8rem max(2rem, 5%) 0;
}

.charities__banner {
  width: 100%;
  height: 32rem;
  background-image: url(https://lshtgdpdskhqqxdcwpjo.supabase.co/storage/v1/object/public/assets/placeholders/charity.webp);
  background-color: rgba(0, 0, 0, 0.7);
  background-blend-mode: darken;
  background-position: 50% 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  box-sizing: border-box;
  text-align: center;
}
*/

.partners {
  text-align: center;
  padding: 0 2rem;
  /* padding: 8rem max(4rem, 5%) 0; */
}

.partners__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 0.5rem
}

.partners__icon {
  flex-grow: 1;
}

.partners__icon-img {
  height: 6rem;
}

.partners__title {
  display: flex;
  flex-direction: column;
}

.community {
  text-align: center;
  /* padding: 8rem max(2rem, 5%) 0; */
}

.community__container {
  columns: 12rem 3;
  margin-top: 2rem
}

.community__img {
  width: 100%;
  margin-bottom: 1rem;
}

@media (min-width: 992px) {
  .homepage {
    gap: 6rem;
  }

  .about-us {
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .about-us__left {
    text-align: left;
    width: calc(50% - 1rem);
  }

  .about-us__right {
    width: calc(50% - 1rem);
  }
  
  .partners__title {
    flex-direction: row;
    gap: 1rem;
    align-items: baseline;
    justify-content: center;
  }

  .partners__container {
    justify-content: center;
    gap: 0.5rem 4rem;
  }

  .partners__icon {
    flex-grow: 0
  }

  .partners__icon-img {
    height: 8rem;
  }

  .partners__container {
    gap: 2rem 4rem;
  }
}
</style>
