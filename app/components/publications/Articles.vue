<script setup>
</script>

<template>
  <div>
    <h2 class="text text--h2">Featured Articles</h2>
    <p class="text text--p">Student-written insights on markets, investing, and the global economy.</p>
    <div class="article-grid">
      <PictureItem title="Global Macro Outlook" description="A concise macroeconomic briefing exploring inflation, interest-rate trends, commodity cycles and foreign-exchange outlooks shaping global markets over 2025–27." date="December 17, 2025"/>
      <PictureItem title="Enterprise Value vs. Equity Value: Interview Guide" description="A clear, interview‑focused guide explaining the difference between Enterprise Value and Equity Value in company valuation." date="May 24, 2025"/>
      <PictureItem title="DCF Analysis: Interview Guide" description="A concise interview guide to walking through a DCF (Discounted Cash Flow) analysis, breaking down key steps, formulas and valuation logic." date="May 11, 2025"/>
    </div>
  </div>
</template>

<style scoped>
.article-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
}

@media (min-width: 992px) {
  .article-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
