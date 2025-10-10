import Heading from "@/component/share/Headering";
import Image from "next/image";
import React from "react";

const Locationsection = () => {
  return (
    <div className="relative sectionGap">
      <Heading
        tag="Our Location"
        title="Visit Our Office"
        subtitle="Let's connect where ideas trun into visuals, Drop by and meet the team behind Montage Motion"
      />
      <div className="max-w-[1055px] w-full max-h-[758px] h-full mt-10 lg:mt-20 mx-auto">
        <Image
          src={"/assets/location.png"}
          alt="location"
          priority
          title="House #12, Road #3, Mirpur DOHS, Dhaka, Bangladesh"
          width={1055}
          height={578}
          className="max-w-[1055px] w-full max-h-[758px] h-full mt-10 lg:mt-20"
        />
      </div>
    </div>
  );
};

export default Locationsection;
