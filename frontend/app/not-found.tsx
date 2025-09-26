import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center relative  bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/assets/background.png)" }}
    >
      <h2 className="text-[244px] -mt-10 text-white font-bold poppins">404</h2>
      
      <div className="card lg:w-[590px] h-[280px] bg-black/30 backdrop-blur-[20px] rounded-[16px] flex flex-col justify-center items-center text-white text-center px-4">
        <h3 className="font-medium poppins text-[32px] font-poppins mb-2">
          Oh no! This page doesn't exist
        </h3>
        <p className="text-lg opacity-80 mt-1">The page you're looking for couldn't be found</p>
        
        <Link 
          href="/" 
          className="w-[180px] h-[56px] rounded-[16px] flex items-center justify-center font-montserrat font-semibold text-base bg-[#25AAE1]/90 hover:bg-[#25AAE1] transition-colors duration-300 mt-6"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}