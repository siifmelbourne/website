const committeeEndpoint = 'https://lshtgdpdskhqqxdcwpjo.supabase.co/functions/v1/serve-committee'

export default eventHandler(async (event) => {
  const query = getQuery(event)
  const year = Array.isArray(query.year) ? query.year[0] : query.year

  setHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  setHeader(event, 'Pragma', 'no-cache')
  setHeader(event, 'Expires', '0')
  setHeader(event, 'Surrogate-Control', 'no-store')

  return await $fetch(committeeEndpoint, {
    params: { year },
    headers: {
      'cache-control': 'no-cache'
    }
  })
})
