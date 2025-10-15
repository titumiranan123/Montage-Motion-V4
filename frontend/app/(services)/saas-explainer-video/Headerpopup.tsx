"use client";
import ReactPlayer from "react-player";
import Image from "next/image";
import React from "react";

const Headerpopup = () => {
  return (
    <>
      <div>
        <div className="relative max-w-[560px] mx-auto max-h-[334px] rounded-[31px] w-full h-full aspect-video bg-black overhidden">
          <ReactPlayer
            src={"https://youtu.be/0andrjUqeQk?si=7M59WgGye8hjOQQz"}
            playing={true}
            light={"/assets/herothumbnail.png"}
            playIcon={
              <Image
                src="/assets/playbutton.png"
                width={80}
                height={80}
                alt="Play"
                className="z-10"
                priority
              />
            }
            width="100%"
            height="100%"
            controls
          />

          {/* Fallback for when JS is disabled */}
          <noscript>
            <div className="relative max-w-[560px] mx-auto max-h-[334px]w-full h-full aspect-video bg-slate-500 overhidden rounded-[39px] mt-7 lg:mt-16 flex justify-center items-center animate-pulse duration-100">
              <Image
                src="/assets/playbutton.png"
                width={80}
                height={80}
                alt="Play"
                className="z-10"
                priority
              />
            </div>
          </noscript>
        </div>
      </div>
    </>
  );
};

export default Headerpopup;
