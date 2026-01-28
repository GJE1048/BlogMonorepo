const path = require('path');

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-image-domain.com',
        pathname: '/**',
      },
    ],
  },
  turbopack: {
    root: path.join(__dirname, '..', '..'),
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL, // Use environment variable for database connection
  },
};
