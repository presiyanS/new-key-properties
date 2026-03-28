import { listingType } from './listing'
import { blogPostType } from './blogPost'
import { teamMemberType } from './teamMember'
import { homePageType } from './homePage'
import { aboutPageType } from './aboutPage'
import { contactPageType } from './contactPage'
import { consultationPageType } from './consultationPage'
import { siteSettingsType } from './siteSettings'
import { blogPageType } from './blogPage'
import { teamPageType } from './teamPage'
import { listingsPageType } from './listingsPage'

export const schemaTypes = [
  // Singletons (settings & pages)
  siteSettingsType,
  homePageType,
  aboutPageType,
  contactPageType,
  consultationPageType,
  blogPageType,
  teamPageType,
  listingsPageType,
  // Collections
  listingType,
  blogPostType,
  teamMemberType,
]
