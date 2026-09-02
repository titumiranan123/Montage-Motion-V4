
import React from 'react';
import CaseStudyWrapper from './CaseStudyWrapper';
import axios from 'axios';
export const dynamic = 'force-dynamic';
interface CaseStudiesPageProps {
  searchParams: Promise<{ page?: string }>;
}

const page = async ({ searchParams }: CaseStudiesPageProps) => {
  const { page: pageParam } = await searchParams;
  const requestedPage = Number(pageParam);
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const limit = 6;
  let caseStudies = [];
  let totalPages = 1;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/case-studies?page=${currentPage}&limit=${limit}`,
    );

    // The API response is { success, data: { data: CaseStudy[], ...pagination } }.
    caseStudies = res?.data?.data?.data ?? [];
    totalPages = res?.data?.data?.pages || 1;
  } catch (error) {
    console.log(error)
  }

  return (
    <div>
      <CaseStudyWrapper
        data={caseStudies}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      {/* <CreateCaseStudyPage /> */}
    </div>
  );
};

export default page;
