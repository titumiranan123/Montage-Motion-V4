"use client";
import React from "react";
import Marquee from "react-fast-marquee";

const PatnersSection = () => {
  const data = [
    {
      image: "/assets/patner/amzon.png",
      width: 95,
      height: 29,
    },
    {
      image: "/assets/patner/guci.png",
      width: 33,
      height: 33,
    },
    {
      image: "/assets/patner/honor.png",
      width: 155,
      height: 32,
    },
    {
      image: "/assets/patner/oppo.png",
      width: 151,
      height: 36,
    },
    {
      image: "/assets/patner/rfl.png",
      width: 36,
      height: 36,
    },
    {
      image: "/assets/patner/parn.png",
      width: 58,
      height: 36,
    },
    {
      image: "/assets/patner/airtel.png",
      width: 108,
      height: 36,
    },
    {
      image: "/assets/patner/nogad.png",
      width: 82,
      height: 36,
    },
  ];

  return (
    <div className="flex size-full items-center justify-center bg-background py-6 mt-10">
      <Marquee pauseOnHover={true} gradient={false} speed={50}>
        {data.map((patner, index) => (
          <div key={index} className="mx-8 flex items-center justify-center">
            <img
              src={patner.image}
              alt={`Partner ${index}`}
              width={patner.width}
              height={patner.height}
              className="object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default PatnersSection;
