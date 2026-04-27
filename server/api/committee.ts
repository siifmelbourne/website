// simple in-memory cache
const cache: Record<string, { data: any; expiry: number }> = {}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const year = query.year
  const now = Date.now()

  // return cached data if still valid
  if (cache[year] && cache[year].expiry > now) {
    return cache[year].data
  }

  // expensive API call
  const data = await $fetch(`https://lshtgdpdskhqqxdcwpjo.supabase.co/functions/v1/pull-images`)

  // cache for 1 hour
  cache[year] = { data, expiry: now + 1000 * 60 * 60 }

  return data
})

