"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import arrow from "@/public/assets/icon/arrow-right-01.png";
import TurstedBy from "./TurstedBy";
import useWorks from "@/hook/useWorks";
const Header = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bottomBoxRef = useRef<HTMLDivElement>(null);
  const smalButton = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useWorks("main");
  console.log(data);

  // console.log(smalButton);
  // useEffect(() => {
  //   const section = sectionRef.current;
  //   const bottomBox = bottomBoxRef.current;
  //   const smalButtonBox = smalButton.current;
  //   if (!section || !bottomBox || !smalButtonBox) return;
  //   gsap.from(smalButtonBox, {
  //     opacity: 0,
  //     rotation: 360,
  //     duration: 1.5,
  //     scrollTrigger: {
  //       trigger: smalButton,
  //       start: "top 80%",
  //     },
  //   });

  //   section.addEventListener("mouseenter", () => {
  //     gsap.to(bottomBox, {
  //       duration: 2.5,
  //       delay: 1,
  //       ease: "power3.out",
  //       scale: 1.08,
  //     });
  //   });

  //   // যখন cursor বের হবে
  //   section.addEventListener("mouseleave", () => {
  //     gsap.to(bottomBox, {
  //       y: 0, // আবার নিচে নামবে
  //       duration: 1.5,
  //       scale: 1,
  //       ease: "power3.inOut",
  //     });
  //   });
  // }, []);
  return isLoading ? (
    <div className="flex lg:flex-row flex-col lg:justify-between items-center   container px-[60px] overflow-hidden relative lg:h-[564px] h-[780px] lg:gap-4 gap-4 ">
      <div className="absolute lg:top-1/3 md:top-[60%] top-[76%] lg:right-1/4 right-[20%]  lg:w-[689px] md:w-[500px] w-[250px] h-[400px] md:h-[900px] lg:h-[689px] bg-[#5586ED] lg:blur-[125px] md:blur-[80px] blur-[50px] rounded-full  z-10 ">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[321px] md:h-[321px] w-[150px] h-[150px] bg-white rounded-full   "></div>
      </div>
      <div className="flex z-20 justify-center items-start  flex-col lg:w-[50%] lg:mt-0 mt-10">
        <TurstedBy />
        <h1 className="lg:text-[72px] lg:leading-[90px] text-[48px] leading-[56px] font-[500] text-white poppins md:text-left text-center lg:mt-4 mt-3">
          Scaling Your Online Growth
        </h1>
        <p className="text-white text-[14px] font-[400] md:text-[16px] opensans text-center md:text-left lg:mt-6 mt-6 mb-10">
          Montage Motion is a creative ad agency specializing in influencer
          marketing, video editing , thumbnails, content strategy, visual
          design, web design, and content marketing.
        </p>
        <div className="w-full flex md:flex-row flex-col gap-3">
          <button className="md:w-[155px] w-full  h-[48px] btn-color text-black py-4 px-5 rounded-[16px] flex justify-center items-center font-popins font-[400]">
            Start a project
          </button>
          <button
            style={{}}
            className="md:w-[155px] w-full h-[48px] btn-secondary text-white py-4 px-5 rounded-[16px] flex justify-center items-center font-popins font-[400]"
          >
            Book a Call
          </button>
        </div>
      </div>
      <div
        className="relative  z-20  lg:w-[50%] p-5 flex justify-center items-center"
        ref={sectionRef}
      >
        <div
          ref={smalButton}
          className="state-box w-[142px] h-[104px] absolute left-5 top-[88px] z-10"
        ></div>
        <div
          ref={bottomBoxRef}
          className="max-w-[465px] max-h-[340px] w-full h-full state-box"
        >
          <Image
            src={"/assets/herothumbnail.png"}
            alt="hero thubnail"
            width={435}
            height={260}
          />
          <button className="flex justify-center items-center w-full mt-4">
            {" "}
            <p className="text-[#1FB5DD] ">Watch The Video</p>
            <Image alt="right-arrow" src={arrow} width={14} height={14} />
          </button>
        </div>
        <div
          ref={smalButton}
          className="state-box w-[114px] h-[104px] absolute -bottom-4 left-7 "
        ></div>
        <div
          ref={smalButton}
          className="state-box w-[112px] h-[104px] absolute top-32 right-10"
        ></div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col lg:flex-row lg:justify-between items-center container mx-auto px-4 sm:px-6 lg:px-[60px] overflow-hidden relative lg:h-[564px] h-[780px] lg:gap-4 gap-4">
      {/* Left Content Skeleton */}
      <div className="flex z-20 justify-center items-start flex-col lg:w-1/2 lg:mt-0 mt-10">
        {/* TrustedBy Placeholder */}
        <div className="h-6 w-32 bg-gray-300 rounded animate-pulse mb-4"></div>
        {/* Heading Placeholder */}
        <div className="lg:w-[80%] w-full h-16 lg:h-24 bg-gray-300 rounded animate-pulse md:text-left text-center lg:mt-4 mt-3"></div>
        {/* Paragraph Placeholder */}
        <div className="lg:w-[90%] w-full h-20 bg-gray-300 rounded animate-pulse mt-6 mb-10"></div>
        {/* Buttons Placeholder */}
        <div className="w-full flex flex-col md:flex-row gap-3">
          <div className="md:w-[155px] w-full h-[48px] bg-gray-300 rounded-2xl animate-pulse"></div>
          <div className="md:w-[155px] w-full h-[48px] bg-gray-300 rounded-2xl animate-pulse"></div>
        </div>
      </div>

      {/* Right Content Skeleton */}
      <div className="relative z-20 lg:w-1/2 p-5 flex justify-center items-center">
        {/* State-box Placeholder 1 */}
        <div className="w-[142px] h-[104px] absolute left-5 top-[88px] z-10 bg-gray-200 rounded animate-pulse"></div>
        {/* Image Placeholder */}
        <div className="max-w-[465px] max-h-[340px] w-full h-full bg-gray-300 rounded animate-pulse">
          {/* Watch Video Button Placeholder */}
          <div className="flex justify-center h-[340px] items-center w-full mt-4 gap-2">
            <div className="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>
        {/* State-box Placeholder 2 */}
        <div className="w-[114px] h-[104px] absolute -bottom-4 left-7 bg-gray-200 rounded animate-pulse"></div>
        {/* State-box Placeholder 3 */}
        <div className="w-[112px] h-[104px] absolute top-32 right-10 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default Header;
