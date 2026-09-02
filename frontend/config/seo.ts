const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const SEO_CONFIG = {
  siteUrl: trimTrailingSlash(
    process.env.NEXT_PUBLIC_SITE_URL || "https://montagemotion.com",
  ),
  routes: {
    robots: "/robots.txt",
    sitemap: "/sitemap.xml",
  },
  backend: {
    robots: "/api/robots",
    sitemap: "/api/sitemap",
  },
  cacheTags: {
    robots: "seo:robots",
    sitemap: "seo:sitemap",
  },
  publicRoutes: [
    "/",
    "/about-us",
    "/blogs",
    "/case-studies",
    "/portfolio",
    "/careers",
    "/contact-us",
    "/privacy-policy",
    "/refund-policy",
    "/terms-and-conditions",
  ],
} as const;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const ROBOTS_FALLBACK = `User-agent: *\nAllow: /\nSitemap: ${SEO_CONFIG.siteUrl}${SEO_CONFIG.routes.sitemap}\n`;

export const normalizeRobots = (value: unknown) => {
  const content = typeof value === "string" ? value.trim() : "";
  if (!content) return ROBOTS_FALLBACK;
  if (/^\s*Sitemap:/im.test(content)) return `${content}\n`;
  return `${content}\nSitemap: ${SEO_CONFIG.siteUrl}${SEO_CONFIG.routes.sitemap}\n`;
};

export const buildFallbackSitemap = () => {
  const urls = SEO_CONFIG.publicRoutes
    .map(
      (route) =>
        `  <url><loc>${escapeXml(`${SEO_CONFIG.siteUrl}${route}`)}</loc></url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
};

export const isSitemapXml = (value: string) =>
  /<urlset\b/i.test(value) && /<\/urlset>/i.test(value);
