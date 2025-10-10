
import { fetchSingleBlog } from "@/src/hook/fetchsingleBlog";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import  type { Metadata } from "next";
interface LayoutProps {
  children: React.ReactNode;
  params: any; // or other route params
}
// app/services/advertising/metadata.ts (or inside layout.tsx/page.tsx)
export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const blog = await fetchSingleBlog(params.slug);

  return {
    title: blog?.title || "Blog Title",
    description: blog?.excerpt || "",
    
  };
}



export default async function RootLayout({
  children,params
}:LayoutProps) {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey:["blog",params.slug],
        queryFn:()=> fetchSingleBlog(params.slug)
    })
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
