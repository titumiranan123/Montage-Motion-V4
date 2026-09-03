"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Blogtab from "./Blogtab";
import Blogcard from "./Blogcard";

interface BlogItem {
  image: string;
  title: string;
  short_description: string;
  slug: string;
  created_at?: string;
}

export default function BlogListing({ initialBlogs }: { initialBlogs: BlogItem[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const category = searchParams.get("cat");
  const search = searchParams.get("search");

  return (
    <>
      <Blogtab />
      <BlogResults
        key={query}
        initialBlogs={initialBlogs}
        category={category}
        search={search}
      />
    </>
  );
}

function BlogResults({
  initialBlogs,
  category,
  search,
}: {
  initialBlogs: BlogItem[];
  category: string | null;
  search: string | null;
}) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [isLoading, setIsLoading] = useState(Boolean((category && category !== "all") || search));

  useEffect(() => {
    if ((!category || category === "all") && !search) return;

    const controller = new AbortController();
    const params = new URLSearchParams();
    if (category && category !== "all") params.set("category", category);
    if (search) params.set("search", search);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/website/blog?${params}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to load blogs");
        const result = await response.json();
        setBlogs(result?.data ?? []);
      })
      .catch((error: unknown) => {
        if ((error as { name?: string })?.name !== "AbortError") {
          setBlogs([]);
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [category, initialBlogs, search]);

  return (
    <>
      {isLoading && <p className="mt-8 text-center text-sm text-gray-500">Loading...</p>}
      <div className="grid grid-cols-1 max-w-250 mx-auto w-full md:grid-cols-2 gap-5 mt-10 lg:mt-16">
        {blogs.map((blog, idx) => (
          <div key={blog.slug || idx} data-aos="fade-up" data-aos-delay={100 + idx * 100}>
            <Blogcard
              image={blog.image}
              title={blog.title}
              short_description={blog.short_description}
              slug={blog.slug}
              createdAt={blog.created_at ?? ""}
            />
          </div>
        ))}
      </div>
    </>
  );
}
