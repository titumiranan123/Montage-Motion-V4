"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import arrow from "@/public/assets/icon/arrow-right-01.png";
const Header = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bottomBoxRef = useRef<HTMLDivElement>(null);
  const smalButton = useRef<HTMLDivElement>(null);
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
  return (
    <div className="flex justify-between items-center mt-20 max-w-[1440px] mx-auto lg:px-[120px] px-[60px]">
      <div className="flex justify-center items-start gap-4 flex-col w-[50%]">
        <h1 className="text-[72px] font-[500] text-white">
          Scaling Your Online Growth
        </h1>
        <p className="text-white">
          Montage Motion is a creative ad agency specializing in influencer
          marketing, video editing , thumbnails, content strategy, visual
          design, web design, and content marketing.
        </p>
        <button className="w-[155px] h-[48px] btn-color text-black py-4 px-5 rounded-[16px] flex justify-center items-center font-popins font-[400]">
          Start a project
        </button>
      </div>
      <div
        ref={sectionRef}
        className="relative w-[50%] p-5 flex justify-center items-center"
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
  );
};

export default Header;
