'use client'
import ContactCard from '@/component/contact/Contactcards';
import ContactcardSkeleton from '@/component/contact/ContactcardSkeleton';

import useContact from '@/hook/useContact';
import { Contact } from '@/interface/interface';
import { Mail } from 'lucide-react';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AllContacts: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: contacts,
    total,
    totalPages,
    isLoading,
    isError,
  } = useContact(currentPage, 6);

  const pageNumbers = (() => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page += 1) pages.push(page);
      return pages;
    }

    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (
      let page = Math.max(2, currentPage - 1);
      page <= Math.min(totalPages - 1, currentPage + 1);
      page += 1
    ) {
      pages.push(page);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  })();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="rounded-xl bg-[#1FB5DD]/15 p-2 text-[#1FB5DD]">
                <Mail size={22} />
              </div>
              <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
            </div>
            <p className="text-sm text-gray-400">
              Review and manage messages submitted through your website.
            </p>
          </div>
          {!isLoading && !isError && (
            <span className="w-fit rounded-full border border-[#1FB5DD]/30 bg-[#1FB5DD]/10 px-4 py-2 text-sm font-medium text-[#1FB5DD]">
              {total} {total === 1 ? 'message' : 'messages'}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 xl:grid-cols-2">
        {isLoading ? (
          [...Array(4)].map((_, idx) => <ContactcardSkeleton key={idx} />)
        ) : isError ? (
          <p className="col-span-full rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-300">
            Could not load contact messages.
          </p>
        ) : contacts?.length ? (
          contacts.map((contact: Contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              page={currentPage}
              onDeleted={() => {
                if (contacts.length === 1 && currentPage > 1) {
                  setCurrentPage((page) => Math.max(1, page - 1));
                }
              }}
            />
          ))
        ) : (
          <p className="col-span-full rounded-xl border border-dashed border-white/10 p-12 text-center text-gray-400">
            No contact messages found.
          </p>
        )}
        </div>
        {!isLoading && !isError && totalPages > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            {pageNumbers.map((page, index) =>
              page === '...' ? (
                <span key={`dots-${index}`} className="px-2 text-gray-500">...</span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 w-10 rounded-lg border text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'border-[#1FB5DD] bg-[#1FB5DD] text-white'
                      : 'border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {page}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};



export default AllContacts ;
