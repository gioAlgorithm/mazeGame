/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com', 'github.com', 'avatars.githubusercontent.com'],
  },
  reactStrictMode: false,
}

module.exports = nextConfig
