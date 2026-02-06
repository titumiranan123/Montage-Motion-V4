/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useState, useId, useRef } from "react";
import { ChevronRight, CircleCheck } from "lucide-react";
import Gradientcard from "./Gradientcard";

export function TabsClient({ tabs }: { tabs: any }) {
  const safeTabs = Array.isArray(tabs) ? tabs : [];
  const [activeTab, setActiveTab] = useState(0);
  const labelId = useId();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const activeTabData = safeTabs[activeTab];
  return (
    <div className="space-y-6  w-full lg:mt-16 mt-8 ">
      {/* Tabs Navigation */}
      <div className="w-full flex justify-center items-center">
        <div
          ref={containerRef}
          role="tablist"
          aria-label="Content categories"
          className="relative flex justify-start flex-nowrap  lg:justify-start 
           items-center 
         px-2 overflow-x-scroll scrollbar-hide  rounded-[12px] glassShadow  bg-white/40 p-3 w-[520px] mx-auto"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {safeTabs?.map((tab: any, index: number) => (
            <button
              key={tab?.id}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`${labelId}-${tab?.id}-panel`}
              onClick={() => setActiveTab(index)}
              className={`p-3 text-(--text-primary) opensans font-normal text-[16px] leading-[120%] rounded-[12px] text-center transition-colors whitespace-nowrap h-[51px] shrink-0  ${
                activeTab === index ? "btn-color font-semibold" : ""
              }`}
            >
              {tab?.title}
            </button>
          ))}
        </div>
      </div>
      <div
        role="tabpanel"
        aria-labelledby={`${labelId}-${activeTabData?.id}`}
        className="w-full relative"
        data-aos="fade-up"
        data-aos-delay={300}
        style={{ zIndex: 10 }}
      >
        {/* Content Card */}
        <Gradientcard
          borderClassName="lg:w-[918px] lg:max-w-full max-w-[918px]  mx-auto w-full p-px rounded-2xl z-10"
          className="lg:w-[916px] lg:max-w-full max-w-[916px]  mx-auto w-full rounded-2xl"
        >
          <div className="relative">
            <div className="rounded-2xl  p-3   md:p-6 flex justify-between items-center lg:flex-row flex-col-reverse gap-4 lg:w-[916px] lg:max-w-full max-w-[916px]  mx-auto w-full relative ">
              <div className=" text-(--text-primary)   w-full lg:w-1/2">
                <h3 className="mb-1 text-xl font-semibold md:text-2xl poppins">
                  {activeTabData?.title}
                </h3>
                <p className="mb-8 text-sm leading-relaxed opacity-90 md:text-base opensans">
                  {activeTabData?.description}
                </p>
                <h3 className="text-[16px] font-medium leading-[100%] text-(--text-primary)">
                  What we offer
                </h3>
                <ul className="space-y-2 text-sm md:text-base opensans mt-2">
                  {activeTabData?.offer_points?.map(
                    (point: any, index: number) => (
                      <li
                        key={index}
                        className="flex font-normal items-center gap-3"
                      >
                        <CircleCheck size={18} />
                        <span className="opacity-90">{point?.text}</span>
                      </li>
                    ),
                  )}
                </ul>

                <a
                  href={activeTabData?.cta?.link}
                  className="mt-6 inline-flex items-center justify-center rounded-2xl  px-4 py-2.5 md:text-[16px] text-[14px] font-medium  opensans"
                >
                  {activeTabData?.cta?.label}
                  <ChevronRight />
                </a>
              </div>
              {/* Image Card */}
              <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10 w-full lg:w-1/2 ">
                <Image
                  src={activeTabData?.image}
                  alt={activeTabData?.title}
                  width={600}
                  height={390}
                  className="h-full w-full object-cover"
                  priority={activeTab === 0}
                />
                <div className="absolute inset-0 " />
              </div>
            </div>
            <div className="lg:absolute hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
              <Image
                src={activeTabData?.image}
                alt={activeTabData?.title}
                className="max-w-[1435px] w-full mx-auto"
                width={1435}
                height={10}
              />
            </div>
          </div>
        </Gradientcard>
      </div>
      <div className="bg-[#BAE8F4]/40  -mt-10 max-w-[788px] w-full mx-auto h-7.5 rounded-[20px]"></div>
    </div>
  );
}
