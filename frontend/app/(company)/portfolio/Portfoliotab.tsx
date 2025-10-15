"use client";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Portfoliotab = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("cat") || "all";
  const [activeTab, setActiveTab] = useState(currentTab);
  const handleTabClick = (href: string) => {
    setActiveTab(href);
    const newUrl = `?cat=${href}`;
    router.replace(newUrl);
  };
  // useEffect(() => {
  //   router.replace(`?cat=${activeTab}`);
  // }, [activeTab]);
  // | "main"
  //     | "shorts"
  //     | "talking"
  //     | "podcast"
  //     | "graphic"
  //     | "advertising"
  //     | "website";
  const tabConfig = [
    {
      title: "Talking Video Editing",
      href: "talking",
    },
    {
      title: "Podcast Video Editing ",
      href: "podcast",
    },
    {
      title: "Shorts Video Editing",
      href: "shorts",
    },
    {
      title: "Thumbnail Design",
      href: "graphic",
    },
    {
      title: "SaaS Video Editing",
      href: "advertising",
    },
  ];

  const handleSearch = (e: any) => {
    const value = e.target.value;
    const newUrl = `?cat=${activeTab}&search=${encodeURIComponent(value)}`;
    router.replace(newUrl);
  };
  return (
    <div>
      <style>
        {`
        .searchbg{
          background: linear-gradient(250.64deg, rgba(51, 87, 163, 0.5) 0%, rgba(51, 87, 163, 0) 50%, rgba(51, 87, 163, 0.5) 100%);
        }
        `}
      </style>
      <div className="searchbg group w-[123px] flex justify-center items-center mx-auto  rounded-full p-[1px] mt-5 focus-within:w-[260px] transition-all duration-300">
        <button className="w-[120px] group-focus-within:w-[260px] flex items-center gap-2 bg-black rounded-full px-3 py-2 transition-all duration-300 ">
          {/* Search Icon */}
          <Search className="text-white" />

          {/* Search Input */}
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            className="bg-transparent text-white placeholder-gray-400 outline-none border-none w-[56px] group-focus-within:w-[200px] transition-all duration-300 ease-in-out"
          />
        </button>
      </div>
      <div className="searchbg group max-w-[814px] w-full h-full flex justify-center items-center mx-auto  rounded-[57px] p-[1px] mt-5 transition-all duration-300">
        <div className="bg-black max-w-[814px] w-full rounded-[57px] h-full py-2 px-4">
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
      </div>

      {/* <div className="flex justify-center items-center gap-6  pb-2 mt-8 min-w-[582px]  max-h-[57px] rounded-[56px] py-[11px] px-3 bg-[#1D21223D] mx-auto ">
        
      </div> */}
    </div>
  );
};

export default Portfoliotab;
