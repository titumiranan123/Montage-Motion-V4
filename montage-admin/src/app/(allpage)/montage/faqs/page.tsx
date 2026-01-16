import { getData } from "@/utils/getDate";
import React from "react";
import FaqWrapper from "./FaqWrapper";

const Faqs = async () => {
  const data = await getData({ slug: "faq" });
  console.log(data);

  return (
    <div className="text-gray-100 p-4 md:p-8">
      <FaqWrapper data={data} />
    </div>
  );
};

export default Faqs;
