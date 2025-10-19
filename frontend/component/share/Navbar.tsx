import Image from "next/image";
import React from "react";
import CustomLink from "./CustomLink";
import ServiceDropdown from "./ServiceDropdown";
import MobileMenu from "./MobileMenu";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="py-2 mt-6 md:mt-8 bg-[#080B0C63]/39 rounded-[24px] container  flex justify-between items-center">
      <Link
        className="block hover:scale-105 transition-all duration-300"
        href={"/"}
      >
        <Image
          src={"/assets/montagelogo.png"}
          alt="logo"
          priority
          width={120}
          height={80}
        />
      </Link>
      <div className=" lg:flex hidden gap-6">
        <CustomLink className="" href="/" title="Home" />
        <ServiceDropdown />
        <CustomLink className="" href="/portfolio" title="Portfolio" />
        <CustomLink className="" href="/careers" title="Careers" />
        <CustomLink className="" href="/blog" title="Blogs" />
        <CustomLink className="" href="/about-us" title="About" />
        <CustomLink className="" href="/contact-us" title="contact" />
      </div>

      <button className="w-[155px] h-[48px] btn-color text-black py-4 px-5 rounded-[16px] lg:flex hidden justify-center items-center text-[16px] font-[500] poppins cursor-pointer">
        Start a project
      </button>
      <button className="flex lg:hidden">
        <MobileMenu />
      </button>
    </div>
  );
};

export default Navbar;
