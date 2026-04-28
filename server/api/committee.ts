const cache = new Map()

async function fetchData(year) {
  return await $fetch(
    `https://lshtgdpdskhqqxdcwpjo.supabase.co/functions/v1/serve-committee`,
    { params: { year } }
  )
}

export default eventHandler(async (event) => {
  const query = getQuery(event)
  const year = query.year

  const key = `committee-${year || 'all'}`
  const now = Date.now()

  const maxAge = 1000 * 60 * 5        // 5 min fresh
  const staleMaxAge = 1000 * 60 * 30  // 30 min stale

  const cached = cache.get(key)

  if (cached) {
    const age = now - cached.timestamp

    // Fresh → just return
    if (age < maxAge) {
      return cached.data
    }

    // Stale → return immediately AND refresh in background
    if (age < staleMaxAge) {
      event.waitUntil(
        fetchData(year)
          .then((data) => {
            cache.set(key, { data, timestamp: Date.now() })
          })
          .catch(() => {
            // keep stale data if refresh fails
          })
      )

      return cached.data
    }
  }

  // No cache or expired → block and fetch fresh
  const data = await fetchData(year)
  cache.set(key, { data, timestamp: now })

  return data
})
