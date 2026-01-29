import Image from "next/image";
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
}: {
  testimonial: Testimonial;
}) => {
  return (
    <div className="md:w-[410px]  w-[300px]  h-[791px] mx-auto p-6 rounded-3xl  flex flex-col  gap-4 glassShadow  bg-white/40  backdrop-blur-2xl">
      {/* Video Player Section */}
      <div className="md:w-[355.67px] h-[660.43px] rounded-[13px] overflow-hidden relative">
        <ReactPlayer
          light={testimonial?.thumbnail ?? true}
          playIcon={
            <div className="flex items-center justify-center w-[68px] h-12">
              <Image
                src="/assets/icon/playsmall.png"
                width={68}
                height={48}
                alt="Play"
                className=""
                priority
              />
            </div>
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
