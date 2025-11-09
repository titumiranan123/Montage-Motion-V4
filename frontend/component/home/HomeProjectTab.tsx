"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const HomeProjectTab = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabConfig = [
    { id: "fullform", label: "Full-form Video" },
    { id: "shorts", label: "Shorts/Reel" },
    { id: "thumbnail", label: "Thumbnail Design" },
    { id: "talkinghead", label: "Talking Head" },
    { id: "podcast", label: "Podcast" },
  ];

  // get initial tab from URL or fallback default
  const defaultTab = searchParams.get("tab") || "fullform";

  const [activeTab, setActiveTab] = useState(
    defaultTab === "fullform" ? "home" : defaultTab
  );

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`?tab=${tabId}`, { scroll: false });
  };

  // Sync tab state if URL changed manually
  useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams]);

  return (
    <div className="searchbg p-[1px] max-w-[725px] max-h-[59px] rounded-[56px] mx-auto mt-8">
      <div
        className="
          flex gap-3 lg:gap-6 pb-2 w-full 
          justify-start lg:justify-center items-center 
          max-h-[57px] rounded-[56px] py-[11px] px-3 
          bg-black mx-auto tabBorder 
          overflow-x-auto scrollbar-hide
        "
      >
        {tabConfig.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`py-2 px-2 md:px-4 text-white opensans font-[400] md:text-[14px] text-[13px] rounded-[36px] transition-colors whitespace-nowrap ${
              activeTab === tab.id ? "bg-[#2B6AB2] font-semibold" : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeProjectTab;
