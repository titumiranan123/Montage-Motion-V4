import { XMLParser } from "fast-xml-parser";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sitemap`);
  const xmlText = await res.text();
  console.log(xmlText);
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });
  const parsed = parser.parse(xmlText);

  const urls = Array.isArray(parsed.urlset.url)
    ? parsed.urlset.url
    : [parsed.urlset.url];

  return urls.map((item: any) => ({
    url: item.loc,
    lastModified: item.lastmod,
    changeFrequency: item.changefreq,
    priority: parseFloat(item.priority),
  }));
}
