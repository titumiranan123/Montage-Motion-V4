import Image from "next/image";
interface testimonial {
  id?: string;
  name: string;
  designation: string;
  image: string;
  video_message?: string;
  message?: string;
  position?: number;
  category: "message" | "video_message";
  type: string;
}
const TestimonialMessagecard = ({
  testimonial,
  idx = 1
}: {
  testimonial: testimonial;
  idx?:number
}) => {
  return (
    <div className="md:w-114.5 w-75  h-74.75 mx-auto p-3 glassShadow  bg-white/40  backdrop-blur-sm rounded-3xl">
      <div
        // style={{ boxShadow: "0px 4px 60px 0px #1FB5DD29 inset" }}
        className=" md:p-4  w-full h-auto p-4  flex flex-col gap-4"
      >
        <Image
          className=" w-10  h-10 "
          src={`/assets/comma.png`}
          alt={`comma- ${idx}`}
          width={40}
          height={40}
          priority
        />

        <p
          className=" text-(--text-primary)  opensans h-23.75 w-[95%] duration-300 delay-100 transition-all ease-in-out overflow-hidden hover:overflow-y-scroll"
          title={`${testimonial.message}`}
        >
          {testimonial.message}
        </p>
        <div className="flex justify-start gap-10 h-22.5 items-center">
          <div className="lg:w-16   overflow-hidden lg:h-16 h-10 w-10">
            <Image
              className="rounded-full lg:w-16   lg:h-16 h-10 w-10 "
              src={testimonial.image}
              alt={`${testimonial.name}`}
              width={64}
              height={64}
              priority
            />
          </div>
          <div className="  text-(--text-primary)  flex flex-col md:gap-4 gap-0">
            <h3 className="font-bold text-base lg:text-[20px] poppins">
              {testimonial.name}
            </h3>
            <p className="lg:text-[14px] text-xs font-normal md:-mt-3 opensans">
              {testimonial.designation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialMessagecard;
