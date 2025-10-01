import Image from "next/image";
import React from "react";

const TurstedBy = () => {
  return (
    <div className="flex items-center justify-center md:justify-start w-full text-white gap-5">
      <div className="flex w-[70px] h-[20px] items-center  -space-x-[6px]">
        <Image
          src={"/assets/hero_client-1.png"}
          alt="image-1"
          className="w-6 h-6"
          width={24}
          height={24}
        />
        <Image
          src={"/assets/hero_client-2.png"}
          alt="image-1"
          className="w-6 h-6"
          width={24}
          height={24}
        />
        <Image
          src={"/assets/hero_client-3.png"}
          alt="image-1"
          className="w-6 h-6"
          width={24}
          height={24}
        />
        <Image
          src={"/assets/hero_client-4.png"}
          alt="image-1"
          className="w-6 h-6"
          width={24}
          height={24}
        />
      </div>
      <p className="opensans text-[14px] font-[400]">
        Trusted by 1000+ clients
      </p>
    </div>
  );
};

export default TurstedBy;
