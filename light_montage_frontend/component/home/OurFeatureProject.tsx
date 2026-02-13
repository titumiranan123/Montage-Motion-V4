/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicWorkContent from "./DynamicWorkContent";
import { Heading } from "../share/Headering";
import { getData } from "@/utils/getData";
import HomeTab from "./HomeProjectTab";

const OurFeatureProject = async ({
  tab,
  header,
}: {
  tab: string;
  header: any;
}) => {
  let category;
  let data;
  try {
    category = await getData({ url: "api/website/service/type" });

    data = await getData({
      url: `api/works/website?type=${tab && tab !== "all" ? tab : "home"}`,
    });
  } catch (error) {
    console.log(error);
    category = [];
    data = [];
  }
  console.log(data?.data);
  return (
    <div className="container bgwork rounded-[40px] lg:py-15 lg:mt-12.5 md:mt-10 mt-6">
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
      {/* <div data-aos="fade-up" data-aos-delay={500} className="w-full"> */}
      <HomeTab types={category?.data} />
      {/* </div> */}
      <DynamicWorkContent data={data?.data} />
    </div>
  );
};

export default OurFeatureProject;
