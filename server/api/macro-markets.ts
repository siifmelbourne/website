type MacroFrame = {
  date: string
  link?: string
  slides: string[]
  caption?: string
}

type ConfiguredPost = {
  date: string
  link: string
}

const cache = new Map<string, { data: MacroFrame[]; timestamp: number }>()

// Keep using the exact feed used by SIIF's existing Macro Markets page. That
// feed already contains the working multi-page carousel image arrays.
const MACRO_MARKETS_FEED_URL =
  'https://lshtgdpdskhqqxdcwpjo.supabase.co/functions/v1/serve-macromarkets'

// Publications intentionally stops at 18 May 2026 for now. Newer records may
// still exist in the SIIF feed, but they are hidden until the content set is
// ready to be shown here.
const LATEST_VISIBLE_DATE = '2026-05-18'

// The Instagram links supplied for the redesigned Publications page. No Meta
// access token is required: the live SIIF feed supplies slides and this table
// supplies/overrides the public Instagram permalink for each update.
const configuredPosts: ConfiguredPost[] = [
  { date: '2026-05-18', link: 'https://www.instagram.com/p/DYdZwvAk-vO/?img_index=1' },
  { date: '2026-05-11', link: 'https://www.instagram.com/p/DYLcRPAE1bB/?img_index=1' },
  { date: '2026-05-04', link: 'https://www.instagram.com/p/DX5X4_gE4aB/?img_index=1' },
  { date: '2026-04-27', link: 'https://www.instagram.com/p/DXnPlR-kwhH/?img_index=1' },
  { date: '2026-04-20', link: 'https://www.instagram.com/p/DXVdedPE8Dc/?img_index=1' },
  { date: '2026-04-13', link: 'https://www.instagram.com/p/DXDd69Sk_ZE/?img_index=1' },
  { date: '2026-04-06', link: 'https://www.instagram.com/p/DWxUmY6EzY4/?img_index=1' },
  { date: '2026-03-30', link: 'https://www.instagram.com/p/DWfDmMjE9Wp/?img_index=1' },
  { date: '2026-03-23', link: 'https://www.instagram.com/p/DWNAP1Mk-We/?img_index=1' },

  { date: '2025-10-13', link: 'https://www.instagram.com/p/DPvm9NCk4lM/' },
  { date: '2025-09-29', link: 'https://www.instagram.com/p/DPK0IYPk06i/' },
  { date: '2025-09-15', link: 'https://www.instagram.com/p/DOma6AVEzJ4/' },
  { date: '2025-09-01', link: 'https://www.instagram.com/p/DOCXyftEwGK/' },
  { date: '2025-08-18', link: 'https://www.instagram.com/p/DNemFRrzYsd/' },
  { date: '2025-05-05', link: 'https://www.instagram.com/p/DJQJOpfTQEU/' },
  { date: '2025-04-28', link: 'https://www.instagram.com/p/DI-OmyLT6sR/' },
  { date: '2025-04-07', link: 'https://www.instagram.com/p/DIIQjRATEiX/' },
  { date: '2025-03-31', link: 'https://www.instagram.com/p/DH2fz0qT3hB/' },
  { date: '2025-03-24', link: 'https://www.instagram.com/p/DHkwIrNTd5a/' },
]

// Prefer the calendar day encoded in the source string. Converting an
// Australian midnight timestamp to UTC can otherwise move it to the previous
// day and stop the carousel slides matching the supplied Instagram link.
const dateKey = (value: string) => {
  const isoDay = value.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (isoDay) return `${isoDay[1]}-${isoDay[2]}-${isoDay[3]}`

  const australianDay = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/)
  if (australianDay) {
    return `${australianDay[3]}-${australianDay[2].padStart(2, '0')}-${australianDay[1].padStart(2, '0')}`
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return [
    parsed.getUTCFullYear(),
    String(parsed.getUTCMonth() + 1).padStart(2, '0'),
    String(parsed.getUTCDate()).padStart(2, '0'),
  ].join('-')
}

async function fetchExistingFeed(): Promise<MacroFrame[]> {
  const data = await $fetch<MacroFrame[]>(MACRO_MARKETS_FEED_URL)
  return Array.isArray(data) ? data : []
}

function mergeConfiguredPosts(feed: MacroFrame[]): MacroFrame[] {
  const configuredByDay = new Map(configuredPosts.map((post) => [post.date, post.link]))
  const daysFromFeed = new Set<string>()

  // Preserve the existing SIIF feed records and, crucially, their slides[]
  // arrays exactly. This is what makes the current site's Embla carousels work.
  const merged: MacroFrame[] = feed
    .filter((frame) => {
      if (!frame?.date || !Array.isArray(frame.slides) || !frame.slides.filter(Boolean).length) return false
      return dateKey(frame.date) <= LATEST_VISIBLE_DATE
    })
    .map((frame) => {
      const day = dateKey(frame.date)
      daysFromFeed.add(day)

      return {
        ...frame,
        slides: frame.slides.filter(Boolean),
        link: configuredByDay.get(day) || frame.link,
      }
    })

  // If a supplied Instagram post has not reached the SIIF feed yet, keep its
  // date/link visible with a local cover. As soon as the feed publishes its
  // slides, the record above replaces this one automatically.
  const fallbackImages = [
    '/images/macro-market-cover-aug.png',
    '/images/macro-market-update-aug.png',
    '/images/macro-market-movements-aug.png',
  ]

  configuredPosts.forEach((post, index) => {
    if (post.date > LATEST_VISIBLE_DATE || daysFromFeed.has(post.date)) return

    merged.push({
      date: `${post.date}T12:00:00+10:00`,
      link: post.link,
      slides: [fallbackImages[index % fallbackImages.length]],
    })
  })

  return merged.sort((a, b) => {
    const aKey = dateKey(a.date)
    const bKey = dateKey(b.date)
    return bKey.localeCompare(aKey)
  })
}

async function fetchData(): Promise<MacroFrame[]> {
  try {
    return mergeConfiguredPosts(await fetchExistingFeed())
  } catch {
    return mergeConfiguredPosts([])
  }
}

export default eventHandler(async (event) => {
  const key = 'macro-markets-all'
  const now = Date.now()
  const maxAge = 1000 * 60 * 10
  const staleMaxAge = 1000 * 60 * 60 * 6
  const cached = cache.get(key)

  if (cached) {
    const age = now - cached.timestamp
    if (age < maxAge) return cached.data

    if (age < staleMaxAge) {
      event.waitUntil(
        fetchData()
          .then((data) => cache.set(key, { data, timestamp: Date.now() }))
          .catch(() => undefined),
      )
      return cached.data
    }
  }

  const data = await fetchData()
  cache.set(key, { data, timestamp: now })
  return data
})
