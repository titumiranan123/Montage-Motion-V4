
import React from 'react';
import CaseStudyWrapper from './CaseStudyWrapper';
import axios from 'axios';
export const dynamic = 'force-dynamic';
const page = async () => {
  let result
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/case-studies?limit=10`,
    );

    result = res?.data?.data
  } catch (error) {
    console.log(error)
  }

  console.log("case study data =========>", result?.data);
  return (
    <div>

      <CaseStudyWrapper data={result?.data} />
      {/* <CreateCaseStudyPage /> */}
    </div>
  );
};

export default page;