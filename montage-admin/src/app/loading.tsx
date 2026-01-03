import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center  z-50 w-screen h-screen bg-[#1CA3C8]/20 backdrop-blur-lg">
      {/* Spinner */}
      <div
        className="w-16 h-16 border-4 border-t-4 border-t-[#1CA3C8] border-gray-700 rounded-full animate-spin"
        role="status"
      ></div>

      {/* Optional text */}
      <p className="mt-4 text-[#1CA3C8] font-semibold text-lg animate-pulse">
        Loading...
      </p>
    </div>
  );
}
