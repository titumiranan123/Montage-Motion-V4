"use client";
import React from "react";
import Marquee from "react-fast-marquee";

const PatnersSection = () => {
  const partners = [
    { image: "/assets/patner/amzon.png", width: 95, height: 29, bg: "" },
    { image: "/assets/patner/guci.png", width: 33, height: 33, bg: "#ffffff" },
    { image: "/assets/patner/honor.png", width: 155, height: 32, bg: "" },
    { image: "/assets/patner/oppo.png", width: 151, height: 36, bg: "" },
    { image: "/assets/patner/rfl.png", width: 36, height: 36, bg: "" },
    { image: "/assets/patner/parn.png", width: 58, height: 36, bg: "" },
    { image: "/assets/patner/airtel.png", width: 108, height: 36, bg: "" },
    { image: "/assets/patner/nogad.png", width: 82, height: 36, bg: "" },
  ];

  return (
    <section className="relative w-full bg-black py-10 overflow-hidden">
      <div className="container mx-auto flex flex-col items-center justify-center">
        {/* Animated Marquee */}
        <Marquee pauseOnHover speed={50} gradient gradientColor={"#000"}>
          {partners.map((partner, index) => (
            <div
              key={index}
              className="mx-[30px] flex items-center justify-center"
            >
              <img
                src={partner.image}
                alt={`Partner logo ${index + 1}`}
                width={partner.width}
                height={partner.height}
                style={{
                  backgroundColor: partner.bg || "transparent",
                }}
                className="object-contain max-h-20 rounded-lg"
                loading="lazy"
              />
            </div>
          ))}
        </Marquee>

        {/* Fallback for JS-disabled browsers */}
        <noscript>
          <div className="flex flex-wrap justify-center items-center gap-10 mt-6">
            {partners.map((partner, index) => (
              <img
                key={index}
                src={partner.image}
                alt={`Partner logo ${index + 1}`}
                width={partner.width}
                height={partner.height}
                style={{
                  backgroundColor: partner.bg || "transparent",
                }}
                className="object-contain max-h-10"
              />
            ))}
          </div>
        </noscript>
      </div>
    </section>
  );
};

export default PatnersSection;
