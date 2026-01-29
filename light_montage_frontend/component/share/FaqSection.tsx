import React from "react";
import { Heading } from "../share/Headering";
import Image from "next/image";
import Accordion from "./Accordion";
import Gradientcard from "./Gradientcard";
const items = [
  {
    question: "Do you optimize for different platforms?",
    answer:
      "Yes. We cut each feed: hooks fast, captions clean, pacing tuned, and the right crop. You get platform-ready exports, thumbnails, SRTs, and titles.",
  },
  {
    question: "What do I need to send you?",
    answer:
      "Raw footage, brand kit, logos, scripts or talking points, your goal, and any refs you like. Share via Drive or Dropbox. If unsure, send it. We will be short.",
  },
  {
    question: "Can you turn one long video into lots of short clips?",
    answer:
      "Yes. We mine one recording for 8-12 strong hooks, cut clean clips, add captions and roll, then export 9:16, 1:1, 16:9 so you can post across channels.",
  },
  {
    question: "How many revision rounds do I get?",
    answer:
      "Two rounds per edit. Most wrap in one. Leave time-stamped notes, and we turn them fast. Need extra versions or a new direction? We will confirm the scope first.",
  },
  {
    question: "Do you add captions and on-screen graphics?",
    answer:
      "Yes. We add clean, readable captions, motion callouts, progress bars, and simple infographics where they help retention and clarity.",
  },
  {
    question: "Can you work under an NDA and keep my content private?",
    answer:
      "Yes. NDAs are common. Your files live in secure cloud folders with limited access, and we remove assets on request.",
  },
  {
    question:
      "We tried other editors and spent too much time explaining. How are you different?",
    answer:
      "You get a dedicated pod that learns your voice, builds a style guide, and anticipates edits. That cuts back and forth and saves your calendar.",
  },
  {
    question: "Can you help a founder who hates being on camera?",
    answer:
      "Yes. We can work with screen captures, product b-roll, voiceover, and motion graphics. You do not need to be a performer to get results.",
  },
  {
    question: "What happens if we do not like the first cut?",
    answer:
      "No problem. Tell us what you missed and why. We will pivot the hook, pacing, or graphics. The goal is fit, not the defense of a draft.",
  },
];
const FaqSection = () => {
  return (
    <div id="faq" className="container sectionGap">
      <Heading
        subtitle="Everything you need to know before we get started. "
        tag="FAQ"
        title="Frequently Asked Questions"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:mt-20 md:mt-16 mt-8 lg:gap-10">
        <div data-aos="fade-up" className="" data-aos-delay={400}>
          <Gradientcard
            borderClassName="max-w-[422px] max-h-[751px] h-full w-full rounded-3xl p-[1px] "
            className="max-w-[420px] max-h-[749px] h-full w-full rounded-3xl "
          >
            <div className="flex justify-center  items-center flex-col h-full md:py-10 py-6 px-2 md:px-9">
              <Image
                src={"/assets/faq.png"}
                alt="faq"
                title="faqimage"
                width={135}
                height={135}
                priority
              />
              <h2 className="md:mt-4 mt-2 mb-2 font-semibold poppins  text-(--text-primary)  md:text-[24px] text-[22px] text-center lg:text-left">
                Have more questions ?
              </h2>
              <p className="font-normal text-[16px] opensans leading-[140%]  text-(--text-primary)  text-center">
                Still curious? Let’s talk it out. Book a quick call. We’ll walk
                you through everything and help you figure out the best move for
                your brand.
              </p>
              <div className="flex justify-between items-center flex-col  text-(--text-primary)  mt-12 mb-9 gap-2">
                <h2 className="text-[24px] font-semibold leading-[100%] poppins">
                  Safwan Wafif
                </h2>
                <p className="text-[16px] font-normal leading-[140%] opensans">
                  Project Co-ordinator
                </p>
              </div>
              <button className="btn-color max-w-[348px] w-full h-14 rounded-2xl py-4 px-4 font-medium  opensans animated hover:scale-105">
                Book a Call
              </button>
            </div>
          </Gradientcard>
        </div>
        <div className=" col-span-2 ">
          <Accordion items={items} />
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
