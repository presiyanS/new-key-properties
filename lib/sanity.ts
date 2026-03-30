import { createClient } from 'next-sanity'
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

function getClient(preview = false) {
  return preview ? previewClient : client
}

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export type SanityListing = {
  _id: string
  title: string
  type: 'sale' | 'rent'
  price: number
  area: number
  rooms: number
  floor: number | null
  totalFloors: number | null
  constructionAct: 'act14' | 'act15' | 'act16' | null
  neighborhood: string
  description: string
  imageUrls: string[]
  features: string[]
  featured: boolean
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
  featured
`

export async function getListings(preview = false): Promise<SanityListing[]> {
  try {
    return await getClient(preview).fetch(`*[_type == "listing"] | order(orderRank asc) { ${LISTING_FIELDS} }`)
  } catch { return [] }
}

export async function getListing(id: string, preview = false): Promise<SanityListing | null> {
  try {
    return await getClient(preview).fetch(`*[_type == "listing" && _id == $id][0] { ${LISTING_FIELDS} }`, { id })
  } catch { return null }
}

export async function getFeaturedListings(preview = false): Promise<SanityListing[]> {
  try {
    return await getClient(preview).fetch(`*[_type == "listing" && featured == true] | order(_createdAt desc) { ${LISTING_FIELDS} }`)
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

export async function getBlogPosts(preview = false): Promise<SanityBlogPost[]> {
  try {
    return await getClient(preview).fetch(`*[_type == "blogPost"] | order(date desc) { ${BLOG_POST_FIELDS} }`)
  } catch { return [] }
}

export async function getBlogPost(slug: string, preview = false): Promise<SanityBlogPost | null> {
  try {
    return await getClient(preview).fetch(
      `*[_type == "blogPost" && slug.current == $slug][0] { ${BLOG_POST_FIELDS} }`,
      { slug }
    )
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

export async function getTeamMembers(preview = false): Promise<SanityTeamMember[]> {
  try {
    return await getClient(preview).fetch(`*[_type == "teamMember"] | order(order asc) { ${TEAM_MEMBER_FIELDS} }`)
  } catch { return [] }
}

// ── Page Content ─────────────────────────────────────────────────────────────

export async function getHomePage(preview = false) {
  try {
    return await getClient(preview).fetch(`*[_type == "homePage" && _id == "homePage"][0]`)
  } catch { return null }
}

export async function getAboutPage(preview = false) {
  try {
    return await getClient(preview).fetch(`*[_type == "aboutPage" && _id == "aboutPage"][0]`)
  } catch { return null }
}

export async function getContactPage(preview = false) {
  try {
    return await getClient(preview).fetch(`*[_type == "contactPage" && _id == "contactPage"][0]`)
  } catch { return null }
}

export async function getConsultationPage(preview = false) {
  try {
    return await getClient(preview).fetch(`*[_type == "consultationPage" && _id == "consultationPage"][0]`)
  } catch { return null }
}

export async function getSiteSettings(preview = false) {
  try {
    return await getClient(preview).fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]`)
  } catch { return null }
}

export async function getBlogPage(preview = false) {
  try {
    return await getClient(preview).fetch(`*[_type == "blogPage" && _id == "blogPage"][0]`)
  } catch { return null }
}

export async function getTeamPage(preview = false) {
  try {
    return await getClient(preview).fetch(`*[_type == "teamPage" && _id == "teamPage"][0]`)
  } catch { return null }
}

export async function getListingsPage(preview = false) {
  try {
    return await getClient(preview).fetch(`*[_type == "listingsPage" && _id == "listingsPage"][0]`)
  } catch { return null }
}
