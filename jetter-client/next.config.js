require('dotenv').config();
require('webpack');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  webpack(config) {
    return config;
  },
  // experimental: {
  //   async rewrites() {
  //     return [
  //       {
  //         source: '/j/:jetId/post/:postId',
  //         destination: '/j/:jetId/:postId'
  //       },
  //       {
  //         source: '/j/:jetId/post/:postId/edit',
  //         destination: '/j/:jetId/:postId/edit'
  //       },
  //       {
  //         source: '/j/:jetId/link/:linkId',
  //         destination: '/j/:jetId/:linkId'
  //       },
  //       {
  //         source: '/j/:jetId/link/:linkId/edit',
  //         destination: '/j/:jetId/:linkId/edit'
  //       }
  //     ];
  //   }
  // },
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    PRODUCTION_CLIENT_ID: process.env.PRODUCTION_CLIENT_ID,
    PRODUCTION_CLIENT_SECRET: process.env.PRODUCTION_CLIENT_SECRET,
    KONG_JWT: process.env.KONG_JWT
  }
});
