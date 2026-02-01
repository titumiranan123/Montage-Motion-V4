// app/global-error.tsx   ← এই পাথে রাখো
"use client";

import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Global Error:", error);
    toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
  }, [error]);

  // ডাইনামিক কনফিগারেশন — এররের উপর ভিত্তি করে চেঞ্জ হবে
  const getErrorConfig = () => {
    const msg = error.message.toLowerCase();

    if (
      msg.includes("সেশন") ||
      msg.includes("token") ||
      msg.includes("login")
    ) {
      return {
        code: "401",
        title: "Oh No! Your session has expired",
        description: "আপনার সেশনের মেয়াদ শেষ হয়ে গেছে। আবার লগিন করুন।",
        primaryButton: { text: "লগিন করুন", href: "/login" },
        showRetry: false,
      };
    }

    if (
      msg.includes("অনুমতি") ||
      msg.includes("forbidden") ||
      msg.includes("access")
    ) {
      return {
        code: "403",
        title: "Access Denied!",
        description: "এই পেজে আপনার প্রবেশের অনুমতি নেই।",
        primaryButton: { text: "হোমে যান", href: "/" },
        showRetry: true,
      };
    }

    if (msg.includes("not found") || msg.includes("পাওয়া যায়নি")) {
      return {
        code: "404",
        title: "Oh No! This page doesn't exist",
        description: "আপনি যে পেজ খুঁজছেন তা পাওয়া যায়নি।",
        primaryButton: { text: "হোমে যান", href: "/" },
        showRetry: false,
      };
    }

    // Default 500 or unknown error
    return {
      code: "500",
      title: "Oops! Something went wrong",
      description: "সার্ভারে একটা সমস্যা হয়েছে। আমরা ঠিক করে দিচ্ছি।",
      primaryButton: { text: "আবার চেষ্টা করুন", onClick: reset },
      secondaryButton: { text: "হোমে যান", href: "/" },
      showRetry: true,
    };
  };

  const config = getErrorConfig();

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center relative bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: "url(/assets/logobackgourd.png)" }}
    >
      {/* Dynamic Error Code */}
      <h2 className="text-[244px] text-white font-bold leading-none select-none">
        {config.code}
      </h2>

      <div
        className="absolute ohNo  
          lg:w-[590px] w-[90%] h-[280px] bg-black/18 backdrop-blur-xl rounded-[16px] 
          flex flex-col justify-center items-center text-white text-center p-6"
      >
        <h3 className="font-medium text-3xl md:text-[32px] font-poppins mb-2">
          {config.title}
        </h3>
        <p className="text-lg opacity-90 max-w-md">{config.description}</p>

        <div className="flex gap-4 mt-6">
          {/* Primary Button */}
          {config.primaryButton?.href ? (
            <Link
              href={config.primaryButton.href}
              className="w-[180px] h-[56px] rounded-[16px] flex items-center justify-center 
                font-montserrat font-semibold text-base bg-[#25AAE1] hover:bg-[#1e8fc0] 
                transition-colors duration-300"
            >
              {config.primaryButton.text}
            </Link>
          ) : (
            <button
              onClick={config.primaryButton?.onClick}
              className="w-[180px] h-[56px] rounded-[16px] flex items-center justify-center 
                font-montserrat font-semibold text-base bg-[#25AAE1] hover:bg-[#1e8fc0] 
                transition-colors duration-300"
            >
              {config.primaryButton?.text}
            </button>
          )}

          {/* Secondary Button (Home) */}
          {config.secondaryButton && (
            <Link
              href={config.secondaryButton.href}
              className="w-[180px] h-[56px] rounded-[16px] flex items-center justify-center 
                font-montserrat font-semibold text-base border-2 border-white/30 
                hover:bg-white/10 transition-colors duration-300"
            >
              {config.secondaryButton.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
