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
      href={`${href}`}
      className={`${className} ${
        pathName === href ? "font-bold" : "font-normal"
      } text-white`}
    >
      {title}
    </Link>
  );
};

export default CustomLink;
