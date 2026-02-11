/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading } from "../share/Headering";
import { TabsClient } from "./IndustryTabClient";
// ---------- Types ----------
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
      <style>{`
      .industriesbg {
        background: linear-gradient(180deg, #E9F8FC 0%, #F6FDFF 100%);
      }
      `}</style>
      <Heading
        subtitle={data?.paragraph}
        tag={data?.tag}
        title={data?.heading_title}
        width="140"
      />
      <TabsClient tabs={tabs} />
    </section>
  );
}
