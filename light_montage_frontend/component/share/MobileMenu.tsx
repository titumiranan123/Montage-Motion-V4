/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import useService from "@/hook/useService";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const path = usePathname();
  const { data: servicesData } = useService();

  const isServicesActive = servicesData?.slice(1).some((service: any) =>
    path === `/${service.href}` || path.startsWith(`/${service.href}/`)
  );

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleServicesMenu = () => setIsServicesOpen((prev) => !prev);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blogs", label: "Blogs" },
    { href: "/careers", label: "Careers" },
    { href: "/about-us", label: "About" },
    { href: "/contact-us", label: "Contact" },
  ];

  return (
    <div className="w-full">
      {/* Hamburger Button */}
      <button
        onClick={toggleMobileMenu}
        className="w-10 h-10 btn-color rounded-2xl flex flex-col justify-center items-center lg:hidden gap-1"
        aria-label="Open menu"
      >
        <span className="w-3 ms-1 h-0.5 bg-white"></span>
        <span className="w-4.75 h-0.5 bg-white"></span>
        <span className="w-3 h-0.5 -ms-1 bg-white"></span>
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed -inset-4 min-h-screen bg-black/40 z-30 backdrop-blur-sm"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Drawer */}
      <div
        style={{ zIndex: 99 }}
        className={`lg:hidden fixed -top-4 min-h-screen right-0 z-50 h-full w-[min(340px,85vw)] bg-[#0a0a0a] flex flex-col transition-transform duration-300 ease-in-out border-l border-white/6   ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full hidden"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-end px-5 py-4 border-b border-white/8">
          <button
            onClick={toggleMobileMenu}
            className="w-10 h-10 rounded-full bg-white/[0.07] flex items-center justify-center hover:bg-white/12 transition-colors"
            aria-label="Close menu"
          >
            <X className="text-white w-6 h-6" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-1.5">

          {/* Home */}
          <Link
            href="/"
            onClick={toggleMobileMenu}
            className={`relative flex items-center px-5 py-3 transition-colors hover:bg-white/4 ${
              path === "/" ? "text-white font-medium" : "text-white/50 font-normal"
            }`}
          >
            {path === "/" && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 bg-primary rounded-r-full" />
            )}
            <span className="text-base">Home</span>
          </Link>

          {/* Services Dropdown */}
          <div>
            <button
              onClick={toggleServicesMenu}
              aria-expanded={isServicesOpen}
              className={`relative w-full flex items-center justify-between px-5 py-3 transition-colors hover:bg-white/4 ${
                isServicesActive ? "text-white font-medium" : "text-white/50 font-normal"
              }`}
            >
              {isServicesActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 bg-[#1FB5DD] rounded-r-full" />
              )}
              <span className="text-base">Services</span>
              {isServicesOpen ? (
                <ChevronUp className="w-4 h-4 text-white/50" />
              ) : (
                <ChevronDown className="w-4 h-4 text-white/30" />
              )}
            </button>

            {/* Submenu */}
            <div
              className={`bg-white/2 overflow-hidden transition-all duration-300 ease-in-out ${
                isServicesOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              {servicesData?.slice(1).map((service: any, idx: number) => (
                <Link
                  key={idx}
                  href={service.href}
                  onClick={toggleMobileMenu}
                  className={`flex items-center gap-2.5 px-5 pl-8 py-2.5 transition-colors hover:bg-white/4 ${
                    path.startsWith(service.href) ? "text-white/80" : "text-white/40"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      path.startsWith(service.href) ? "bg-[#1FB5DD]" : "bg-white/20"
                    }`}
                  />
                  <span className="text-base">{service.service_title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/6 mx-5 my-1" />

          {/* Remaining Links */}
          {navLinks.slice(1).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={toggleMobileMenu}
              className={`relative flex items-center px-5 py-3 transition-colors hover:bg-white/4 ${
                path === href ? "text-white font-medium" : "text-white/50 font-normal"
              }`}
            >
              {path === href && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 bg-[#1FB5DD] rounded-r-full" />
              )}
              <span className="text-base">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;