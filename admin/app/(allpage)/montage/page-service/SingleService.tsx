import Image from "next/image";
import React from "react";
import Gradientcard from "./Gradientcard";
import Heading from "./Headering";

const SingleService = ({ data }: { data: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        subtitle={data?.paragraph}
        title={data?.heading_part1}
        extratitle={data?.heading_part2}
        tag={data?.tag}
      />
      <div className="lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.services?.map((dt: any, idx: number) => (
          <div key={idx} data-aos="fade-up" data-aos-delay={100 + idx * 100}>
            <Gradientcard
              className="max-w-[384px] w-full max-h-[488px] h-full rounded-[24px] "
              borderClassName="max-w-[384px] w-full max-h-[488px] h-full rounded-[24px]  p-[1px]"
            >
              <div className=" text-[#E4E8F7] flex justify-center items-start flex-col p-4">
                <h2 className="md:text-[24px] text-[20px] poppins font-[600]">
                  {dt.service_title}
                </h2>
                <p className="md:text-[16px] text-[14px] font-[400] leading-[140%] text-[#E4E8F7] mt-2 opensans">
                  {dt.service_description}
                </p>
                <Image
                  src={dt.image}
                  alt={dt.alt}
                  width={344}
                  height={276}
                  priority
                  className="max-w-[344px] w-full max-h-[276px] h-full md:mt-8 mt-4"
                />
              </div>
            </Gradientcard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleService;
