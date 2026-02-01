import Heading from "../page-service/Headering";
import { TabsClient } from "./IndustryTabClient";

export interface OfferPoint {
  text: string;
  position: number;
}

export interface CTA {
  label: string;
  link: string;
}

export interface TabItem {
  id: string;
  tab_key: string;
  title: string;
  description: string;
  image: string;
  position: number;
  offer_points: OfferPoint[];
  cta: CTA;
}

export default function IndustryWeWork({ data }: { data?: any }) {
  const tabs = data?.tabs as TabItem;

  return (
    <section className="w-full sectionGap container rounded-[40px] py-10 industriesbg">
      <Heading
        subtitle="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
        tag="Our Works"
        title="Industries We Work With"
      />
      <TabsClient tabs={tabs} />
    </section>
  );
}
