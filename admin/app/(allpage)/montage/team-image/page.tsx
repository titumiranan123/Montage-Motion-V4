/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Brandwrapper from "./Teamimagewrapper";
import Brandcard from "./Brandcard";

const BrandSection = async () => {

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/team-image`,
    );
    const result = await response.json();
    const data = result.data;
// console.log("data ==================>",data)
    return (
      <div>
        <Brandwrapper />
        <div className="flex w-full flex-wrap gap-8 items-center">
          {data?.map((dt: any, idx: number) => (
            <Brandcard dt={dt} key={idx} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};

export default BrandSection;
