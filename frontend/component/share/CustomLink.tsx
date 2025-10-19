"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface Prop {
  className: string;
  href: string;
  title: string;
}
const CustomLink: React.FC<Prop> = ({ className, href, title }) => {
  const pathName = usePathname();

  return (
    <Link
      href={`${href} `}
      className={`text-[16px] poppins ${className} ${
        pathName === href ? "font-[600] " : "font-[400]"
      } text-white hover:scale-105 transition-all duration-300 hover:font-[600]`}
    >
      {title}
    </Link>
  );
};

export default CustomLink;
