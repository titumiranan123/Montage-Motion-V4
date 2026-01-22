/* eslint-disable @typescript-eslint/no-explicit-any */
import Gradientcard from "@/component/share/Gradientcard";

import Image from "next/image";
import { Heading } from "../share/Headering";

export const OurProcess = ({ data }: { data: any }) => {
  return (
    <div className="mx-auto max-w-7xl px-2 sectionGap">
      <Heading
        subtitle={data?.paragraph ?? ""}
        tag={data?.tag ?? ""}
        title={data?.heading_part1 ?? ""}
        extratitle={data?.heading_part2 ?? ""}
      />
      <div className=" flex lg:flex-row flex-col mt-9 md:mt-16 gap-12">
        <Image
          src={data?.image ?? ""}
          alt="process "
          width={638}
          height={898}
          // data-aos="fade-right"
          // data-aos-delay={200}
          className="max-w-[638px] w-full max-h-[898px] h-full"
          priority
        />

        <div className=" flex flex-col  gap-2">
          {data?.process_steps?.map((dt: any, idx: number) => (
            <div key={idx} data-aos="fade-up" data-aos-delay={100 + idx * 100}>
              <Gradientcard
                isHover={true}
                className="contact-card flex justify-between lg:items-center text-(--text-primary) flex-col lg:flex-row max-w-[700px] w-full lg:h-[170px] h-80  rounded-3xl"
                borderClassName="max-w-[698px] w-full lg:h-[172px] h-80.5 rounded-[24px] p-[1px]"
              >
                <Image
                  src={dt?.icon ?? ""}
                  alt={dt?.alt ?? ""}
                  className="w-14 h-14  rounded-[12px] p-2.5"
                  width={36}
                  height={36}
                />
                <div className="w-full">
                  <h3 className="font-semibold poppins text-[24px] ">
                    {dt?.title ?? ""}
                  </h3>
                  <p className=" font-normal text-[16px]">
                    {dt?.description ?? ""}
                  </p>
                </div>
              </Gradientcard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurProcess;
