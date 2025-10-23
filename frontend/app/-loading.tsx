"use client";
import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="fixed inset-0 bg-black/10 backdrop-blur-lg w-screen h-screen flex justify-center items-center"
    >
      <Image
        src="/assets/montagelogo.png"
        alt="logo"
        width={150}
        height={60}
        priority
        className="duration-300 transition-all ease-in-out animate-pulse"
      />
    </div>
  );
}
