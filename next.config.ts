import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Tylko dla `next dev`: pozwala otwierać serwer deweloperski z telefonu w sieci lokalnej.
  allowedDevOrigins: ["192.168.1.10"],
  images: {
    // Nowoczesne formaty — duże pliki PNG są serwowane jako lekkie AVIF/WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
