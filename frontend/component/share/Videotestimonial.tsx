import Image from "next/image";
import React from "react";
import ReactPlayer from "react-player";

interface Testimonial {
  id?: string;
  name: string;
  designation: string;
  image: string;
  thumbnail?: string;
  video_message?: string;
  message?: string;
  position?: number;
  category: "message" | "video_message";
  type:
    | "main"
    | "shorts"
    | "talking"
    | "podcast"
    | "graphic"
    | "advertising"
    | "website";
}

const TestimonialVideocard = ({
  testimonial,
  onPlay,
  onPause,
  onEnded,
  onClick,
}: {
  testimonial: Testimonial;
  onPlay: () => void;
  onClick: () => void;
  onPause: () => void;
  onEnded: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="md:w-[310px] w-[300px] mx-auto h-[613px] p-3 rounded-[18px] flex flex-col gap-4"
      style={{ boxShadow: "0px 4px 60px 0px #1FB5DD29 inset" }}
    >
      {/* Video Player Section */}
      <div className="w-full h-[490px] rounded-[13px] overflow-hidden relative">
        <ReactPlayer
          light={testimonial?.thumbnail ?? true}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          playIcon={
            <div className="flex items-center justify-center w-[68px] h-[48px]">
              <Image
                src="/small.png"
                width={68}
                height={48}
                alt="Play"
                className=""
                priority
              />
            </div>
          }
          src={testimonial.video_message}
          height={"100%"}
          width={"100%"}
          controls
        />
      </div>

      {/* Profile Info Section */}
      <div className="flex items-center gap-4 mt-2">
        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
          <Image
            src={testimonial.image}
            alt={`${testimonial.name}'s profile`}
            fill
            className="object-cover"
            quality={85}
            priority
          />
        </div>
        <div className="text-white">
          <h3 className="text-[20px] font-bold leading-tight">
            {testimonial.name}
          </h3>
          <p className="text-[14px] font-[400] ">{testimonial.designation}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialVideocard;
