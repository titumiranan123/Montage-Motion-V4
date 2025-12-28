import HomeProjectTab from "./HomeProjectTab";
import DynamicWorkContent from "./DynamicWorkContent";
import { Heading } from "../share/Headering";
import { getData } from "@/utils/getData";

const OurFeatureProject = async ({ tab = "fullform" }: { tab: string }) => {
  const workSection = {
    title: "Our Featured Projects",
    subtitle:
      "Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing",
    tag: "Our Works",
  };

  const { data } = await getData({
    url: `api/works/website?type=${tab === "fullform" ? "home" : tab}&&limit=6`,
  });

  return (
    <div className="container bgwork rounded-[40px] lg:py-[60px] lg:mt-[50px] md:mt-10 mt-6">
      <style>{`
      .bgwork {
        background: linear-gradient(180deg, #E9F8FC 0%, #F6FDFF 100%);

      }
      `}</style>
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
