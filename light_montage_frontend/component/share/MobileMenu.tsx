/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import useService from "@/hook/useService";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const path = usePathname();
  const { data: servicesData } = useService();
  const isServicesActive = servicesData?.some((service: any) =>
    path.startsWith(service.href),
  );
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleServicesMenu = () => {
    setIsServicesOpen((prev) => !prev);
  };
  return (
    <div className="w-full ">
      <button
        onClick={toggleMobileMenu}
        className=" w-10 h-10 btn-color   rounded-2xl flex flex-col justify-center items-center lg:hidden   poppins  font-normal gap-1"
      >
        <span className="w-3 ms-1 h-0.5 bg-white"></span>
        <span className="w-4.75 h-0.5 bg-white"></span>
        <span className="w-3 h-0.5 -ms-1 bg-white"></span>
      </button>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden fixed left-0 w-full -top-10! bg-black  text-(--text-primary)  z-40 px-6 pt-24 pb-10 min-h-screen transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full hidden"
        }`}
      >
        <button
          onClick={toggleMobileMenu}
          className="absolute top-4 right-4  text-(--text-primary)  focus:outline-none"
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6  text-white"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col justify-start items-center space-y-2">
          <Link
            href="/"
            onClick={toggleMobileMenu}
            className={`poppins text-lg border-white/10 ${
              path === "/"
                ? " text-(--text-primary)  font-semibold"
                : "text-gray-200 font-normal"
            }`}
          >
            Home
          </Link>

          <div className="poppins text-lg border-white/10">
            <button
              onClick={toggleServicesMenu}
              className="flex items-center justify-center gap-2 w-full"
              aria-expanded={isServicesOpen}
            >
              <span
                className={
                  isServicesActive
                    ? "font-semibold  text-white "
                    : "text-gray-200 font-medium"
                }
              >
                Services
              </span>
              {!isServicesOpen ? (
                <ChevronDown className="w-4 h-4 text-white" />
              ) : (
                <ChevronUp className="w-4 h-4 text-white" />
              )}
            </button>
            <div
              className={`pl-4 space-y-3 mt-3 overflow-hidden transition-all duration-300 ${
                isServicesOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              {servicesData?.map((service: any, idx: number) => (
                <Link
                  key={idx}
                  href={service.href}
                  onClick={toggleMobileMenu}
                  className={`block py-2 ${
                    path === service.href
                      ? " text-(--text-primary)  font-bold"
                      : "text-gray-200"
                  }`}
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/portfolio"
            onClick={toggleMobileMenu}
            className={`poppins text-lg border-white/10 ${
              path === "/portfolio"
                ? " text-(--text-primary)  font-bold"
                : "text-gray-200"
            }`}
          >
            Portfolio
          </Link>
          <Link
            href="/blog"
            onClick={toggleMobileMenu}
            className={`poppins text-lg border-white/10 ${
              path === "/blog"
                ? " text-(--text-primary)  font-bold"
                : "text-gray-200"
            }`}
          >
            Blogs
          </Link>
          <Link
            href="/careers"
            onClick={toggleMobileMenu}
            className={`poppins text-lg border-white/10 ${
              path === "/careers"
                ? " text-(--text-primary)  font-bold"
                : "text-gray-200"
            }`}
          >
            Careers
          </Link>
          <Link
            href="/about-us"
            onClick={toggleMobileMenu}
            className={`poppins text-lg border-white/10 ${
              path === "/about-us"
                ? " text-(--text-primary)  font-bold"
                : "text-gray-200"
            }`}
          >
            About
          </Link>
          <Link
            href="/contact-us"
            onClick={toggleMobileMenu}
            className={`poppins text-lg border-white/10 ${
              path === "/contact-us"
                ? " text-(--text-primary)  font-bold"
                : "text-gray-200"
            }`}
          >
            Contact
          </Link>

          <button className="w-38.75 h-12 btn-color text-black py-4 px-5 rounded-2xl lg:flex hidden justify-center items-center text-[16px] font-medium poppins cursor-pointer hover:scale-105 hover:-rotate-3 transition-all duration-300 ease-in-out ">
            Start a project
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
