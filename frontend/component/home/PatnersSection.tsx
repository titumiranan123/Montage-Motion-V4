"use client";
import React from "react";
import Marquee from "react-fast-marquee";

const PatnersSection = () => {
  const data = [
    { image: "/assets/patner/amzon.png", width: 95, height: 29 },
    { image: "/assets/patner/guci.png", width: 33, height: 33 },
    { image: "/assets/patner/honor.png", width: 155, height: 32 },
    { image: "/assets/patner/oppo.png", width: 151, height: 36 },
    { image: "/assets/patner/rfl.png", width: 36, height: 36 },
    { image: "/assets/patner/parn.png", width: 58, height: 36 },
    { image: "/assets/patner/airtel.png", width: 108, height: 36 },
    { image: "/assets/patner/nogad.png", width: 82, height: 36 },
  ];

  return (
    <div className="flex size-full items-center justify-center z-20 bg-black py-10 container">
      {/* Normal Marquee (when JS enabled) */}
      <Marquee
        pauseOnHover={true}
        gradient={true}
        gradientColor="#000"
        speed={50}
      >
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

      {/* Fallback for when JS is disabled */}
      <noscript>
        <div className="flex w-full overflow-hidden gap-10 items-center justify-center after:absolute relative after:max-w-[200px] after:w-full after:max-h-[60px] after:h-full after:bg-gradient-to-l after:from-black/2 after:to-black  after:top-0 after:left-0 after:content-['']  before:absolute  before:max-w-[200px] before:w-full before:max-h-[60px] before:h-full before:bg-gradient-to-l before:from-black/2 before:to-black  before:top-0 before:right-0 before:content-['']">
          {data.map((patner, index) => (
            <div key={index} className="flex items-center justify-center">
              <img
                src={patner.image}
                alt={`Partner ${index}`}
                width={patner.width}
                height={patner.height}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </noscript>
    </div>
  );
};

export default PatnersSection;
