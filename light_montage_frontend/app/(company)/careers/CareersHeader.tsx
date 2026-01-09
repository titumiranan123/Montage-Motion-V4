import TurstedBy from "@/component/home/TurstedBy";
import Image from "next/image";
import React from "react";

const CareersHeader = () => {
  return (
    <div className="relative max-w-[1440px] py-20 rounded-xl md:rounded-[40px]  mx-auto lg:pt-28 pt-20 overflow-hidden">
      <div className="bg-[#1FB5DD] w-[689px] h-[689px] absolute xl:-top-[255px] xl:-right-[427px] -top-[175px] -right-[680px] blur-[70px] xl:blur-[205px]  "></div>
      <div className="bg-[#1FB5DD] w-[689px] h-[689px] absolute xl:-top-[255px] xl:-left-[427px] -top-[175px] -left-[680px] xl:blur-[205px] blur-[70px] "></div>
      <div
        style={{ zIndex: 50 }}
        className="flex justify-center items-center flex-col  max-w-[620px] w-full mx-auto lg:min-h-[70vh] lg:mt-14 mt-20 lg:px-0 px-4"
      >
        <TurstedBy isCenter={true} />
        <h2
          data-aos="fade-up"
          data-aos-delay={100}
          className="text-(--text-primary) poppins text-[42px] md:text-[64px] font-medium lg:text-[64px] text-center lg:leading-[81px]"
        >
          Your Creativity, Our Platform
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay={200}
          className="text-(--text-primary) font-normal text-[14px] md:text-[16px] opensans text-center mt-4 md:mt-6"
        >
          Step into a team where your ideas matter and your skills grow. At
          Montage Motion, we empower creators to innovate, collaborate, and make
          digital content that truly stands out.
        </p>
        <button
          // data-aos="fade-up"
          // data-aos-delay={300}
          type="submit"
          className="md:w-[255px] w-[220px]  h-12 btn-color text-(--text-primary) py-4 px-5 rounded-2xl flex justify-center items-center poppins font-medium lg:mt-10 mt-8"
        >
          See Open Positions
        </button>
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
