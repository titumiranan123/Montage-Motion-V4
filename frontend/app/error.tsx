"use client";
import Link from "next/link";
import React from "react";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="lg:text-[244px] text-[140px] text-white">404</h2>
      <div className="card lg:w-[590px]   h-[280px] bg-black/18 backdrop-blur-xl  rounded-[16px] flex flex-col justify-center items-center text-white ">
        <h3 className="font-[500] text-[32px] font-poppins">
          Oh No! This page doesn't exist
        </h3>
        <p className="mt-1">Please go to home page</p>
        <Link
          href={"/"}
          className="w-[180px] h-[56px] rounded-[16px] p-5 font-montserrat font-[600] text-[16px] block bg-[#25AAE1] mt-4 "
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}
