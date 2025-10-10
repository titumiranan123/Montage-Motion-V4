import Image from "next/image";
import React from "react";
import CustomLink from "./CustomLink";
import ServiceDropdown from "./ServiceDropdown";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <div className="py-6 container  flex justify-between items-center">
      <Image
        src={"/assets/montagelogo.png"}
        alt="logo"
        priority
        width={120}
        height={80}
      />
      <div className=" lg:flex hidden gap-4">
        <CustomLink className="" href="/" title="Home" />
        <ServiceDropdown />
        <CustomLink className="" href="/portfolio" title="Portfolio" />
        <CustomLink className="" href="/recourses" title="Recourses" />
        <CustomLink className="" href="/about" title="About" />
        <CustomLink className="" href="/get-in-touch" title="contact" />
      </div>
      <button className="w-[155px] h-[48px] btn-color text-black py-4 px-5 rounded-[16px] lg:flex hidden justify-center items-center font-popins font-[400]">
        Start a project
      </button>
      <button>
        <MobileMenu />
      </button>
    </div>
  );
};

export default Navbar;
