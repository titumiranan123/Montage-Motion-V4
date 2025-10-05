"use client";
import React, { useState } from "react";
import Heading from "../share/Headering";
import DynamicWorkContent from "./DynamicWorkContent";

const OurFeatureProject = () => {
  const workSection = {
    title: "Our Featured Projects",
    subtitle:
      "Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing",
    tag: "Our Works",
  };

  // tab configuration
  const tabConfig = [
    { id: "main", label: "Full-form Video Editing" },
    { id: "shorts", label: "Shorts/Reel Editing" },
    { id: "graphic", label: "Thumbnail Design" },
  ];

  // active tab state
  const [activeTab, setActiveTab] = useState("main");

  return (
    <div className="container sectionGap">
      <Heading
        subtitle={workSection.subtitle}
        title={workSection.title}
        tag={workSection.tag}
      />

      {/* Tabs Header */}
      <div className="flex gap-6  pb-2 mt-8 max-w-[582px] max-h-[57px] rounded-[56px] py-[11px] px-3 bg-[#1D21223D] mx-auto tabBorder">
        {tabConfig.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-3 text-white opensans font-[400] text-[14px]  rounded-[36px] transition-colors ${
              activeTab === tab.id ? " bg-[#2B6AB2] font-semibold" : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="pt-6">
        {tabConfig.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id}>
                <DynamicWorkContent tabKey={tab.id} />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default OurFeatureProject;
