import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (~20% smaller than WebP at equal quality, so more detail
    // survives per byte); browsers without AVIF fall back to WebP.
    formats: ["image/avif", "image/webp"],

    // Next 16 requires every `quality` value used in the app to be allowlisted
    // here. 90 is the site default for photos, 95 for the logo's text edges.
    qualities: [75, 90, 95],

    // Defaults plus 1440/2560 so full-bleed heroes get a candidate near the
    // common laptop widths instead of jumping 1200 -> 1920.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 2560, 3840],

    // Must all be smaller than the smallest deviceSize. 160/300 serve the
    // carousel thumbnails at 1x/2x, 453/512 the service-page gallery tiles.
    imageSizes: [32, 48, 64, 96, 128, 160, 256, 300, 384, 453, 512],

    // 7 days, up from the 4-hour default. Next has no cache invalidation, so
    // a photo replaced under the same filename stays stale for this long —
    // worth raising once the source images below stop changing.
    minimumCacheTTL: 604800,
  },
};

export default nextConfig;
