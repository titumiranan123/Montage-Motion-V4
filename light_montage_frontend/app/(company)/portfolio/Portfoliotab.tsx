/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Portfoliotab = ({ tab, types }: { tab: string; types: any }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("cat") || tab ? tab : "talkinghead";
  const [activeTab, setActiveTab] = useState(currentTab);
  const handleTabClick = (href: string) => {
    setActiveTab(href);
    const newUrl = `?cat=${href}`;
    router.replace(newUrl);
  };
  useEffect(() => {
    router.replace(`?cat=${activeTab}`);
  }, [activeTab, router]);

  const tabConfig = types ?? [];

  const handleSearch = (e: any) => {
    const value = e.target.value;
    const newUrl = `?cat=${activeTab}&search=${encodeURIComponent(value)}`;
    router.replace(newUrl);
  };

  return (
    <div data-aos="fade-up" data-aos-delay={400} className="px-3">
      <style>
        {`
        .searchbg{
          background: linear-gradient(250.64deg, rgba(51, 87, 163, 0.5) 0%, rgba(51, 87, 163, 0) 50%, rgba(51, 87, 163, 0.5) 100%);
        }
    
        .tabScroll {
          overflow-x: auto;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin; /* Firefox */
          scrollbar-color: rgba(51,87,163,.6) transparent;
        }
      
        /* Chrome, Edge, Safari */
        .tabScroll::-webkit-scrollbar {
          height: 10px;
        }
      
        .tabScroll::-webkit-scrollbar-track {
          background: transparent;
        }
      
        .tabScroll::-webkit-scrollbar-thumb {
          background: linear-gradient(
            90deg,
            rgba(51,87,163,.6),
            rgba(51,87,163,.3)
          );
          border-radius: 10px;
        }
       
      
        `}
      </style>
      {/* search hidden by tailwind class */}
      <div className="searchbg group hidden w-[123px]  justify-center items-center mx-auto  rounded-full p-px mt-5 focus-within:w-[260px] transition-all duration-300">
        <button className="w-[120px] group-focus-within:w-[260px] flex items-center gap-2 bg-white/40 rounded-full px-3 py-2 transition-all duration-300 ">
          {/* Search Icon */}
          <Search className="text-(--text-primary)" />

          {/* Search Input */}
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            className="bg-transparent text-(--text-primary) placeholder-gray-400 outline-none border-none w-14 group-focus-within:w-[200px] transition-all duration-300 ease-in-out"
          />
        </button>
      </div>
      <div className="glassShadow tabScroll  bg-white/40  backdrop-blur-2xl  group  max-w-[594px] h-[75px] flex justify-left items-center mx-auto rounded-[12px] p-px mt-5 transition-all duration-300 overflow-x-scroll px-3 ">
        {tabConfig?.slice(1)?.map((tab: any) => (
          <button
            key={tab?.href}
            onClick={() => handleTabClick(tab?.service_type)}
            className={`py-2 px-3 text-(--text-primary) opensans font-medium text-[14px] rounded-[12px] text-center transition-colors whitespace-nowrap h-[51px]  ${
              activeTab === tab?.service_type ? "btn-color font-semibold" : ""
            }`}
          >
            {tab?.service_title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Portfoliotab;
