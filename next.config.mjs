

const nextConfig = {
  // Renamed listing slugs: old address -> new one. These run before proxy.ts,
  // which would otherwise treat the old slug as a deleted listing.
  async redirects() {
    const renamedListings = [
      // NK-1053: the neighborhood is "Овча купел", never "Овча купел 1"
      ['ovcha-kupel-1-nk-1053', 'ovcha-kupel-nk-1053'],
    ]
    return renamedListings.flatMap(([from, to]) => [
      { source: `/listings/${from}`, destination: `/listings/${to}`, permanent: true },
      { source: `/en/listings/${from}`, destination: `/en/listings/${to}`, permanent: true },
    ])
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'files.builder.misssite.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
}

export default nextConfig
