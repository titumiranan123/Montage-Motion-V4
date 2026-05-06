// components/PaginationControls.tsx
'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationControls({
  currentPage,
  totalPages,
}: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const getPageNumbers = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    if (currentPage > 3) pages.push('...');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Prev */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
      >
       <ArrowLeft size={16} /> Prev
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page, idx) =>
        page === '...' ? (
          <span key={`dots-${idx}`} className="px-2 text-gray-400 select-none">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-[#1FB5DD] text-white border border-[#1FB5DD]'
                : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
      >
        Next <ArrowRight size={16} />
      </button>
    </div>
  );
}