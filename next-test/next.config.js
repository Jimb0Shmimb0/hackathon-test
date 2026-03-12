/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'd3b24qxei2vojx.cloudfront.net',
      },
    ],
  },
}

module.exports = nextConfig
