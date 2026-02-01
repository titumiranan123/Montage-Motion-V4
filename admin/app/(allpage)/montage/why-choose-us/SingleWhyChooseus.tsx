import Image from "next/image";
import React from "react";
import Gradientcard from "./Gradientcard";
import Heading from "../page-service/Headering";

const SingleWhyChooseus = ({ data }: { data: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        subtitle={data?.paragraph}
        title={data?.heading_part1}
        // extratitle={data?.heading_part2}
        tag={data?.tag}
      />
      <div className="lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.whychooseus_items?.map((dt: any, idx: number) => (
          <div key={idx} data-aos="fade-up" data-aos-delay={100 + idx * 100}>
            <Gradientcard
              key={idx}
              className="max-w-[384px] w-full h-full md:min-h-[302px] max-h-[302px] rounded-[24px] md:py-6 py-4 md:px-5 px-4"
              borderClassName="p-[1px] max-w-[384px] w-full h-full md:min-h-[304px] max-h-[304px] rounded-[24px]"
            >
              <div className="flex justify-center items-start flex-col text-white gap-2">
                <Image
                  src={dt?.icon}
                  alt={dt?.alt}
                  width={35}
                  height={35}
                  priority
                />
                <p className="text-[22px] md:text-[24px] font-semibold poppins text-[#E4E8F7]">
                  {dt?.title}
                </p>
                <p className="text-[14px] md:text-[16px] font-[400] opensans text-[#E4E8F7]">
                  {dt?.description}
                </p>
              </div>
            </Gradientcard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleWhyChooseus;
