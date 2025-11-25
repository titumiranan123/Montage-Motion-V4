import React from "react";
import Heading from "../share/Headering";
import Image from "next/image";
import Gradientcard from "../share/Gradientcard";
import Link from "next/link";

const ServiceSections = ({ data }: { data: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        subtitle={
          data?.paragraph
            ? data?.paragraph
            : "Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
        }
        title={data?.heading_part1 ? data?.heading_part1 : "Cat't Standout ?"}
        extratitle={
          data?.heading_part2 ? data?.heading_part2 : "Let Us Help You."
        }
        tag={data?.tag ? data?.tag : "Our Services"}
      />
      <div className="lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.services?.map((dt: any, idx: number) => (
          <Link
            href={dt?.href}
            key={idx}
            data-aos="fade-up"
            data-aos-delay={100 + idx * 100}
          >
            <Gradientcard
              className="relative overflow-hidden max-w-[384px] w-full max-h-[488px] h-full rounded-[24px] group"
              borderClassName="max-w-[384px] w-full max-h-[488px] h-full rounded-[24px] p-[1px] transition-transform duration-500 ease-out hover:-translate-y-4 hover:scale-[1.05px]"
            >
              <div className="text-[#E4E8F7] flex justify-center items-start flex-col p-4 h-full transition-transform duration-500 ease-out  ">
                <h2 className="md:text-[24px] text-[20px] poppins font-[600]group-hover:-translate-y-4 transition-transform duration-500 ease-out">
                  {dt?.service_title}
                </h2>
                <p className="md:text-[16px] text-[14px] font-[400] leading-[140%] text-[#E4E8F7] mt-2 opensans group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                  {dt?.service_description}
                </p>
                <Image
                  src={dt?.image}
                  alt={dt?.alt}
                  width={344}
                  height={276}
                  priority
                  className="max-w-[344px] w-full max-h-[276px] h-full md:mt-8 mt-4 group-hover:-translate-y-2 transition-transform duration-500 ease-out"
                />
              </div>
            </Gradientcard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServiceSections;
