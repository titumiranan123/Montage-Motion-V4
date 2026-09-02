/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import CaseStudyCard from "./CaseCard";
import Link from "next/link";

const CaseStudyWrapper = ({
  data,
  currentPage,
  totalPages,
}: {
  data: any[];
  currentPage: number;
  totalPages: number;
}) => {
  const pageNumbers = (() => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page += 1) pages.push(page);
      return pages;
    }

    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let page = Math.max(2, currentPage - 1);
      page <= Math.min(totalPages - 1, currentPage + 1);
      page += 1
    ) {
      pages.push(page);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  })();

  const pageHref = (page: number) =>
    page === 1 ? "/montage/case-studies" : `/montage/case-studies?page=${page}`;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Case Study</h1>
          <p className="text-gray-400">Manage your Case Study</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Add section */}
          <Link
            href={"/montage/case-studies/create"}
            // onClick={() => {
            //   setExistingData(undefined);
            //   setItemOpen(true);
            // }}
            className="bg-[#1FB5DD] text-white py-2 px-6 rounded-lg"
          >
            Add Case Study
          </Link>
        </div>
      </div>
      {data?.length ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 items-stretch">
            {data.map((item: any) => (
              <CaseStudyCard key={item?.id} data={item} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              <Link
                href={pageHref(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage === 1}
                className={`rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 ${
                  currentPage === 1 ? "pointer-events-none opacity-40" : ""
                }`}
              >
                Previous
              </Link>
              {pageNumbers.map((page, index) =>
                page === "..." ? (
                  <span key={`dots-${index}`} className="px-2 text-gray-500">
                    ...
                  </span>
                ) : (
                  <Link
                    key={page}
                    href={pageHref(page)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "border-[#1FB5DD] bg-[#1FB5DD] text-white"
                        : "border-gray-700 text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {page}
                  </Link>
                ),
              )}
              <Link
                href={pageHref(Math.min(totalPages, currentPage + 1))}
                aria-disabled={currentPage === totalPages}
                className={`rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 ${
                  currentPage === totalPages ? "pointer-events-none opacity-40" : ""
                }`}
              >
                Next
              </Link>
            </div>
          )}
        </>
      ) : (
        <p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
          No case studies found.
        </p>
      )}
    </div>
  );
};

export default CaseStudyWrapper;
