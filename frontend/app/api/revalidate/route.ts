import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

type RevalidatePayload = {
  tags?: unknown;
};

export async function POST(request: Request) {
  const configuredSecret = process.env.REVALIDATE_SECRET;
  const authorization = request.headers.get("authorization");

  if (!configuredSecret) {
    return Response.json(
      { success: false, message: "Revalidation is not configured" },
      { status: 503 },
    );
  }

  if (authorization !== `Bearer ${configuredSecret}`) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  let payload: RevalidatePayload;
  try {
    payload = (await request.json()) as RevalidatePayload;
  } catch {
    return Response.json(
      { success: false, message: "Invalid JSON payload" },
      { status: 400 },
    );
  }

  const tags = Array.isArray(payload.tags)
    ? [...new Set(payload.tags.filter((tag): tag is string => typeof tag === "string" && tag.length > 0))].slice(0, 25)
    : [];

  if (!tags.length) {
    return Response.json(
      { success: false, message: "At least one cache tag is required" },
      { status: 400 },
    );
  }

  for (const tag of tags) revalidateTag(tag, "max");

  return Response.json({ success: true, revalidated: tags });
}
