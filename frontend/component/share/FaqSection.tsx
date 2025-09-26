import React from "react";
import Heading from "./Headering";
import Image from "next/image";
import Accordion from "./Accordion";
const items = [
  {
    question: "What types of videos do you specialize in editing ?",
    answer:
      "We specialize in editing a wide range of videos , including but not limited to promotional content , vlogs, interviews and event comverage.",
  },
  {
    question: "How long does the video editing process typically take ?",
    answer:
      "We specialize in editing a wide range of videos , including but not limited to promotional content , vlogs, interviews and event comverage.",
  },
  {
    question:
      "Can i provide speicfic instructions for the editing style and preferences ?",
    answer:
      "We specialize in editing a wide range of videos , including but not limited to promotional content , vlogs, interviews and event comverage.",
  },
  {
    question: "What steps are involved in your video editing service ?",
    answer:
      "We specialize in editing a wide range of videos , including but not limited to promotional content , vlogs, interviews and event comverage.",
  },
  {
    question:
      "Is there a limit to the revisions I can request for my edited video ?",
    answer:
      "We specialize in editing a wide range of videos , including but not limited to promotional content , vlogs, interviews and event comverage.",
  },
  {
    question: "What types of videos do you specialize in editing ?",
    answer:
      "We specialize in editing a wide range of videos , including but not limited to promotional content , vlogs, interviews and event comverage.",
  },
];
const FaqSection = () => {
  return (
    <div id="faq" className="container sectionGap">
      <Heading
        subtitle="Got Questions? We've Got Answers"
        tag="FAQ"
        title="Have Questions ?"
      />
      <div className="grid grid-cols-3 lg:mt-20 md:mt-16 mt-8 gap-10">
        <div className="flex justify-center items-center flex-col">
          <Image
            src={"/assets/faq.png"}
            alt="faq"
            title="faqimage"
            width={135}
            height={135}
            priority
          />
          <h2 className="md:mt-4 mt-2 mb-2 font-[600] font-poppins text-white text-[24px]">
            Have more questions ?
          </h2>
          <p className="font-[400] text-[16px] leading-[140%] text-white text-center">
            Still curious? Let’s talk it out. Book a quick call. We’ll walk you
            through everything and help you figure out the best move for your
            brand.
          </p>
          <div className="flex justify-between items-center flex-col text-white mt-12 mb-9 gap-2">
            <h2 className="text-[24px] font-[600] leading-[100%]">
              Safwan Waffif
            </h2>
            <p className="text-[16px] font-[400] leading-[140%]">
              Project Co-ordinator
            </p>
          </div>
          <button className="btn-color max-w-[348px] w-full h-[56px] rounded-[16px] py-[16px] px-[16px] font-[500] ">
            Book a Call
          </button>
        </div>
        <div className=" col-span-2 ">
          <Accordion items={items} />
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
