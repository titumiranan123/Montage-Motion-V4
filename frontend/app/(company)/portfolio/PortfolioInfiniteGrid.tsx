'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import VideoPlayer from '@/component/home/VideoPlayer';
import { getSafeImageSrc } from '@/utils/media';
import InfiniteScrollGrid from '../case-studies/InfiniteScrollGrid';

interface WorkItem {
  id?: string;
  type?: string;
  thumbnail?: string | null;
  video_link?: string | null;
  title?: string | null;
}

interface PortfolioInfiniteGridProps {
  initialItems: WorkItem[];
  currentPage: number;
  totalPages: number;
  limit: number;
  workType: string;
}

export default function PortfolioInfiniteGrid({
  initialItems,
  currentPage,
  totalPages,
  limit,
  workType,
}: PortfolioInfiniteGridProps) {
  const loadPage = useCallback(async (page: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/works/website?type=${encodeURIComponent(workType)}&page=${page}&limit=${limit}`,
    );

    if (!response.ok) throw new Error('Failed to load portfolio items');

    const result = await response.json();
    const data = result?.data;
    return (Array.isArray(data) ? data : data?.items ?? []) as WorkItem[];
  }, [limit, workType]);

  return (
    <InfiniteScrollGrid
      key={`${workType}-${currentPage}-${totalPages}`}
      initialItems={initialItems}
      initialPage={currentPage}
      totalPages={totalPages}
      loadPage={loadPage}
      getItemKey={(item, index) => item.id ?? `${item.type}-${item.thumbnail}-${index}`}
      renderItem={(work) => {
        if (work.type === 'shortsreels-editing') {
          return (
            <VideoPlayer
              thumbnail={work.thumbnail ?? ''}
              link={work.video_link ?? ''}
              className="aspect-9/16!"
            />
          );
        }

        if (!work.video_link) {
          return (
            <div className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 aspect-video max-w-102.5 w-full h-full max-h-77 rounded-[13px]">
              {work.title && (
                <p className="absolute z-20 text-sm py-1 px-2 rounded-[13px] left-2 top-2 text-white bg-[#00000066]">
                  {work.title}
                </p>
              )}
              {work.thumbnail ? (
                <Image
                  src={getSafeImageSrc(work.thumbnail)}
                  alt={work.title || 'Graphic work'}
                  width={348}
                  height={216}
                  className="rounded-[13px] object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center bg-gray-700 w-full h-full rounded-[13px]">
                  <p>No thumbnail</p>
                </div>
              )}
            </div>
          );
        }

        return <VideoPlayer thumbnail={work.thumbnail ?? ''} link={work.video_link ?? ''} />;
      }}
    />
  );
}
