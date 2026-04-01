'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StagingStudioPage() {
  return <NextStudio config={config} basePath="/studio-staging" />
}
