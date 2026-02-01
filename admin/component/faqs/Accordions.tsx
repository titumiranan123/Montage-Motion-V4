"use client";
import React, { useRef, useState, useEffect } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface accordionProp {
  items: AccordionItem[];
}

const Accordions: React.FC<accordionProp> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [heights, setHeights] = useState<number[]>([]);

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // FIX: height calculation outside render (no error now)
  useEffect(() => {
    const newHeights = contentRefs.current.map((el) =>
      el ? el.scrollHeight : 0,
    );
    setHeights(newHeights);
  }, [items]);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items?.map((item, index) => (
        <div
          // data-aos="fade-up"
          // data-aos-delay={100 + index * 100}
          className={`lg:max-w-[996px] min-h-[68px] w-full h-full rounded-3xl  border border-[#E8EAEA] ${
            index === openIndex ? "bgaccordion border-transparent" : ""
          }`}
          key={index}
        >
          <div
            className={` text-(--text-primary)  rounded-[18px] overflow-hidden transition-colors duration-200`}
          >
            <div
              className="cursor-pointer p-6 flex justify-between items-center"
              onClick={() => handleToggle(index)}
            >
              <h3 className="font-semibold poppins leading-[30px] md:text-[24px] md:leading-[25px] text-[16px] flex items-center gap-2">
                Q. {item.question}
              </h3>
              <div className="shrink-0 ml-4 border border-(--text-primary) rounded-full">
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
                maxHeight: openIndex === index ? `${heights[index]}px` : "0px",
              }}
              className="transition-all duration-300  ease-in-out overflow-hidden opensans"
            >
              <div className="px-6 pb-6 pt-0">
                <p className="lg:text-[16px] font-normal lg:leading-[26px] text-sm opensans">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordions;
