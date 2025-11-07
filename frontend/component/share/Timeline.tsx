"use client";
import React, { useEffect, useRef, useState } from "react";
import target from "@/public/assets/target-02.png";
import background from "@/public/assets/Group 1000011820.png";
import discover from "@/public/assets/discover.png";
import file_video from "@/public/assets/file-video.png";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    id: 1,
    title: "Discover & Align",
    description:
      "We start with a quick brief or call to lock in goals, messaging, audience and key performance metrics. No guesswork, just clarity from day one.",
    icon: "/assets/discover.png",
  },
  {
    id: 2,
    title: "Strategy & Creative Direction",
    description:
      "We set up the project: a brand strategy, storyboards, script framework, and a content plan. We define the creative direction for the project.",
    icon: "/assets/strategy.png",
  },
  {
    id: 3,
    title: "Produce & Gather Assets",
    description:
      "We organize your product, service, team, location, and brand assets. We gather all the elements needed to tell your story, including footage, photos, and messaging.",
    icon: "/assets/edit.png",
  },
  {
    id: 4,
    title: "Build & Edit",
    description:
      "This is the craft phase: editing and motion graphics, sound design, and color grading. We build the final product, ensuring it meets your expectations.",
    icon: "/assets/review.png",
  },
  {
    id: 5,
    title: "Review & Refine",
    description:
      "You get a first cut to give us feedback. We make all the changes and revisions to ensure the project is perfect before it goes live.",
    icon: "/assets/file-video.png",
  },
];

gsap.registerPlugin(ScrollTrigger);

const AIProcess = () => {
  const [active, setActive] = useState(0);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepRefs.current.forEach((step, i) => {
        if (!step) return;

        const content = contentRefs.current[i];
        const icon = iconRefs.current[i];
        const circle = circleRefs.current[i];

        // Set initial states
        gsap.set([content, icon], {
          opacity: 0,
          y: 40,
        });

        gsap.set(circle, {
          scale: 0.8,
          opacity: 0.5,
        });

        ScrollTrigger.create({
          trigger: step,
          start: "top 70%",
          end: "bottom 30%",
          onEnter: () => animateIn(i, content, icon, circle),
          onLeave: () => animateOut(i, content, icon, circle),
          onEnterBack: () => animateIn(i, content, icon, circle),
          onLeaveBack: () => animateOut(i, content, icon, circle),
        });
      });

      function animateIn(index: number, content: any, icon: any, circle: any) {
        setActive(index);

        // Animate content
        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });

        // Animate icon
        gsap.to(icon, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.1,
          ease: "power2.out",
        });

        // Animate circle
        gsap.to(circle, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.4)",
        });

        // Animate line
        if (!lineRef.current) return;
        const totalSteps = stepRefs.current.length;
        const heightPercent = ((index + 1) / totalSteps) * 100;

        gsap.to(lineRef.current, {
          height: `${heightPercent}%`,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }

      function animateOut(index: number, content: any, icon: any, circle: any) {
        gsap.to([content, icon], {
          opacity: 0.3,
          duration: 0.4,
          ease: "power2.in",
        });

        gsap.to(circle, {
          scale: 0.9,
          opacity: 0.6,
          duration: 0.4,
          ease: "power2.in",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black text-white py-16 px-4 font-sans">
      <div className="relative max-w-6xl mx-auto">
        {/* Vertical line in center */}
        <div className="absolute top-[9%] left-1/2 -translate-x-1/2 h-[82%] w-[10px]">
          <div
            ref={lineRef}
            className="absolute top-0 left-0 w-full verticalLine-bg origin-top"
            style={{ height: "0%" }}
          ></div>
        </div>

        {steps.map((step, index) => (
          <div
            key={step.id}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            className={`flex flex-col lg:gap-0 gap-8 md:flex-row items-start md:items-center my-16 justify-between ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Circle number */}
            <div
              className={`relative w-full md:w-auto flex items-center justify-center md:absolute md:transform md:-translate-x-1/2 ${
                index % 2 === 0 ? "md:left-[46.5%]" : "md:left-[53.6%]"
              }`}
            >
              <div
                ref={(el) => {
                  circleRefs.current[index] = el;
                }}
                className={`relative w-[84px] h-[84px] flex items-center justify-center z-10
                  ${index === active ? "active-bg" : ""}
                  border-white/20 transition-all duration-500
                  md:absolute md:top-1/2 md:-translate-y-1/2
                  ${
                    index % 2 === 0
                      ? "md:-left-1/2 md:translate-x-0"
                      : "md:-right-1/2 md:translate-x-0"
                  }`}
              >
                <style>
                  {`
                    .active-bg {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      background: linear-gradient(
                        250.64deg,
                        rgba(51, 87, 163, 0.5) 0%,
                        rgba(51, 87, 163, 0) 50%,
                        rgba(51, 87, 163, 0.5) 100%
                      );
                      z-index: 0;
                      padding: 1px;
                      border-radius: 24px;
                    }

                    .verticalLine-bg {
                      background: linear-gradient(
                        180deg,
                        rgba(49, 95, 172, 0.2) 0.02%,
                        #315FAC 21.38%,
                        rgba(49, 95, 172, 0.2) 100%
                      );
                    }
                  `}
                </style>
                <div
                  className={`flex justify-center items-center w-[82px] h-[82px] ${
                    index === active ? "bg-black" : "bg-transparent"
                  } rounded-[24px] transition-all duration-500`}
                >
                  <span
                    className={`font-bold flex justify-center items-center transition-all duration-500 ${
                      index === active
                        ? "text-xl w-full h-full"
                        : "text-sm w-7 h-7 bg-white text-black rounded-full"
                    } ${
                      index === 0 &&
                      "rounded-[24px] z-10 firstNumber-bg relative !border-none"
                    } leading-none poppins`}
                  >
                    {step.id}
                  </span>
                </div>
              </div>
            </div>

            {/* Step description */}
            <div
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              className="w-full max-w-[460px] min-h-[196px] h-full p-[1px] rounded-[24px] processboxborder mx-auto md:mx-0"
            >
              <div className="bg-black p-6 w-full max-w-[460px] min-h-[196px] h-full rounded-[24px]">
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>

            {/* Icon */}
            <div
              ref={(el) => {
                iconRefs.current[index] = el;
              }}
              className="w-full max-w-[460px] min-h-[196px] p-4 md:p-8 flex items-center justify-center relative"
            >
              <Image
                className="object-contain mx-auto"
                src={step.icon}
                width={460}
                height={194}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIProcess;
