/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const PartnersSection = ({ data }: { data: any[] }) => {
  return (
    <section
      // data-aos="fade-up"
      // data-aos-delay={500}
      className="relative w-full bg-white container py-6 overflow-hidden"
    >
      <div className=" mx-auto w-full flex flex-col items-center justify-center">
        <Marquee
          pauseOnHover
          speed={50}
          gradient
          gradientWidth={100}
          className="flex items-center"
        >
          {data.map((partner, index) => (
            <div
              key={partner.id || index}
              className="mx-10 pointer-events-none select-none flex items-center justify-center h-10"
            >
              <Image
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
                className="rounded-lg select-none"
                loading="lazy"
                width={140}
                height={40}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnersSection;
