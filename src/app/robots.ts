import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // NB: `/_next/` is deliberately NOT disallowed. It serves the JS and CSS
      // Googlebot needs to render the page; blocking it hides the rendered
      // content and layout from the crawler.
      disallow: ["/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
