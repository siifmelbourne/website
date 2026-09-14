type NotionProperty = {
  type?: string
  title?: Array<{ plain_text?: string }>
  rich_text?: Array<{ plain_text?: string }>
  select?: { name?: string } | null
  multi_select?: Array<{ name?: string }>
  status?: { name?: string } | null
  date?: { start?: string; end?: string; time_zone?: string } | null
  url?: string | null
  email?: string | null
  phone_number?: string | null
  checkbox?: boolean
  files?: Array<{
    name?: string
    file?: { url?: string }
    external?: { url?: string }
  }>
}

type NotionPage = {
  id: string
  url?: string
  cover?: {
    type?: 'external' | 'file'
    external?: { url?: string }
    file?: { url?: string }
  } | null
  properties?: Record<string, NotionProperty>
}

type NotionListResponse = {
  results?: NotionPage[]
  has_more?: boolean
  next_cursor?: string | null
}

type EventRecord = {
  id: string
  title: string
  start: string
  end?: string
  timeZone?: string
  location: string
  category: string
  description?: string
  image: string
  signupUrl?: string
  detailsUrl: string
  status: 'upcoming' | 'past'
}

const PROVIDED_NOTION_ID = '3db749b9b61980df924de00dbedd19be'
const NOTION_VERSION = '2026-03-11'
const LEGACY_NOTION_VERSION = '2022-06-28'
const DEFAULT_IMAGE = '/images/second-committee.png'

const cache = new Map<string, { data: EventRecord[]; timestamp: number }>()

const fallbackEvents: EventRecord[] = [
  {
    id: 'introduction-to-investment-management',
    title: 'Introduction to Investment Management',
    start: '2026-03-12T18:00:00+11:00',
    location: 'University of Melbourne',
    category: 'University of Melbourne',
    description: 'A practical introduction to investment management, SIIF, and student-led portfolio work.',
    image: '/images/second-committee.png',
    signupUrl: 'https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/7509/',
    detailsUrl: '#introduction-to-investment-management',
    status: 'past'
  },
  {
    id: 'stock-pitch-night',
    title: 'Stock Pitch Night',
    start: '2026-04-16T18:00:00+10:00',
    location: 'University of Melbourne',
    category: 'University of Melbourne',
    description: 'An evening for students to test investment ideas and learn how SIIF approaches stock pitches.',
    image: '/images/hero-committee.png',
    signupUrl: 'https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/7509/',
    detailsUrl: '#stock-pitch-night',
    status: 'past'
  }
]

const normalizeId = (value: string) => value.replace(/-/g, '')

const propertyByNames = (
  properties: Record<string, NotionProperty>,
  names: string[]
) => {
  const normalized = new Map(
    Object.entries(properties).map(([name, property]) => [
      name.toLowerCase().replace(/[^a-z0-9]/g, ''),
      property
    ])
  )

  for (const name of names) {
    const property = normalized.get(name.toLowerCase().replace(/[^a-z0-9]/g, ''))
    if (property) return property
  }
}

const plainText = (property?: NotionProperty) => {
  if (!property) return ''

  if (property.type === 'title') {
    return property.title?.map((item) => item.plain_text || '').join('').trim() || ''
  }

  if (property.type === 'rich_text') {
    return property.rich_text?.map((item) => item.plain_text || '').join('').trim() || ''
  }

  if (property.type === 'select') return property.select?.name || ''
  if (property.type === 'status') return property.status?.name || ''
  if (property.type === 'multi_select') {
    return property.multi_select?.map((item) => item.name).filter(Boolean).join(', ') || ''
  }
  if (property.type === 'url') return property.url || ''
  if (property.type === 'email') return property.email || ''
  if (property.type === 'phone_number') return property.phone_number || ''
  if (property.type === 'checkbox') return property.checkbox ? 'true' : ''

  return ''
}

const urlValue = (property?: NotionProperty) => {
  const value = plainText(property)
  return value.startsWith('http://') || value.startsWith('https://') ? value : ''
}

const imageValue = (page: NotionPage, property?: NotionProperty) => {
  const coverUrl = page.cover?.external?.url || page.cover?.file?.url
  if (coverUrl) return coverUrl

  const fileUrl = property?.files?.find((file) => file.file?.url || file.external?.url)
  return fileUrl?.file?.url || fileUrl?.external?.url || DEFAULT_IMAGE
}

const dateValue = (property?: NotionProperty) => property?.date || null

