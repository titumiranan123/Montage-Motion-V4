import TurstedBy from "@/component/home/TurstedBy";
import Image from "next/image";
import React from "react";

const CareersHeader = () => {
  return (
    <div className="relative">
      <div className="flex justify-center items-center flex-col  max-w-[620px] w-full mx-auto lg:min-h-[70vh] lg:mt-14 mt-20 lg:px-0 px-4">
        <TurstedBy isCenter={true} />
        <h2 className="text-white poppins text-[42px] md:text-[64px] font-[500] lg:text-[64px] text-center lg:leading-[81px]">
          Your Creativity, Our Platform
        </h2>
        <p className="text-[#C0C9EA] font-[400] text-[14px] md:text-[16px] opensans text-center mt-4 md:mt-6">
          Step into a team where your ideas matter and your skills grow. At
          Montage Motion, we empower creators to innovate, collaborate, and make
          digital content that truly stands out.
        </p>
        <button className="md:w-[255px] w-full  h-[48px] btn-color text-black py-4 px-5 rounded-[16px] flex justify-center items-center poppins font-[500] lg:mt-10 mt-8">
          See Open Positions
        </button>
      </div>
      <Image
        src={"/assets/career/user-1.png"}
        alt="user-1"
        className="absolute top-[10%] right-[20%] lg:block hidden"
        width={92}
        height={92}
      />
      <Image
        src={"/assets/career/user-2.png"}
        alt="user-2"
        className="absolute top-[10%] left-[20%] lg:block hidden"
        width={92}
        height={92}
      />
      <Image
        src={"/assets/career/user-3.png"}
        alt="user-3"
        className="absolute top-[72%] right-[12%] lg:block hidden"
        width={92}
        height={92}
      />
      <Image
        src={"/assets/career/user-4.png"}
        alt="user-4"
        className="absolute top-[72%] left-[12%] lg:block hidden"
        width={92}
        height={92}
      />
      <Image
        src={"/assets/career/user-5.png"}
        alt="user-5"
        className="absolute top-[80%] right-[30%] lg:block hidden"
        width={55}
        height={55}
      />
      <Image
        src={"/assets/career/user-6.png"}
        alt="user-6"
        className="absolute top-[80%] left-[30%] lg:block hidden"
        width={55}
        height={55}
      />
    </div>
  );
};

export default CareersHeader;
