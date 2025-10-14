"use client";
import React, { useRef, useState } from "react";
import Gradientcard from "./Gradientcard";

interface AccordionItem {
  question: string;
  answer: string;
}

interface accordionProp {
  items: AccordionItem[];
}

const Accordion: React.FC<accordionProp> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items?.map((item, index) => (
        <Gradientcard
          data-aos="fade-up"
          data-aos-delay={100 + index * 100}
          className="lg:max-w-[996px] min-h-[68px] w-full h-full rounded-[18px]"
          borderClassName="lg:max-w-[996px] min-h-[68px] w-full h-full rounded-[18px] p-[1px]"
          key={index}
        >
          <div
            // style={{ boxShadow: "0px 4px 60px 0px #1FB5DD29 inset" }}
            key={index}
            className={`text-white ${
              openIndex === index ? "" : "bg-black"
            }  rounded-[18px]  overflow-hidden transition-colors duration-200 `}
          >
            <div
              className="cursor-pointer p-6 flex justify-between items-center"
              onClick={() => handleToggle(index)}
            >
              <h3 className="font-[600] poppins leading-[30px] md:text-[21px] text-[16px] flex items-center gap-2">
                Q. {item.question}
              </h3>
              <div className="flex-shrink-0 ml-4 border rounded-full">
                <svg
                  className={`transform fill-white transition-transform duration-300 ${
                    openIndex === index ? "-rotate-180" : "rotate-0"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z" />
                </svg>
              </div>
            </div>
            <div
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              style={{
                maxHeight:
                  openIndex === index
                    ? `${contentRefs.current[index]?.scrollHeight}px`
                    : "0px",
              }}
              className="transition-all duration-300 ease-in-out overflow-hidden opensans"
            >
              <div className="px-6 pb-6 pt-0">
                <p className="lg:text-[18px] lg:leading-[26px] text-sm font-opensans">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        </Gradientcard>
      ))}
    </div>
  );
};

export default Accordion;
