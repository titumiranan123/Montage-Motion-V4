import Image from "next/image";
import React from "react";

const TurstedBy = ({ isCenter }: { isCenter?: boolean }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={100}
      className={`flex items-center ${
        isCenter
          ? "justify-center md:justify-center"
          : "justify-center md:justify-start"
      }  w-full  text-(--text-primary)  gap-5`}
    >
      <div className="flex w-[70px] h-5 items-center  -space-x-1.5">
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
      <p className="opensans text-[12px] font-normal">
        Trusted by 1000+ clients
      </p>
    </div>
  );
};

export default TurstedBy;
