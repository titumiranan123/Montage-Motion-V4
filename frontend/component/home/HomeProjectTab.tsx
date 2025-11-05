"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const HomeProjectTab = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabConfig = [
    { id: "home", label: "Full-form Video " },
    { id: "shorts", label: "Shorts/Reel " },
    { id: "thumbnail", label: "Thumbnail Design" },
    { id: "talkinghead", label: "Talking Head" },
    { id: "podcast", label: "Podcast" },
  ];

  // get initial tab from URL or fallback default
  const defaultTab = searchParams.get("tab") || "main";

  const [activeTab, setActiveTab] = useState(defaultTab);

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
    <div>
      <div className="flex lg:gap-6 pb-2 mt-8 min-w-[582px] justify-center items-center max-h-[57px] rounded-[56px] py-[11px] px-3 bg-[#1D21223D] mx-auto tabBorder">
        {tabConfig.map((tab, idx) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`py-2 px-2 md:px-4 text-white opensans font-[400] md:text-[14px] text-[13px] rounded-[36px] transition-colors ${
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
