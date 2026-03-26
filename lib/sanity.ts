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
  neighborhood,
  description,
  "imageUrls": select(count(images) > 0 => images[].asset->url, externalImageUrls),
  features,
  featured
`

export async function getListings(): Promise<SanityListing[]> {
  try {
    return await client.fetch(`*[_type == "listing"] | order(_createdAt desc) { ${LISTING_FIELDS} }`)
  } catch { return [] }
}

export async function getListing(id: string): Promise<SanityListing | null> {
  try {
    return await client.fetch(`*[_type == "listing" && _id == $id][0] { ${LISTING_FIELDS} }`, { id })
  } catch { return null }
}

export async function getFeaturedListings(): Promise<SanityListing[]> {
  try {
    return await client.fetch(`*[_type == "listing" && featured == true] | order(_createdAt desc) { ${LISTING_FIELDS} }`)
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

export async function getBlogPosts(): Promise<SanityBlogPost[]> {
  try {
    return await client.fetch(`*[_type == "blogPost"] | order(date desc) { ${BLOG_POST_FIELDS} }`)
  } catch { return [] }
}

export async function getBlogPost(slug: string): Promise<SanityBlogPost | null> {
  try {
    return await client.fetch(
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

export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  try {
    return await client.fetch(`*[_type == "teamMember"] | order(order asc) { ${TEAM_MEMBER_FIELDS} }`)
  } catch { return [] }
}

// ── Page Content ─────────────────────────────────────────────────────────────

export async function getHomePage() {
  try {
    return await client.fetch(`*[_type == "homePage" && _id == "homePage"][0]`)
  } catch { return null }
}

export async function getAboutPage() {
  try {
    return await client.fetch(`*[_type == "aboutPage" && _id == "aboutPage"][0]`)
  } catch { return null }
}

export async function getContactPage() {
  try {
    return await client.fetch(`*[_type == "contactPage" && _id == "contactPage"][0]`)
  } catch { return null }
}

export async function getConsultationPage() {
  try {
    return await client.fetch(`*[_type == "consultationPage" && _id == "consultationPage"][0]`)
  } catch { return null }
}
