"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import DynamicWorkContent from "./DynamicWorkContent";
import { Heading } from "../share/Headering";
import HomeTab from "./HomeProjectTab";
import useWorks from "@/hook/useWorks";
import Aos from "aos";

const OurFeatureProject = ({
  category,
  header,
}: {
  category: any;
  header: any;
}) => {
  const [activeTab, setActiveTab] = useState("");
  const { data,isLoading  } = useWorks(activeTab);

useEffect(() => {
  if (isLoading) return;
  const timer = setTimeout(() => {
    Aos.init({
      duration: 800,
      once: true, 
      mirror: true,
    });
  }, 200);

  return () => clearTimeout(timer);
}, [isLoading, data]);
  return (
    <div className="container bgwork rounded-[40px] lg:py-15 py-5 lg:mt-12.5 md:mt-10 mt-6">
      <style>{`
      .bgwork {
        background: linear-gradient(180deg, #E9F8FC 0%, #F6FDFF 100%);
      }
      `}</style>
      <Heading
        subtitle={header?.paragraph}
        title={header?.heading_part1}
        tag={header?.tag}
        width="160"
      />
      <HomeTab
        types={category}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <DynamicWorkContent data={data} />
    </div>
  );
};

export default OurFeatureProject;
