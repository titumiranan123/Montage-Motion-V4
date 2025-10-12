"use client";
import Image from "next/image";
import React, { useState } from "react";
import ReactPlayer from "react-player";
const Headervideopop: React.FC<{ thumbnail: string; link: string }> = ({
  thumbnail,
  link,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:max-w-[465px] max-w-[311px] max-h-[227px]  md:max-h-[340px] w-full h-full state-box">
        {/* Thumbnail */}
        <Image src={thumbnail} alt="hero thumbnail" width={435} height={260} />

        {/* Button */}
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

        {/* Fullscreen Popup */}
      </div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=" rounded-lg max-w-[759px] max-h-[430px] w-full overflow-hidden h-full flex items-center justify-center relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 z-10  hover:text-black text-lg cursor-pointer font-bold w-6 h-6 flex items-center justify-center bg-white text-red-500 rounded-full shadow-lg transition-all hover:scale-110"
            >
              ✕
            </button>

            <ReactPlayer
              src={link}
              width={"100%"}
              height={"100%"}
              playing={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Headervideopop;
