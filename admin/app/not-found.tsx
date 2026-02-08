"use client";

import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center relative bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: "url(/assets/logobackgourd.png)" }}
    >
      <h2 className="text-[244px]  text-white font-bold leading-none">404</h2>

      <div
        className="absolute ohNo  
                      lg:w-147.5 w-[90%] h-70 bg-black/18 backdrop-blur-xl rounded-2xl 
                      flex flex-col justify-center items-center text-white text-center p-6"
      >
        <h3 className="font-medium text-3xl md:text-[32px] font-poppins mb-2">
          Oh No! This page doesn&apos;t exist
        </h3>
        <p className="text-lg opacity-90">Please go to home page</p>
        <Link
          href="/"
          className="w-45 h-14 rounded-2xl flex items-center justify-center 
                    font-montserrat font-semibold text-base bg-[#25AAE1] hover:bg-[#1e8fc0] 
                    transition-colors duration-300 mt-6"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}
