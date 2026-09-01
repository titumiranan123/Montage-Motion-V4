"use client";

import useService from "@/hook/useService";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ServiceDropdown = () => {
  const path = usePathname();
  const { data: servicesData } = useService();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isServicesActive = servicesData?.some((service: any) =>
    path.startsWith(service.href),
  );

  return (
    <div className="group  relative cursor-pointer poppins">
      {/* Trigger */}
      <span
        className={`flex  text-(--text-primary)  items-center gap-1 transition-all duration-200 hover:scale-105 hover:font-semibold ${
          isServicesActive ? "font-semibold" : "font-normal"
        }`}
      >
        Services <ChevronDown />
      </span>

      {/* Dropdown Panel */}
      <div
        style={{ zIndex: 9999 }}
        className="absolute top-6 -left-82.5 w-250 transform translate-y-5 group-hover:translate-y-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50 "
      >
        <div className="grid grid-cols-3 lg:grid-cols-3 border   border-(--text-primary)/20 rounded-3xl bg-white backdrop-blur-2xl ">
          {/* Design Section */}
          <ServiceColumn
            title="Video Editing"
            iconColor="text-primary-40"
            links={[
              {
                href: "/podcast-editing-services",
                label: "Podcast Video Editing",
              },

              {
                href: "/shorts-editing",
                label: "Short-Form & Reels Editing",
              },
              {
                href: "/talking-head-video-editing-services",
                label: "Talking Head Video Editing",
              },

              {
                href: "/saas-explainer",
                label: "SaaS Editing Service",
              },
            ]}
          />

          {/* Development Section */}
          <ServiceColumn
            title="Video Creation"
            iconColor="text-primary-40"
            links={[
              {
                href: "/promo-video-editing-service",
                label: "Promo Video Editing ",
              },
              {
                href: "/promo-video-editing-service",
                label: "Promotional Video",
              },
            ]}
          />

          {/* Organic Search Section */}
          <ServiceColumn
            title="Design"
            iconColor="text-primary-40"
            links={[
              { href: "/thumbnail-design-services", label: "Thumbnail Design" },
            ]}
            borderNone={true}
          />

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

  links,
  borderNone,
}) => {
  return (
    <div
      className={`space-y-4  ${
        borderNone ? "" : "border-r border-(--text-primary)/20"
      }`}
    >
      <div className="flex items-center justify-between gap-2 text-lg font-medium text-primary py-4 px-6">
        <span className=" text-(--text-primary) ">{title}</span>
        <div className="size-9 rounded-full btn-color flex items-center justify-center ">
          <ChevronDown className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="h-px bg-(--text-primary)/20 my-3" />

      <ul className="space-y-4 pt-3 pb-8 px-6">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-base  text-(--text-primary)  hover:text-primary-600 transition-colors hover:text-[#2B6AB2]"
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
