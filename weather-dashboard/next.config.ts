import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org', // Erlaubt Bilder von der Wetter-API
      },
    ],
  },
};

export default nextConfig;
