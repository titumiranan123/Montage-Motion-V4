"use client";
import React from "react";
import Heading from "../share/Headering";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DynamicWorkContent from "./DynamicWorkContent";
const OurWorkSection = () => {
  const workSection = {
    title: "Our Featured Projects",
    subtitle:
      "Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing",
    tag: "Our Works",
  };

  // tab configuration (id + label + hook param)
  const tabConfig = [
    { id: "main", label: "Full-form Video Editing" },
    { id: "shorts", label: "Shorts/Reel Editing" },
    { id: "graphic", label: "Thumbnail Design" },
  ];

  // load default tab data

  return (
    <div className="container sectionGap">
      <Heading
        subtitle={workSection.subtitle}
        title={workSection.title}
        tag={workSection.tag}
      />

      <Tabs defaultValue="main" className="mt-8">
        <TabsList className="flex gap-4 border-b pb-2">
          {tabConfig.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabConfig.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="pt-6">
            {/* You can fetch tab-specific data dynamically like this: */}
            <DynamicWorkContent tabKey={tab.id} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default OurWorkSection;
