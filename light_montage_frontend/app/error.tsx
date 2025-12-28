"use client";
import Navbar from "@/component/share/Navbar";
import React from "react";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="headerbg rounded-[40px] max-w-full px-[60px]  mx-auto">
        <style>
          {`
            .headerbg {
              background: linear-gradient(180deg, #EAF0F7 30.22%, #69CDE8 100%); }
.candly {
  background: linear-gradient(180deg, #E9F8FC 0%, #F6FDFF 100%);
  
}
           
            `}
        </style>
        <Navbar />
        <div className="pb-[60px] pt-20 ">
          <h2 className="lg:text-[244px] text-[140px]  text-(--text-primary) ">
            404
          </h2>
        </div>
      </div>
    </div>
  );
}
