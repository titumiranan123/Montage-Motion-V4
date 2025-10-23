import { MetadataRoute } from "next";

interface RobotsAPIResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    content: string; // raw robots.txt
    updated_at: string;
    updated_by: string | null;
  };
}

export default async function robots(): Promise<MetadataRoute.Robots> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/robots`);
    if (!res.ok) throw new Error(`Failed to fetch robots: ${res.status}`);

    const json: RobotsAPIResponse = await res.json();
    const content = json.data.content;

    const lines = content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const rules: MetadataRoute.Robots["rules"] = [];
    const sitemap: string[] = [];
    let currentRule: {
      userAgent: string;
      allow?: string[];
      disallow?: string[];
    } | null = null;

    for (const line of lines) {
      const [key, ...rest] = line.split(":");
      const value = rest.join(":").trim(); // join in case URL has colons

      switch (key.toLowerCase()) {
        case "user-agent":
          if (currentRule) rules.push(currentRule);
          currentRule = { userAgent: value };
          break;

        case "allow":
          if (currentRule) {
            currentRule.allow = currentRule.allow
              ? [...currentRule.allow, value]
              : [value];
          }
          break;

        case "disallow":
          if (currentRule) {
            currentRule.disallow = currentRule.disallow
              ? [...currentRule.disallow, value]
              : [value];
          }
          break;

        case "sitemap":
          sitemap.push(value);
          break;
      }
    }

    if (currentRule) rules.push(currentRule);

    return {
      rules,
      sitemap: sitemap.length ? sitemap : undefined,
    };
  } catch (err) {
    console.error("Failed to fetch robots:", err);
    return {
      rules: [{ userAgent: "*", allow: ["/"] }],
    };
  }
}
