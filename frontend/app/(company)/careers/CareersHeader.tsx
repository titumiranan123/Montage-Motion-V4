import TurstedBy from "@/component/home/TurstedBy";
import Image from "next/image";
import React from "react";

const CareersHeader = () => {
  return (
    <div className="  rounded-xl md:rounded-[40px]   overflow-hidden lg:h-screen pt-14 relative">
      <div className="bg-[#1FB5DD] w-150 h-150 absolute xl:-top-1 xl:-right-106.75 -top-53.75 -right-145 blur-[70px] xl:blur-[205px]  "></div>
      <div className="bg-[#1FB5DD] w-150 h-150 absolute xl:-top-1 xl:-left-106.75 -top-53.75 -left-145 xl:blur-[185px] blur-[70px] "></div>
      <div
        style={{ zIndex: 50 }}
        className="flex justify-center items-center flex-col  max-w-155 w-full mx-auto lg:min-h-[70vh] lg:mt-14 mt-20 lg:px-0 px-4"
      >
        <TurstedBy isCenter={true} />
        <h1
          data-aos="fade-up"
          data-aos-delay={100}
          className="text-(--text-primary) poppins text-[42px] md:text-[64px] font-medium lg:text-[64px] text-center lg:leading-20.25"
        >
          Your Creativity, Our Platform
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay={200}
          className="text-(--text-primary) font-normal text-[14px] md:text-[16px] opensans text-center mt-4 md:mt-6"
        >
          Step into a team where your ideas matter and your skills grow. At
          Montage Motion, we empower creators to innovate, collaborate, and make
          digital content that truly stands out.
        </p>
        <a
          href="#open-position"
          data-aos="fade-up"
          data-aos-delay={300}
          type="submit"
          className="md:w-63.75 w-55  h-12 btn-color text-(--text-primary) py-4 px-5 rounded-2xl flex justify-center items-center poppins font-medium lg:mt-10 mt-8"
        >
          See Open Positions
        </a>
      </div>
      <Image
        src={"/assets/career/user-1.png"}
        alt="user-1"
        className="absolute top-[19%] right-[20%] lg:block hidden"
        width={92}
        height={92}
        data-aos="fade-in"
        data-aos-delay={100}
      />
      <Image
        src={"/assets/career/user-2.png"}
        alt="user-2"
        className="absolute top-[19%] left-[20%] lg:block hidden"
        width={92}
        height={92}
        data-aos="fade-in"
        data-aos-delay={150}
      />
      <Image
        src={"/assets/career/user-3.png"}
        alt="user-3"
        className="absolute top-[72%] right-[12%] lg:block hidden"
        width={92}
        height={92}
        data-aos="fade-in"
        data-aos-delay={200}
      />
      <Image
        src={"/assets/career/user-4.png"}
        alt="user-4"
        className="absolute top-[72%] left-[12%] lg:block hidden"
        width={92}
        height={92}
        data-aos="fade-in"
        data-aos-delay={250}
      />
      <Image
        src={"/assets/career/user-5.png"}
        alt="user-5"
        className="absolute top-[80%] right-[30%] lg:block hidden"
        width={55}
        height={55}
        data-aos="fade-in"
        data-aos-delay={300}
      />
      <Image
        src={"/assets/career/user-6.png"}
        alt="user-6"
        className="absolute top-[80%] left-[30%] lg:block hidden"
        width={55}
        height={55}
        data-aos="fade-in"
        data-aos-delay={350}
      />
    </div>
  );
};

export default CareersHeader;
