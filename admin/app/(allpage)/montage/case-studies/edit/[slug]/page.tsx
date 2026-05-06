import axios from 'axios';
import React from 'react';
import EditCaseStudyForm from './EditFrom';

const page = async({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  console.log("slug =========>", slug);
  let result;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/case-studies/${slug}`,
    );
  
  result = res?.data
  } catch (error) {
    console.log(error)
  }
  console.log("case study data =========>", result?.data);
  return (
    <div>
      <EditCaseStudyForm initialData={result?.data} />
    </div>
  );
};

export default page;