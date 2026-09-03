'use client';

import { useCallback } from 'react';
import CaseStudyCard from './NewCaseStudies';
import InfiniteScrollGrid from './InfiniteScrollGrid';

interface CaseStudyItem {
  id: string;
  slug?: string;
  type?: string | null;
  status?: 'published' | 'draft' | 'archived' | null;
  title?: string | null;
  description?: string | null;
  image_url?: string | null;
  image_alt?: string | null;
  metrics?: { label: string; value: string }[];
  created_at?: string | null;
}

interface CaseStudiesInfiniteGridProps {
  initialItems: CaseStudyItem[];
  currentPage: number;
  totalPages: number;
  limit: number;
}

export default function CaseStudiesInfiniteGrid({
  initialItems,
  currentPage,
  totalPages,
  limit,
}: CaseStudiesInfiniteGridProps) {
  const loadPage = useCallback(async (page: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/case-studies?page=${page}&limit=${limit}&status=published`,
    );

    if (!response.ok) throw new Error('Failed to load case studies');

    const result = await response.json();
    return (result?.data?.data ?? []) as CaseStudyItem[];
  }, [limit]);

  return (
    <InfiniteScrollGrid
      key={`${currentPage}-${totalPages}`}
      initialItems={initialItems}
      initialPage={currentPage}
      totalPages={totalPages}
      loadPage={loadPage}
      getItemKey={(item) => item.id}
      renderItem={(item) => <CaseStudyCard item={item} />}
    />
  );
}
