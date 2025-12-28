import React from "react";

interface headerProp {
  title: string;
  subtitle: string;
  tag: string;
  extratitle?: string;
  isbackground?: boolean;
}

export const Heading: React.FC<headerProp> = ({ title, subtitle, tag }) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center max-w-5xl w-full mx-auto">
      <p className="glassShadowithoutinset bg-[#BAE8F4]/9 backdrop-blur-2xl max-w-[238px] w-full h-[46px] flex justify-center items-center rounded-3xl text-[16px] leading-[140%] text-(--text-primary) font-normal  poppins">
        {tag}
      </p>
      <p className="text-4xl md:text-[56px] md:leading-[120%] font-medium text-center text-(--text-primary) mt-2 xl:mt-4 poppins">
        {title}
      </p>
      {/* 
      {extratitle && (
        <p className="text-4xl md:text-5xl font-semibold text-center text-gray-800 poppins">
          {extratitle}
        </p>
      )} */}

      <p className="text-sm md:text-base md:leading-[150%] font-normal text-center text-gray-600 mt-2 w-full xl:w-4/9 mx-auto ">
        {subtitle}
      </p>
    </div>
  );
};
