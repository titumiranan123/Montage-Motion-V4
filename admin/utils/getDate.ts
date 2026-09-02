/* eslint-disable @typescript-eslint/no-explicit-any */
import { authOptions } from "@/component/authoption";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const getData = async ({
  slug,
  headers = {},
}: {
  slug: string;
  headers?: Record<string, string>;
  shouldRedirect?: boolean;
}): Promise<any> => {
  const session: any = await getServerSession(authOptions);
  if (!session?.user?.token) {
    redirect("/signin");
  }

  let response: Response;
  try {
    response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`,
          ...headers,
        },
        cache: "no-store",
      },
    );
  } catch (error) {
    console.error("API request failed:", error);
    return [];
  }

  if (response.status === 401) {
    const errorBody: any = await response.json().catch(() => ({}));
    const errorCode = errorBody?.error?.code;

    if (
      errorCode === "TOKEN_EXPIRED" ||
      errorCode === "TOKEN_INVALID" ||
      errorCode === "TOKEN_MISSING" ||
      errorCode === "UNAUTHORIZED"
    ) {
      redirect("/signin?message=session_expired");
    }

    console.error("Unauthorized access:", errorBody);
    redirect("/signin?message=invalid_token");
  }

  if (response.status === 403) {
    redirect("/signin?error=forbidden");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.error("API Error:", response.status, error);
    return [];
  }

  try {
    const result = await response.json();
    return result.data ?? result;
  } catch (error) {
    console.error("Invalid API response:", error);
    return [];
  }
};
