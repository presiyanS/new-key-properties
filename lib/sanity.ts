import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
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
  "imageUrls": images[].asset->url,
  features,
  featured
`

export async function getListings(): Promise<SanityListing[]> {
  return client.fetch(`*[_type == "listing"] | order(_createdAt desc) { ${LISTING_FIELDS} }`)
}

export async function getListing(id: string): Promise<SanityListing | null> {
  return client.fetch(`*[_type == "listing" && _id == $id][0] { ${LISTING_FIELDS} }`, { id })
}

export async function getFeaturedListings(): Promise<SanityListing[]> {
  return client.fetch(`*[_type == "listing" && featured == true] | order(_createdAt desc) { ${LISTING_FIELDS} }`)
}
