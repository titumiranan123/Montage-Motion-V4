import { AboutFetch } from "@/src/hook/fetchabout";
import { fetchBlog } from "@/src/hook/fetchBlog";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

// app/services/advertising/metadata.ts (or inside layout.tsx/page.tsx)
export const metadata = {
  title: "Blog | MontageMotion - Tips, Trends & Insights in Video Editing",
  description:
    "Explore expert articles, creative tips, and the latest trends in video editing, content creation, and digital marketing from the MontageMotion team.",
};




export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey:['blogs'],
        queryFn:()=>fetchBlog()
    })
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
