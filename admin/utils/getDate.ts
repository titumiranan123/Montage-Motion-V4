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
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.token) {
      redirect("/signin");
    }
    const response = await fetch(
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
    // 🚀 401 → redirect always works because json() already consumed above
    if (response.status === 401) {
      let errorBody: any = {};
      try {
        errorBody = await response.json();
      } catch (error) {
        console.log(error);
      }
      const errorCode = errorBody?.error?.code;

      if (
        errorCode === "TOKEN_EXPIRED" ||
        errorCode === "TOKEN_INVALID" ||
        errorCode === "TOKEN_MISSING" ||
        errorCode === "UNAUTHORIZED"
      ) {
        // এই ক্ষেত্রে সত্যিই সেশন শেষ → লগিনে পাঠাও
        redirect("/signin?message=session_expired");
      } else {
        // অন্য কারণে 401 (যেমন ভুল টোকেন ফরম্যাট, ব্ল্যাকলিস্টেড)
        console.error("Unauthorized access:", errorBody);
        redirect("/signin?message=invalid_token");
      }
    }

    if (response.status === 403) {
      redirect("/signin?error=forbidden");
    }

    // অন্য সব এরর
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("API Error:", response.status, error);
      throw new Error(error.error?.message || "Failed to load data");
    }

    const result = await response.json();
    return result.data ?? result;
  } catch (error) {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/${slug}`);
    console.log(error);
    return [];
  }
};
