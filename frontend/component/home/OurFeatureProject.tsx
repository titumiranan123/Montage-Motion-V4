import React from "react";
import Heading from "../share/Headering";
import HomeProjectTab from "./HomeProjectTab";
import DynamicWorkContent from "./DynamicWorkContent";

const OurFeatureProject = async ({ tab = "home" }: { tab: string }) => {
  const workSection = {
    title: "Our Featured Projects",
    subtitle:
      "Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing",
    tag: "Our Works",
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/works/website?type=${tab}&&limit=6`
  );
  const result = await response.json();
  const data = result?.data;

  return (
    <div className="container lg:mt-[50px] md:mt-[40px] mt-[24px]">
      <Heading
        subtitle={workSection.subtitle}
        title={workSection.title}
        tag={workSection.tag}
      />
      <HomeProjectTab />
      <DynamicWorkContent data={data} />
    </div>
  );
};

export default OurFeatureProject;
