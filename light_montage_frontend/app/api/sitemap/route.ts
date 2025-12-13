import api from "@/utils/api.json";
import { getData } from "@/utils/getData";
import axios from "axios";

const extractUrlTags = (xmlString: string) => {
  const urlTagRegex = /<url>([\s\S]*?)<\/url>/g;
  return xmlString.match(urlTagRegex) || [];
};

export async function GET(req: Request) {
  let combineAllSiteMapXml = undefined;
  try {
    const data = await axios.get(api.cms.sitemap);

    const finalData = extractUrlTags(data.data);
    console.log("refinedata", finalData);
    combineAllSiteMapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${finalData}
    </urlset>`;

    return new Response(combineAllSiteMapXml, {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
