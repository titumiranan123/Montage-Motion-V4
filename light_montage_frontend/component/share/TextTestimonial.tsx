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
  type:
    | "main"
    | "shorts"
    | "talking"
    | "podcast"
    | "graphic"
    | "advertising"
    | "website";
}
const TestimonialMessagecard = ({
  testimonial,
}: {
  testimonial: testimonial;
}) => {
  return (
    <div className="md:w-[588px] w-[300px]  h-[299px] mx-auto p-3 pills rounded-3xl backdrop-blur-lg">
      <div
        // style={{ boxShadow: "0px 4px 60px 0px #1FB5DD29 inset" }}
        className=" md:p-4  w-full h-auto p-4  flex flex-col gap-4"
      >
        <Image
          className=" w-10  h-10 "
          src={`/assets/comma.png`}
          alt=""
          width={40}
          height={40}
          priority
        />

        <p
          className=" text-(--text-primary)  opensans h-[95px] w-[95%] duration-300 delay-100 transition-all ease-in-out overflow-hidden hover:overflow-y-scroll"
          title={`${testimonial.message}`}
        >
          {testimonial.message}
        </p>
        <div className="flex justify-start gap-10 h-[90px] items-center">
          <Image
            className="rounded-full w-16  mt-5 h-16 overflow-hidden"
            src={testimonial.image}
            alt=""
            width={64}
            height={64}
            priority
          />
          <div className="  text-(--text-primary)  flex flex-col md:gap-4 gap-2">
            <h2 className="font-bold text-[20px] poppins">
              {testimonial.name}
            </h2>
            <p className="text-[14px] font-normal md:-mt-5 opensans">
              {testimonial.designation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialMessagecard;
