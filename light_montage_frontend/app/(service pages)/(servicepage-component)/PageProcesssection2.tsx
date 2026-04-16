/* eslint-disable @typescript-eslint/no-explicit-any */
import Gradientcard from "@/component/share/Gradientcard";
import { Heading } from "@/component/share/Headering";

import Image from "next/image";

export const PageProcesssection2 = ({ data }: { data: any }) => {
  // console.log("new set ======================>", data);
  return (
    <div className="mx-auto max-w-7xl sectionGap">
      <Heading
        subtitle={data?.paragraph ?? ""}
        tag={data?.tag ?? ""}
        title={data?.heading_part1 ?? ""}
        extratitle={data?.heading_part2 ?? ""}
        width="160"
        isbackground={true}
      />
      <div className=" flex lg:flex-row items-stretch flex-col px-2 lg:px-0 mt-9 md:mt-16 gap-12 lg:max-h-224.5">
        <div data-aos="fade-right" data-aos-delay={200} className="flex-1 flex">
          <Image
            src={data?.image ?? ""}
            alt="process"
            width={638}
            height={898}
            className={` bg-cover w-full h-full ${data?.process_steps.length > 3 ? "max-w-159.5 max-h-224.5 " : "max-h-134  max-w-159.5"}`}
            priority
          />
        </div>

        <div className=" flex-1 flex flex-col  gap-2">
          {data?.process_steps?.map((dt: any, idx: number) => (
            <div key={idx} data-aos="fade-up" data-aos-delay={100 + idx * 100}>
              <Gradientcard
                isHover={true}
                className="contact-card flex justify-between items-start text-(--text-primary) max-w-175 w-full h-42.5 rounded-3xl"
                borderClassName="max-w-[698px] w-full h-[172px] rounded-[24px] p-[1px] transition-transform duration-200 ease-in-out hover:scale-[104%]"
              >
                <Image
                  src={dt?.icon ?? ""}
                  alt={dt?.alt ?? ""}
                  className="w-14 h-14  rounded-[12px] p-2.5"
                  width={36}
                  height={36}
                />
                <div className="w-full">
                  <h3
                    title={dt?.title}
                    className="font-semibold line-clamp-2 poppins text-[24px] "
                  >
                    {dt?.title ?? ""}
                  </h3>
                  <p className=" font-normal line-clamp-3 text-[16px]">
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

export default PageProcesssection2;
