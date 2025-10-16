"use client";

import useService from "@/hook/useService";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ServiceDropdown = () => {
  const path = usePathname();
  const { data: servicesData } = useService();

  const isServicesActive = servicesData?.some((service: any) =>
    path.startsWith(service.href)
  );

  return (
    <div className="group relative cursor-pointer poppins">
      {/* Trigger */}
      <span
        className={`flex text-white items-center gap-2 transition-all duration-200 ${
          isServicesActive ? "font-semibold" : "font-normal"
        }`}
      >
        Services
      </span>

      {/* Dropdown Panel */}
      <div className="absolute top-6 -left-[330px] w-[1000px] transform translate-y-5 group-hover:translate-y-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50">
        <div className="absolute top-full lg:left-8 lg:right-8 transition-all duration-200 ease-in-out z-50 rounded-3xl bg-black backdrop-blur-[50px] shadow-lg">
          <div className="grid grid-cols-3 lg:grid-cols-3 border rounded-2xl border-[#2B6AB2]/60">
            {/* Design Section */}
            <ServiceColumn
              title="Video Editing"
              iconColor="text-primary-40"
              links={[
                {
                  href: "/podcast-editing-service",
                  label: "Podcast Video Editing",
                },

                {
                  href: "/short-form-video-editing",
                  label: "Short-Form & Reels Editing",
                },
                {
                  href: "/talking-head-video",
                  label: "Talking Head Video Editing",
                },

                {
                  href: "/saas-explainer-video",
                  label: "Video Editing Service",
                },
              ]}
            />

            {/* Development Section */}
            <ServiceColumn
              title="Video Creation"
              iconColor="text-primary-40"
              links={[
                { href: "/saas-explainer-video", label: "Explainer Video " },
                { href: "/saas-explainer-video", label: "Motion Video" },
                {
                  href: "/saas-explainer-video",
                  label: "Promotional Video",
                },
              ]}
            />

            {/* Organic Search Section */}
            <ServiceColumn
              title="Design"
              iconColor="text-primary-40"
              links={[
                { href: "/thumbnail-design", label: "Graphics Design" },
                { href: "/thumbnail-design", label: "Logo Design" },
                { href: "/thumbnail-design", label: "Branding" },
                { href: "/thumbnail-design", label: "UI/UX" },
              ]}
              borderNone={true}
            />

            {/* Content Section */}
            {/* <ServiceColumn
              title="Advertising"
              iconColor="text-primary-40"
              links={[]}
              borderNone
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable Column Component
interface ServiceColumnProps {
  title: string;
  iconColor?: string;
  links: { href: string; label: string }[];
  borderNone?: boolean;
}

const ServiceColumn: React.FC<ServiceColumnProps> = ({
  title,
  iconColor,
  links,
  borderNone,
}) => {
  return (
    <div
      className={`space-y-4  ${
        borderNone ? "" : "border-r border-[#2B6AB2]/60"
      }`}
    >
      <div className="flex items-center justify-between gap-2 text-lg font-medium text-primary py-4 px-6">
        <span className="text-white">{title}</span>
        <div className="size-9 rounded-full bg-white flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
            className={iconColor}
          >
            <path d="M221.07,144.41A96.68,96.68,0,0,0,181,88h59a8,8,0,0,0,0-16H159a32,32,0,0,0-62,0H16a8,8,0,0,0,0,16H75a96.68,96.68,0,0,0-40.07,56.41A32,32,0,1,0,51.08,146,80.6,80.6,0,0,1,99,93.44a32,32,0,0,0,58.06,0A80.6,80.6,0,0,1,204.92,146a32,32,0,1,0,16.15-1.57ZM56,176a16,16,0,1,1-16-16A16,16,0,0,1,56,176Zm72-80a16,16,0,1,1,16-16A16,16,0,0,1,128,96Zm88,96a16,16,0,1,1,16-16A16,16,0,0,1,216,192Z" />
          </svg>
        </div>
      </div>

      <div className="h-[1px] bg-[#2B6AB2]/60 my-3" />

      <ul className="space-y-4 py-8 px-6">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-base text-white hover:text-primary-600 transition-colors hover:text-[#2B6AB2]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceDropdown;
