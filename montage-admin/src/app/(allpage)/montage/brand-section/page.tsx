import React from "react";
import Brandwrapper from "./Brandwrapper";
import Image from "next/image";

const BrandSection = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brand/images`
    );
    const result = await response.json();
    const data = result.data;

    return (
      <div>
        <Brandwrapper />
        <div className="flex w-full flex-wrap gap-8 items-center">
          {data?.map((dt: any, idx: number) => (
            <div key={idx}>
              <Image alt={dt?.alt} src={dt?.image} width={120} height={40} />
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};

export default BrandSection;
