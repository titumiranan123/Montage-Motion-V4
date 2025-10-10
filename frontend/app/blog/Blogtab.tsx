"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Blogtab = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("cat") || "all";
  const [activeTab, setActiveTab] = useState(currentTab);
  const handleTabClick = (href: string) => {
    setActiveTab(href);
    const newUrl = `?cat=${href}`;
    router.replace(newUrl);
  };
  const tabConfig = [
    {
      title: "All",
      href: "all",
    },
    {
      title: "Video Editing",
      href: "video-editing",
    },
    {
      title: "Content Marketing",
      href: "content-marketing",
    },
    {
      title: "Design & Branding",
      href: "design-branding",
    },
    {
      title: "Social Media Trends",
      href: "social-media-trends",
    },
    {
      title: "Podcasting Tips",
      href: "podcasting-tips",
    },
    {
      title: "Case Studies",
      href: "case-studies",
    },
  ];
  return (
    <div className="flex justify-center items-center gap-6  pb-2 mt-8 min-w-[582px]  max-h-[57px] rounded-[56px] py-[11px] px-3 bg-[#1D21223D] mx-auto ">
      {tabConfig.map((tab) => (
        <button
          key={tab.href}
          onClick={() => handleTabClick(tab.href)}
          className={`py-2 px-3 text-white opensans font-[400] text-[14px]  rounded-[36px] transition-colors ${
            activeTab === tab.href ? " bg-[#2B6AB2] font-semibold" : ""
          }`}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default Blogtab;
