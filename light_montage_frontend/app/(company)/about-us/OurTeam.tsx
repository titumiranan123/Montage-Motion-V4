"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading } from "@/component/share/Headering";
import Image from "next/image";
import React, { useState } from "react";

const OurTeam = ({ members }: any) => {
  const [index, setIndex] = useState(6);
  return (
    <div className="container teambg rounded-[42px] py-[60px] sectionGap">
      <style>
        {`
        .teambg {
          background:linear-gradient(180deg, #E9F8FC 8%, #F6FDFF 100%);
          
        }
        `}
      </style>
      <Heading
        subtitle="A passionate team of creators, strategists, and innovatiors working together to bring ideas to life."
        tag="Our Services"
        title="Meet the Minds Behind "
        extratitle="Montage Motion"
      />
      <div className="mt-8 lg:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4">
        {members?.slice(0, index)?.map((member: any, idx: number) => {
          return (
            <div key={idx} data-aos="fade-up" data-aos-delay={100 + idx * 100}>
              <div className="max-w-[410px] h-[530px] w-full rounded-2xl py-6 px-5 flex flex-col justify-center items-center glassShadow bg-white/40 backdrop-blur-2xl">
                <Image
                  src={member?.photourl}
                  alt={member?.name}
                  priority
                  className="max-w-[370px] max-h-[420px] w-full h-full bg-cover"
                  width={370}
                  height={420}
                />
                <div className="flex flex-col gap-2 w-full justify-start mt-4 text-(--text-primary)">
                  <h2 className="text-[20px] md:text-[24px] leading-[100%] font-semibold poppins">
                    {member?.name}
                  </h2>
                  <p className="text-[14px] md:text-[16px] leading-[140%] font-normal opensans">
                    {member?.designation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {members.length > index && (
        <div className="flex  justify-center items-center mt-10">
          <button
            onClick={() => setIndex(index + 3)}
            className="btn-color w-[131px] h-14 py-2 px-3 rounded-lg "
          >
            See More
          </button>
        </div>
      )}
      {members.length === index && (
        <div className="flex justify-center items-center mt-10">
          <button
            onClick={() => setIndex(index - 3)}
            className="btn-color py-2 px-3 rounded-lg w-[131px] h-14 "
          >
            See Less
          </button>
        </div>
      )}
    </div>
  );
};

export default OurTeam;
