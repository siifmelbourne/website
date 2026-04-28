export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const year = query.year
  const now = Date.now()

  return await $fetch(`https://lshtgdpdskhqqxdcwpjo.supabase.co/functions/v1/serve-committee`)
})

