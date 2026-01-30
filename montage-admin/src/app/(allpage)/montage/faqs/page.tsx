import { getData } from "@/utils/getDate";
import React from "react";
import FaqWrapper from "./FaqWrapper";

const Faqs = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const data = await getData({ slug: `faq?page=${page}` });
  console.log(data);
  return (
    <div className="text-gray-100 p-4 md:p-8">
      <FaqWrapper data={data?.[0] ?? []} />
    </div>
  );
};

export default Faqs;
