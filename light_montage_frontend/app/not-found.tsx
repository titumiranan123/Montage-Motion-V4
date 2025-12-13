"use client";

import Navbar from "@/component/share/Navbar";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="headerbg h-screen rounded-[40px] max-w-[1440px] px-[60px] mx-auto">
      <style>
        {`
          .headerbg {
            background: linear-gradient(180deg, #EAF0F7 30.22%, #69CDE8 100%);
          }
          .candly {
            background: linear-gradient(180deg, #E9F8FC 0%, #F6FDFF 100%);
          }
        `}
      </style>

      <Navbar />

      <div className="pb-[60px] f pt-24">
        {/* 404 */}
        <h2 className="lg:text-[244px] text-[140px] font-extrabold tracking-tight leading-none text-(--text-primary)">
          404
        </h2>

        {/* Title */}
        <h3 className="mt-6 text-3xl font-semibold tracking-tight text-(--text-primary)">
          Page Not Found
        </h3>

        {/* Description */}
        <p className="mt-3 max-w-[560px] text-base leading-relaxed text-gray-600">
          Sorry, the page you are looking for doesn’t exist, has been removed,
          or the URL might be incorrect.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center justify-center mt-8 px-7 py-3
                     rounded-lg  text-lg font-medium
                     text-(--text-primary)  btn-color"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
