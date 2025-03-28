// next.config.js

import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: NextConfig) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      os: false,
      path: false,
      crypto: false,
      "crypto-browserify": require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer"),
    };

    return config;
  },
};

module.exports = nextConfig;