const isPublished = (properties: Record<string, NotionProperty>) => {
  const property = propertyByNames(properties, ['Published', 'Publish', 'Visible', 'Show on Website'])
  if (!property) return true

  if (property.type === 'checkbox') return property.checkbox !== false

  const value = plainText(property).toLowerCase()
  return !['draft', 'hidden', 'false', 'no', 'unpublished'].includes(value)
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

const toEventRecord = (page: NotionPage): EventRecord | null => {
  const properties = page.properties || {}
  if (!isPublished(properties)) return null

  const title =
    plainText(propertyByNames(properties, ['Name', 'Title', 'Event', 'Event Name'])) || 'Untitled event'
  const date = dateValue(propertyByNames(properties, ['Date', 'Event Date', 'Start', 'Start Date', 'Time']))
  if (!date?.start) return null

  const statusProperty = plainText(propertyByNames(properties, ['Status']))
  const start = new Date(date.start)
  const fallbackStatus = start.getTime() >= Date.now() ? 'upcoming' : 'past'
  const status = statusProperty.toLowerCase().includes('past') ? 'past' : fallbackStatus
  const category =
    plainText(propertyByNames(properties, ['Category', 'Campus', 'State', 'Branch', 'Filter'])) ||
    'University of Melbourne'
  const location =
    plainText(propertyByNames(properties, ['Location', 'Venue', 'Address', 'Place'])) ||
    'University of Melbourne'
  const signupUrl =
    urlValue(propertyByNames(properties, ['Sign Up', 'Signup', 'Registration', 'Register', 'Registration Link'])) ||
    undefined
  const detailsUrl =
    urlValue(propertyByNames(properties, ['Details', 'Details Link', 'More Info', 'Find Out More'])) ||
    page.url ||
    `#${slugify(title)}`

  return {
    id: slugify(`${date.start}-${title}`) || normalizeId(page.id),
    title,
    start: date.start,
    end: date.end || undefined,
    timeZone: date.time_zone || undefined,
    location,
    category,
    description: plainText(propertyByNames(properties, ['Description', 'Summary', 'Blurb', 'Copy'])) || undefined,
    image: imageValue(page, propertyByNames(properties, ['Image', 'Poster', 'Cover', 'Thumbnail'])),
    signupUrl,
    detailsUrl,
    status
  }
}

async function queryNotionEndpoint(
  endpoint: string,
  notionKey: string,
  notionVersion: string,
  startCursor?: string
) {
  return await $fetch<NotionListResponse>(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${notionKey}`,
      'Notion-Version': notionVersion,
      'Content-Type': 'application/json'
    },
    body: {
      page_size: 100,
      start_cursor: startCursor
    }
  })
}

async function queryAllNotionPages(
  endpoint: string,
  notionKey: string,
  notionVersion: string
) {
  const pages: NotionPage[] = []
  let cursor: string | undefined

  do {
    const response = await queryNotionEndpoint(endpoint, notionKey, notionVersion, cursor)
    pages.push(...(response.results || []))
    cursor = response.has_more && response.next_cursor ? response.next_cursor : undefined
  } while (cursor)

  return pages
}

async function fetchNotionEvents(): Promise<EventRecord[]> {
  const config = useRuntimeConfig()
  const notionKey = process.env.NOTION_API_KEY || process.env.NOTION_TOKEN || String(config.notionApiKey || '')
  const dataSourceId =
    process.env.NOTION_EVENTS_DATA_SOURCE_ID ||
    process.env.NOTION_EVENTS_DATABASE_ID ||
    String(config.notionEventsDataSourceId || '') ||
    PROVIDED_NOTION_ID

  if (!notionKey || !dataSourceId) return fallbackEvents

  const normalizedId = normalizeId(dataSourceId)
  const dataSourceEndpoint = `https://api.notion.com/v1/data_sources/${normalizedId}/query`
  const databaseEndpoint = `https://api.notion.com/v1/databases/${normalizedId}/query`

  try {
    const pages = await queryAllNotionPages(dataSourceEndpoint, notionKey, NOTION_VERSION)
    const events = pages.map(toEventRecord).filter(Boolean) as EventRecord[]
    return events.length ? sortEvents(events) : fallbackEvents
  } catch {
    try {
      const pages = await queryAllNotionPages(databaseEndpoint, notionKey, LEGACY_NOTION_VERSION)
      const events = pages.map(toEventRecord).filter(Boolean) as EventRecord[]
      return events.length ? sortEvents(events) : fallbackEvents
    } catch {
      return fallbackEvents
    }
  }
}

const sortEvents = (events: EventRecord[]) =>
  [...events].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

export default eventHandler(async (event) => {
  const key = 'events'
  const now = Date.now()
  const maxAge = 1000 * 60 * 10
  const staleMaxAge = 1000 * 60 * 60 * 6
  const cached = cache.get(key)

  setHeader(event, 'Cache-Control', 's-maxage=600, stale-while-revalidate=21600')

  if (cached) {
    const age = now - cached.timestamp
    if (age < maxAge) return cached.data

    if (age < staleMaxAge) {
      event.waitUntil(
        fetchNotionEvents()
          .then((data) => cache.set(key, { data, timestamp: Date.now() }))
          .catch(() => undefined)
      )
      return cached.data
    }
  }

  const data = await fetchNotionEvents()
  cache.set(key, { data, timestamp: now })
  return data
})
