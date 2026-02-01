import React from "react";
import Brandwrapper from "./Brandwrapper";
import Brandcard from "./Brandcard";

const BrandSection = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brand/images?type=${page}`,
    );
    const result = await response.json();
    const data = result.data;

    return (
      <div>
        <Brandwrapper />
        <div className="flex w-full flex-wrap gap-8 items-center">
          {data?.map((dt: any, idx: number) => (
            <Brandcard dt={dt} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};

export default BrandSection;
