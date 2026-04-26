/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const PartnersSection = ({ data }: { data: any[] }) => {
  return (
    <section
      data-aos="fade-up"
      data-aos-delay={500}
      className="relative w-full mt-10 max-w-7xl px-6 mx-auto py-6 overflow-hidden"
    >
      <div className="mx-auto w-full flex flex-col items-center justify-center">
        <Marquee
          pauseOnHover
          speed={50}
          gradient
          gradientWidth={100}
          className="flex items-center"
        >
          {data?.map((partner, index) => (
            <div
              key={partner.id || index}
              className="lg:mx-6 mx-4 pointer-events-none select-none flex items-center justify-center"
            >
              <div
                className="relative  w-auto"
                style={{
                  backgroundColor: partner?.bg || "transparent",
                  aspectRatio: "auto",
                }}
              >
                <Image
                  src={partner?.image}
                  alt={partner?.alt || `Partner logo ${index + 1}`}
                  height={40}          // ← fixed 40px height
                  width={180}          // ← width auto adjust হবে
                  className="rounded-lg select-none object-contain h-auto w-auto "
                  loading="lazy"
                  style={{
                    height: "70px",    // ← globally max 40px
                    width: "auto",     // ← aspect ratio বজায় থাকবে
                  }}
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnersSection;