"use client";
import useService from "@/hook/useService";
import Image from "next/image";
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
    <>
      {/* Services Dropdown */}
      <div className="group relative cursor-pointer poppins ">
        <span
          className={`flex text-white items-center gap-2 ${
            isServicesActive ? "font-[600] " : "font-[400]"
          }`}
        >
          Services
        </span>
        <div className="absolute top-6 -left-[348px] w-[900px] transform translate-y-5 group-hover:translate-y-4  opacity-0 invisible group-hover:opacity-100  group-hover:visible transition-all duration-300 ease-in-out z-50">
          <div
            style={{
              boxShadow: "inset 0px 0px 21px #25AAE1CC",
              zIndex: 9999,
            }}
            className="bg-black backdrop-blur-[21px] border border-[#78D5ED33] shadow-xl rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white"
          >
            {servicesData?.map((service: any) => (
              <Link
                key={service.id}
                href={service.href}
                className="flex items-start gap-3 p-3 hover:bg-[#78D5ED33] hover:text-white  rounded-lg transition-colors"
              >
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    priority
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{service.title}</h3>
                  <p className="text-sm mt-1 line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDropdown;
