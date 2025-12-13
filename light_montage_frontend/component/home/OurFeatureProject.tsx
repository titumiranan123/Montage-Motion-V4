import HomeProjectTab from "./HomeProjectTab";
import DynamicWorkContent from "./DynamicWorkContent";
import { Heading } from "../share/Headering";

const OurFeatureProject = async ({ tab = "fullform" }: { tab: string }) => {
  const workSection = {
    title: "Our Featured Projects",
    subtitle:
      "Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing",
    tag: "Our Works",
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/works/website?type=${
      tab === "fullform" ? "home" : tab
    }&&limit=6`
  );
  const result = await response.json();
  const data = result?.data;

  return (
    <div className="container bgwork rounded-[40px] lg:py-[60px] lg:mt-[50px] md:mt-10 mt-6">
      <style>{`
      .bgwork {
        background: linear-gradient(180deg, #FFF7D3 0%, rgba(254, 249, 228, 0.2) 100%);

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
