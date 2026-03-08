/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Gradientcard from "@/component/share/Gradientcard";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const PageProcessslider = ({ data }: { data: any }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll(".story-card");
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (
          rect.top < window.innerHeight / 2 &&
          rect.bottom > window.innerHeight / 2
        ) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className=" flex lg:flex-row items-stretch flex-col px-2 lg:px-0 mt-9 md:mt-16 gap-12 lg:max-h-224.5">
      <div
        data-aos="fade-right"
        data-aos-delay={200}
        className="flex-1 flex sticky top-32 self-start rounded-[13px]"
      >
        <Image
          src={data?.[activeIndex]?.image ?? ""}
          alt="process"
          width={638}
          height={898}
          className="max-w-159.5 bg-cover w-full max-h-224.5 h-full rounded-[13px]"
          priority
        />
      </div>

      <div className=" flex-1 flex flex-col  gap-2">
        {data?.map((dt: any, idx: number) => (
          <div
            key={idx}
            data-aos="fade-up"
            className="story-card "
            data-aos-delay={100 + idx * 100}
          >
            <Gradientcard
              isHover={activeIndex !== idx}
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
  );
};

export default PageProcessslider;
