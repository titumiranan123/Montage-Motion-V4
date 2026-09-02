"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCardHorizontal from "@/component/blogs/Blogcard";
import BlogForm from "@/component/blogs/Blogform";
import React, { useState } from "react";
import Link from "next/link";

const Blogwraper = ({
  data,
  currentPage,
  totalPages,
}: {
  data: any[];
  currentPage: number;
  totalPages: number;
}) => {
  const [isOpen, setOpen] = useState(false);
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
    page === 1 ? "/montage/blogs" : `/montage/blogs?page=${page}`;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Blog Page</h1>
          <p className="text-gray-400">Manage your Blogs</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Add section */}
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="bg-[#1FB5DD] text-white py-2 px-6 rounded-lg"
          >
            Add Blog
          </button>
        </div>
      </div>
      <div>
        {data?.length ? (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 items-stretch">
              {data.map((bg: any) => (
                <BlogCardHorizontal key={bg.id} blog={bg} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                <Link
                  href={pageHref(Math.max(1, currentPage - 1))}
                  aria-disabled={currentPage === 1}
                  className={`rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 ${
                    currentPage === 1 ? "pointer-events-none opacity-40" : ""
                  }`}
                >
                  Previous
                </Link>
                {pageNumbers.map((page, index) =>
                  page === "..." ? (
                    <span key={`dots-${index}`} className="px-2 text-gray-400">
                      ...
                    </span>
                  ) : (
                    <Link
                      key={page}
                      href={pageHref(page)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "border-[#1FB5DD] bg-[#1FB5DD] text-white"
                          : "border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </Link>
                  ),
                )}
                <Link
                  href={pageHref(Math.min(totalPages, currentPage + 1))}
                  aria-disabled={currentPage === totalPages}
                  className={`rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 ${
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
            No blogs found.
          </p>
        )}
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm p-4 z-50 overflow-y-auto flex justify-center items-center">
          <BlogForm onCancel={setOpen} />
        </div>
      )}
    </div>
  );
};

export default Blogwraper;
