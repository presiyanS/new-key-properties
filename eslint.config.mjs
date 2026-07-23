import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // Sanity Studio custom components run inside Studio's own bundled app,
    // not Next.js pages — next/image isn't usable there.
    files: ['sanity/**/*.{ts,tsx}'],
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
]

export default eslintConfig
