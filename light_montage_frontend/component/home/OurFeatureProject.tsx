import DynamicWorkContent from "./DynamicWorkContent";
import { Heading } from "../share/Headering";
import { getData } from "@/utils/getData";
import HomeTab from "./HomeProjectTab";

const OurFeatureProject = async ({ tab }: { tab: string }) => {
  const workSection = {
    title: "Our Featured Projects",
    subtitle:
      "Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing",
    tag: "Our Works",
  };
  let category;
  let data;
  try {
    category = await getData({ url: "api/website/service/type" });

    const defaultType = tab ?? category?.data?.[0]?.service_type;
    data = await getData({
      url: `api/works/website?type=${defaultType}&limit=6`,
    });
  } catch (error) {
    console.log(error);
    category = [];
    data = [];
  }

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
      <HomeTab types={category?.data} />
      <DynamicWorkContent data={data?.data} />
    </div>
  );
};

export default OurFeatureProject;
