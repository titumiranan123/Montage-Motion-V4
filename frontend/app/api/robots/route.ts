import { getData } from "@/utils/getData";
import { normalizeRobots } from "@/config/seo";

export async function GET() {
  try {
    const robotTextData = await getData({
      url: "api/robots",
      cache: "no-store",
      throwOnError: true,
    });
    const robots = normalizeRobots(robotTextData?.data?.content);
    return new Response(robots, {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Error fetching robots.txt:", error);
    return new Response(normalizeRobots(null), {
      headers: { "content-type": "text/plain; charset=utf-8" },
      status: 200,
    });
  }
}
