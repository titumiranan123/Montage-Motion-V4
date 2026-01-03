"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import Gradientcard from "../share/Gradientcard";
import { Heading } from "../share/Headering";
import Link from "next/link";

const ServiceSections = ({ data }: { data: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        subtitle={
          data?.paragraph
            ? data?.paragraph
            : "Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
        }
        title={
          data?.heading_part1
            ? data?.heading_part1
            : "Cat't Standout ? Let Us Help You."
        }
        tag={data?.tag ? data?.tag : "Our Services"}
      />
      <div className="lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.services?.map((dt: any, idx: number) => (
          <div key={idx} className="group  min-h-[500px]">
            <style jsx>{`
              .card3d {
                position: relative;
                width: 100%;
                height: 100%;
                transform-style: preserve-3d;
                transition: transform 0.8s
                  cubic-bezier(0.175, 0.885, 0.32, 1.275);
                transform-origin: center center;
              }
              .group:hover .card3d {
                transform: rotateY(180deg);
              }
              .card3d-front,
              .card3d-back {
                position: absolute;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
                border-radius: 24px;
                overflow: hidden;
              }

              .card3d-back {
                transform: rotateY(180deg);
              }
            `}</style>

            <div className="card3d">
              {/* Front side */}
              <div className="card3d-front">
                <div className="text-(--text-primary) flex justify-center items-start flex-col py-6 px-5 h-full bg-[#F7F7F7] rounded-3xl">
                  <h2 className="md:text-[24px] text-[20px] poppins font-semibold transition-transform duration-300 ease-out group-hover:-translate-y-1">
                    {dt?.service_title}
                  </h2>
                  <p className="md:text-[16px] text-[14px] font-normal leading-[140%] text-(--text-primary) mt-2 opensans transition-transform duration-300 ease-out group-hover:-translate-y-1 delay-75">
                    {dt?.service_description}
                  </p>
                  <div className="mt-auto w-full">
                    <Image
                      src={dt?.image}
                      alt={dt?.alt}
                      width={344}
                      height={276}
                      priority
                      className="max-w-[344px] w-full max-h-[276px] h-full md:mt-8 mt-4 transition-transform duration-300 ease-out group-hover:-translate-y-1 delay-100"
                    />
                  </div>
                </div>
              </div>

              {/* Back side */}
              <div className="card3d-back">
                <Gradientcard
                  className="w-full h-full md:py-6 py-4 md:px-5 px-4 bg-white flex flex-col justify-center rounded-3xl"
                  borderClassName="w-full h-full rounded-[24px] p-[1px] animated !duration-100"
                >
                  <div className="flex justify-between items-start flex-col text-(--text-primary) gap-[111px] h-full">
                    <div>
                      <Image
                        src={dt?.icon}
                        alt={dt?.icon_alt ?? ""}
                        width={35}
                        height={35}
                        priority
                        className="transform group-hover:rotate-12 transition-transform duration-500 ease-out"
                      />
                      <p className="text-[24px] leading-[100%] md:text-[24px] font-semibold poppins mt-2 text-(--text-primary) group-hover:translate-x-1 transition-transform duration-300 ease-out">
                        {dt?.service_title}
                      </p>
                    </div>
                    <p className="text-[14px] md:text-[16px] font-normal opensans text-(--text-secondary) leading-[140%] group-hover:scale-105 transition-transform duration-300 ease-out">
                      {dt?.service_description}
                    </p>
                    <div className="flex justify-end items-center w-full">
                      <Link
                        href={`${dt?.href}`}
                        className="py-2 px-4 rounded-lg btn-color transform group-hover:scale-105 transition-transform duration-300 ease-out"
                      >
                        Get Start
                      </Link>
                    </div>
                  </div>
                </Gradientcard>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSections;
