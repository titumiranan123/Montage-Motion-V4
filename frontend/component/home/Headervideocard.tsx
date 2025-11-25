"use client";

import React, { useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import PluseIcon from "./PulseIcon/PluseIcon";
import Image from "next/image";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";

export function ThreeDCardDemo({
  thumbnail,
  link,
}: {
  thumbnail: string;
  link: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Create a portal target (for Next.js, this ensures proper client rendering)
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <CardContainer className="inter-var md:w-[475px]  w-[311px] h-[227px] md:h-[340px]  state-box">
        <CardBody className=" relative group/card    ">
          <CardItem
            translateZ="100"
            className="w-[435px] h-[260px] relative mt-10"
          >
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={435}
              height={260}
              className="cursor-pointer rounded-lg w-[435px] h-[260px]"
              alt="thumbnail"
            />
            <div
              onClick={() => setIsOpen(true)}
              className="absolute left-[45%] top-[40%]"
            >
              <PluseIcon />
            </div>
          </CardItem>
          <div className="flex justify-center items-center mt-0">
            <CardItem
              translateZ={20}
              as="a"
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white text-center"
            >
              <button
                onClick={() => setIsOpen(true)}
                className="flex justify-center items-center w-full mt-2"
              >
                <p className="text-[#1FB5DD] text-[14px] md:text-[16px] font-[600] ">
                  Watch The Video
                </p>
                <Image
                  alt="right-arrow"
                  src="/assets/icon/arrow-right-01.png"
                  width={14}
                  height={14}
                  className="ml-2"
                />
              </button>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
      {/* ✅ Global Portal Fullscreen Popup */}
      {mounted &&
        isOpen &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 w-screen h-screen bg-black/90 z-[9999] flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full max-w-[900px] max-h-[500px] rounded-lg overflow-hidden flex items-center justify-center"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 z-10 text-white text-2xl font-bold w-8 h-8 flex items-center justify-center bg-black/60 rounded-full hover:bg-red-500 transition"
              >
                ✕
              </button>

              <ReactPlayer
                src={link}
                playing
                controls
                width="100%"
                height="100%"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
