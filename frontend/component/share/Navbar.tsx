import Image from "next/image";
import React from "react";
import CustomLink from "./CustomLink";

const Navbar = () => {
  return (
    <div className="py-6 max-w-[1440px] lg:px-[120px] px-[60] mx-auto flex justify-between items-center">
      <Image
        src={"/assets/montagelogo.png"}
        alt="logo"
        priority
        width={120}
        height={80}
      />
      <div className="flex gap-2">
        <CustomLink className="" href="/" title="Home" />
        <CustomLink className="" href="/portfolio" title="Portfolio" />
        <CustomLink className="" href="/recourses" title="Recourses" />
        <CustomLink className="" href="/about" title="About" />
        <CustomLink className="" href="/contact" title="contact" />
      </div>
      <button className="w-[155px] h-[48px] btn-color text-black py-4 px-5 rounded-[16px] flex justify-center items-center font-popins font-[400]">
        Start a project
      </button>
    </div>
  );
};

export default Navbar;
