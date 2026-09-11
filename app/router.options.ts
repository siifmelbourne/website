import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior: async (to, from, savedPosition) => {
    // Browser back/forward should restore the position the user actually had.
    if (savedPosition) {
      return savedPosition
    }

    // Keep the current vertical position only when moving between views that
    // intentionally behave like tabs/filters on the same long page.
    const keepScrollPrefixes = ['/committee/', '/contact/']
    const shouldKeepScroll = keepScrollPrefixes.some(
      (prefix) => to.path.startsWith(prefix) && from.path.startsWith(prefix)
    )

    if (shouldKeepScroll) {
      return false
    }

    // Honour in-page anchors when a route includes a hash.
    if (to.hash) {
      return {
        el: to.hash,
        top: 16,
        behavior: 'smooth'
      }
    }

    // Always put a newly visited page at the top. Returning undefined here
    // can leave the old page's scroll offset in place; on a shorter page that
    // can make the route look completely blank until a hard refresh.
    return { left: 0, top: 0 }
  }
}
