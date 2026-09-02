import { getData } from "@/utils/getDate";
import React from "react";
import TestimonialWrapper from "./TestimonialWrapper";

const Testimonail = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const data = await getData({ slug: page ? `testimonials?type=${page}` : "testimonials" });
  return (
    <div>
      <TestimonialWrapper data={data} />
    </div>
  );
};

export default Testimonail;
