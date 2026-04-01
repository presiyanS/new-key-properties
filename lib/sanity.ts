import { createClient } from 'next-sanity'
import { unstable_cache } from 'next/cache'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '9gz26s06',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
})

export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '9gz26s06',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  perspective: 'previewDrafts',
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export type SanityListing = {
  _id: string
  title: string
  type: 'sale' | 'rent'
  price: string | number
  area: string | number
  rooms: string | number
  floor: string | number | null
  totalFloors: number | null
  constructionAct: 'act14' | 'act15' | 'act16' | null
  neighborhood: string
  description: string
  imageUrls: string[]
  features: string[]
  featured: boolean
  googleMapsUrl: string | null
}

const LISTING_FIELDS = `
  _id,
  title,
  type,
  price,
  area,
  rooms,
  floor,
  totalFloors,
  constructionAct,
  neighborhood,
  description,
  "imageUrls": select(count(images) > 0 => images[].asset->url, externalImageUrls),
  features,
  featured,
  googleMapsUrl
`

const _cachedGetListings = unstable_cache(
  () => client.fetch(`*[_type == "listing"] | order(orderRank asc) { ${LISTING_FIELDS} }`),
  ['listings'],
  { revalidate: 300 }
)
const _cachedGetFeaturedListings = unstable_cache(
  () => client.fetch(`*[_type == "listing" && featured == true] | order(_createdAt desc) { ${LISTING_FIELDS} }`),
  ['featured-listings'],
  { revalidate: 300 }
)

export async function getListings(preview = false): Promise<SanityListing[]> {
  try {
    if (preview) return await previewClient.fetch(`*[_type == "listing"] | order(orderRank asc) { ${LISTING_FIELDS} }`)
    return await _cachedGetListings()
  } catch { return [] }
}

export async function getListing(id: string, preview = false): Promise<SanityListing | null> {
  try {
    if (preview) return await previewClient.fetch(`*[_type == "listing" && _id == $id][0] { ${LISTING_FIELDS} }`, { id })
    return await unstable_cache(
      () => client.fetch(`*[_type == "listing" && _id == $id][0] { ${LISTING_FIELDS} }`, { id }),
      [`listing-${id}`],
      { revalidate: 300 }
    )()
  } catch { return null }
}

export async function getFeaturedListings(preview = false): Promise<SanityListing[]> {
  try {
    if (preview) return await previewClient.fetch(`*[_type == "listing" && featured == true] | order(_createdAt desc) { ${LISTING_FIELDS} }`)
    return await _cachedGetFeaturedListings()
  } catch { return [] }
}

// ── Blog Posts ──────────────────────────────────────────────────────────────

export type SanityBlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  image: string
}

const BLOG_POST_FIELDS = `
  "id": _id,
  "slug": slug.current,
  title,
  excerpt,
  content,
  date,
  category,
  "image": coalesce(image.asset->url, externalImageUrl, '')
`

const _cachedGetBlogPosts = unstable_cache(
  () => client.fetch(`*[_type == "blogPost"] | order(date desc) { ${BLOG_POST_FIELDS} }`),
  ['blog-posts'],
  { revalidate: 600 }
)

export async function getBlogPosts(preview = false): Promise<SanityBlogPost[]> {
  try {
    if (preview) return await previewClient.fetch(`*[_type == "blogPost"] | order(date desc) { ${BLOG_POST_FIELDS} }`)
    return await _cachedGetBlogPosts()
  } catch { return [] }
}

export async function getBlogPost(slug: string, preview = false): Promise<SanityBlogPost | null> {
  try {
    if (preview) return await previewClient.fetch(`*[_type == "blogPost" && slug.current == $slug][0] { ${BLOG_POST_FIELDS} }`, { slug })
    return await unstable_cache(
      () => client.fetch(`*[_type == "blogPost" && slug.current == $slug][0] { ${BLOG_POST_FIELDS} }`, { slug }),
      [`blog-post-${slug}`],
      { revalidate: 600 }
    )()
  } catch { return null }
}

export async function getBlogSlugs(): Promise<string[]> {
  try {
    const results = await client.fetch(`*[_type == "blogPost"]{ "slug": slug.current }`)
    return results.map((r: { slug: string }) => r.slug)
  } catch { return [] }
}

// ── Team Members ─────────────────────────────────────────────────────────────

export type SanityTeamMember = {
  id: string
  name: string
  role: string
  bio: string
  phone?: string
  email?: string
  image: string
}

const TEAM_MEMBER_FIELDS = `
  "id": _id,
  name,
  role,
  bio,
  phone,
  email,
  "image": coalesce(image.asset->url, '/team/placeholder.svg')
`

const _cachedGetTeamMembers = unstable_cache(
  () => client.fetch(`*[_type == "teamMember"] | order(order asc) { ${TEAM_MEMBER_FIELDS} }`),
  ['team-members'],
  { revalidate: 3600 }
)

