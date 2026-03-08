/* eslint-disable @typescript-eslint/no-explicit-any */
import { Play } from "lucide-react";
import Image from "next/image";
import ReactPlayer from "react-player";

const TestimonialVideocard = ({ testimonial }: { testimonial: any }) => {
  return (
    <div className="md:w-102.5  w-75  h-197.75 mx-auto md:p-6 p-1 rounded-3xl  flex flex-col  gap-4 glassShadow  bg-white/40  backdrop-blur-2xl">
      {/* Video Player Section */}
      <div className="md:w-[355.67px] h-[660.43px] rounded-[13px] overflow-hidden relative">
        <ReactPlayer
          light={testimonial?.thumbnail ?? true}
          playIcon={
            <button className="w-16 absolute top-[42%] left-[44%] flex justify-center items-center rounded-xl h-10 text-white backdrop-blur-sm  st group">
              <Play
                fill="#fff"
                className="group-hover:scale-105 active:scale-90 duration-200 ease-in-out"
              />
            </button>
          }
          url={testimonial.video_message}
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
            className="object-cover"
            width={64}
            height={64}
            priority
          />
        </div>
        <div className=" text-(--text-primary) ">
          <h3 className="text-[20px] font-bold leading-tight poppins">
            {testimonial.name}
          </h3>
          <p className="text-[14px] font-normal opensans ">
            {testimonial.designation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialVideocard;
