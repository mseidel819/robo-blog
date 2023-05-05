const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: process.env.USERNAME,
        mongodb_password: process.env.PASSWORD,
        mongodb_clustername: process.env.CLUSTERNAME,
        mongodb_database: process.env.DATABASE,
      },
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "robohash.org",
            port: "",
            pathname: "/**",
          },
        ],
      },
    };
  }

  return {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "robohash.org",
          port: "",
          pathname: "/**",
        },
      ],
    },
  };
};

module.exports = nextConfig;
