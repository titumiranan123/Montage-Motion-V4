"use client";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

const PartnersSection = ({ data }: { data: any[] }) => {
  return (
    <section
      data-aos="fade-up"
      data-aos-delay={500}
      className="relative w-full bg-black py-6 overflow-hidden"
    >
      <div className="container mx-auto flex flex-col items-center justify-center">
        <Marquee
          pauseOnHover
          speed={50}
          gradient
          gradientColor="black"
          gradientWidth={100}
          className="flex items-center"
        >
          {data.map((partner, index) => (
            <div
              key={partner.id || index}
              className="mx-[40px] flex items-center justify-center h-[40px]"
            >
              <img
                src={partner.image}
                alt={partner.alt || `Partner logo ${index + 1}`}
                style={{
                  backgroundColor: partner.bg || "transparent",
                  width: partner.width || "auto",
                  height: partner.height || "40px",
                  maxWidth: "140px",
                  maxHeight: "40px",
                  objectFit: "contain",
                }}
                className="rounded-lg"
                loading="lazy"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnersSection;