export async function getTeamMembers(preview = false): Promise<SanityTeamMember[]> {
  try {
    if (preview) return await previewClient.fetch(`*[_type == "teamMember"] | order(order asc) { ${TEAM_MEMBER_FIELDS} }`)
    return await _cachedGetTeamMembers()
  } catch { return [] }
}

// ── Page Content ─────────────────────────────────────────────────────────────

const _cachedGetHomePage = unstable_cache(() => client.fetch(`*[_type == "homePage" && _id == "homePage"][0]{ ..., "featuredListings": featuredListings[]->{ ${LISTING_FIELDS} } }`), ['home-page'], { revalidate: 3600 })
const _cachedGetAboutPage = unstable_cache(() => client.fetch(`*[_type == "aboutPage" && _id == "aboutPage"][0]`), ['about-page'], { revalidate: 3600 })
const _cachedGetContactPage = unstable_cache(() => client.fetch(`*[_type == "contactPage" && _id == "contactPage"][0]`), ['contact-page'], { revalidate: 3600 })
const _cachedGetConsultationPage = unstable_cache(() => client.fetch(`*[_type == "consultationPage" && _id == "consultationPage"][0]`), ['consultation-page'], { revalidate: 3600 })
const _cachedGetSiteSettings = unstable_cache(() => client.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]`), ['site-settings'], { revalidate: 3600 })
const _cachedGetBlogPage = unstable_cache(() => client.fetch(`*[_type == "blogPage" && _id == "blogPage"][0]`), ['blog-page'], { revalidate: 3600 })
const _cachedGetTeamPage = unstable_cache(() => client.fetch(`*[_type == "teamPage" && _id == "teamPage"][0]`), ['team-page'], { revalidate: 3600 })
const _cachedGetListingsPage = unstable_cache(() => client.fetch(`*[_type == "listingsPage" && _id == "listingsPage"][0]`), ['listings-page'], { revalidate: 3600 })
const _cachedGetNeighborhoods = unstable_cache(() => client.fetch(`*[_type == "neighborhood"] | order(name asc)`), ['neighborhoods'], { revalidate: 3600 })

export async function getHomePage(preview = false) {
  try {
    if (preview) return await previewClient.fetch(`*[_type == "homePage" && _id == "homePage"][0]{ ..., "featuredListings": featuredListings[]->{ ${LISTING_FIELDS} } }`)
    return await _cachedGetHomePage()
  } catch { return null }
}

export async function getAboutPage(preview = false) {
  try {
    if (preview) return await previewClient.fetch(`*[_type == "aboutPage" && _id == "aboutPage"][0]`)
    return await _cachedGetAboutPage()
  } catch { return null }
}

export async function getContactPage(preview = false) {
  try {
    if (preview) return await previewClient.fetch(`*[_type == "contactPage" && _id == "contactPage"][0]`)
    return await _cachedGetContactPage()
  } catch { return null }
}

export async function getConsultationPage(preview = false) {
  try {
    if (preview) return await previewClient.fetch(`*[_type == "consultationPage" && _id == "consultationPage"][0]`)
    return await _cachedGetConsultationPage()
  } catch { return null }
}

export async function getSiteSettings(preview = false) {
  try {
    if (preview) return await previewClient.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]`)
    return await _cachedGetSiteSettings()
  } catch { return null }
}

export async function getBlogPage(preview = false) {
  try {
    if (preview) return await previewClient.fetch(`*[_type == "blogPage" && _id == "blogPage"][0]`)
    return await _cachedGetBlogPage()
  } catch { return null }
}

export async function getTeamPage(preview = false) {
  try {
    if (preview) return await previewClient.fetch(`*[_type == "teamPage" && _id == "teamPage"][0]`)
    return await _cachedGetTeamPage()
  } catch { return null }
}

export async function getListingsPage(preview = false) {
  try {
    if (preview) return await previewClient.fetch(`*[_type == "listingsPage" && _id == "listingsPage"][0]`)
    return await _cachedGetListingsPage()
  } catch { return null }
}

export async function getNeighborhoods(preview = false) {
  try {
    if (preview) return await previewClient.fetch(`*[_type == "neighborhood"] | order(name asc)`)
    return await _cachedGetNeighborhoods()
  } catch { return [] }
}

export async function getNeighborhood(slug: string, preview = false) {
  try {
    if (preview) return await previewClient.fetch(`*[_type == "neighborhood" && slug.current == $slug][0]`, { slug })
    return await unstable_cache(
      () => client.fetch(`*[_type == "neighborhood" && slug.current == $slug][0]`, { slug }),
      [`neighborhood-${slug}`],
      { revalidate: 3600 }
    )()
  } catch { return null }
}
