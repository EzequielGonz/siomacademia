/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ibb.co', 'images.unsplash.com'],
  },
  serverExternalPackages: ['better-sqlite3']
};

export default nextConfig;
