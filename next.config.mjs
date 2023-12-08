import { withFaust } from '@faustwp/core'
import withBundleAnalyzer from '@next/bundle-analyzer'
import million from 'million/compiler'

async function fetchWordPressRedirects() {
  const resp = await fetch('https://ncccsstg.wpengine.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          redirection {
            redirects {
              type
              origin
              target
              code
            }
          }
        }
      `,
    }),
  })
  const { data } = await resp.json()

  if (!Array.isArray(data?.redirection?.redirects)) {
    return []
  }

  let redirects = data.redirection.redirects
    .filter(redirection => redirection.type === 'url')
    .map(redirection => ({
      source: redirection.origin,
      destination: redirection.target,
      permanent: redirection.code === 301 ? true : false,
    }))

  // console.log('redirects', redirects)

  return redirects
}

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: [process.env.WP_IMAGES_URL],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 120,
  },
  experimental: {
    optimizeCss: true,
    largePageDataBytes: 1024 * 1024 * 2,
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(
      rule => rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
  async redirects() {
    const wordPressRedirects = await fetchWordPressRedirects()
    return wordPressRedirects
  },
}

export default million.next(bundleAnalyzer(withFaust(nextConfig)), {
  auto: false,
  mute: true,
})
