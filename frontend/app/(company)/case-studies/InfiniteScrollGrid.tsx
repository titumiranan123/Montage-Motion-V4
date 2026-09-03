'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface InfiniteScrollGridProps<T> {
  initialItems: T[];
  initialPage: number;
  totalPages: number;
  loadPage: (page: number) => Promise<T[]>;
  renderItem: (item: T, index: number) => React.ReactNode;
  getItemKey?: (item: T, index: number) => React.Key;
}

export default function InfiniteScrollGrid<T>({
  initialItems,
  initialPage,
  totalPages,
  loadPage,
  renderItem,
  getItemKey,
}: InfiniteScrollGridProps<T>) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || error || page >= totalPages) return;

    setIsLoading(true);
    try {
      const nextItems = await loadPage(page + 1);
      setItems((currentItems) => [...currentItems, ...nextItems]);
      setPage((currentPage) => currentPage + 1);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [error, isLoading, loadPage, page, totalPages]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || page >= totalPages || error) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void loadMore();
      },
      { rootMargin: '400px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [error, loadMore, page, totalPages]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {items.map((item, index) => (
          <div key={getItemKey?.(item, index) ?? index}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {page < totalPages && (
        <div ref={loadMoreRef} className="flex min-h-16 items-center justify-center mt-8">
          {isLoading && <span className="text-sm text-gray-500">Loading more...</span>}
          {error && <span className="text-sm text-red-500">Could not load more items.</span>}
        </div>
      )}
    </>
  );
}
