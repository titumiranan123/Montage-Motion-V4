"use client";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";

const Headervideopop: React.FC<{ thumbnail: string; link: string }> = ({
  thumbnail,
  link,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Create a portal target (for Next.js, this ensures proper client rendering)
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Thumbnail Section */}
      <div className="md:max-w-[465px] max-w-[311px] max-h-[227px] md:max-h-[340px] w-full h-full state-box">
        <CardContainer className="inter-var">
          <CardBody className="md:w-[445px] md:h-[260px] w-full h-full relative group/card border-black/[0.1] rounded-xl border">
            <CardItem
              translateZ="100"
              rotateX={20}
              rotateZ={-10}
              className="w-full"
            >
              <Image
                onClick={() => setIsOpen(true)}
                src={thumbnail}
                alt="hero thumbnail"
                width={435}
                height={260}
                className="cursor-pointer"
              />
            </CardItem>
          </CardBody>
        </CardContainer>

        <button
          onClick={() => setIsOpen(true)}
          className="flex justify-center items-center w-full mt-4"
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
      </div>

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
};

export default Headervideopop;
