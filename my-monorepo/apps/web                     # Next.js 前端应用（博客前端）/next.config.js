module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['your-image-domain.com'], // Replace with your image domains
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL, // Use environment variable for database connection
  },
};