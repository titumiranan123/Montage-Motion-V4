process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { getData } from "@/utils/getData";

export async function GET() {
  try {
    const robotTextData = await getData({ url: "api/robots" });
    console.log(robotTextData);
    const robots = robotTextData?.data?.content ?? "User-agent: *\nDisallow:";
    return new Response(robots, {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Error fetching robots.txt:", error);
    return new Response("User-agent: *\nDisallow:", {
      headers: { "content-type": "text/plain; charset=utf-8" },
      status: 500,
    });
  }
}
