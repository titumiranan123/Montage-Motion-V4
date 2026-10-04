"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Portfoliotab from "./Portfoliotab";
import PortfolioInfiniteGrid from "./PortfolioInfiniteGrid";

interface Category {
  href?: string;
  service_type?: string;
}

interface WorkItem {
  id?: string;
  type?: string;
  thumbnail?: string | null;
  video_link?: string | null;
  title?: string | null;
}

interface PortfolioListingProps {
  initialItems: WorkItem[];
  initialTotalPages: number;
  initialWorkType: string;
  types: Category[];
  limit: number;
}

export default function PortfolioListing({
  initialItems,
  initialTotalPages,
  initialWorkType,
  types,
  limit,
}: PortfolioListingProps) {
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const category = searchParams.get("cat");
  const matchedCategory = types.find(
    (item) => item.service_type === category || item.href === category,
  );
  const workType = category && category !== "all"
      ? matchedCategory?.service_type
      : "home";

  return (
    <>
      <Portfoliotab tab={workType ?? "home"} types={types} />
      <PortfolioResults
        key={query}
        initialItems={initialItems}
        initialTotalPages={initialTotalPages}
        initialWorkType={initialWorkType}
        activeWorkType={workType || initialWorkType}
        limit={limit}
      />
    </>
  );
}

function PortfolioResults({
  initialItems,
  initialTotalPages,
  initialWorkType,
  activeWorkType,
  limit,
}: {
  initialItems: WorkItem[];
  initialTotalPages: number;
  initialWorkType: string;
  activeWorkType: string;
  limit: number;
}) {
  const isInitialWorkType = activeWorkType === initialWorkType;
  const [items, setItems] = useState(isInitialWorkType ? initialItems : []);
  const [totalPages, setTotalPages] = useState(
    isInitialWorkType ? initialTotalPages : 1,
  );
  const [isLoading, setIsLoading] = useState(activeWorkType !== initialWorkType);

  useEffect(() => {
    if (activeWorkType === initialWorkType) return;

    const controller = new AbortController();
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/works/website?type=${encodeURIComponent(activeWorkType)}&page=1&limit=${limit}`,
      { signal: controller.signal },
    )
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to load portfolio items");
        const result = await response.json();
        const data = result?.data;
        setItems(Array.isArray(data) ? data : data?.items ?? []);
        setTotalPages(data?.pagination?.totalPages ?? 1);
      })
      .catch((error: unknown) => {
        if ((error as { name?: string })?.name !== "AbortError") {
          setItems([]);
          setTotalPages(1);
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [activeWorkType, initialWorkType, limit]);

  return (
    <>
      {isLoading && <p className="mt-8 text-center text-sm text-gray-500">Loading...</p>}
      <div className="max-w-7xl mx-auto pb-14">
        <PortfolioInfiniteGrid
          key={`${activeWorkType}-${items.length}`}
          initialItems={items}
          currentPage={1}
          totalPages={totalPages}
          limit={limit}
          workType={activeWorkType}
        />
      </div>
    </>
  );
}
