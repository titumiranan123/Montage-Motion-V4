import { Heading } from "../share/Headering";
import { TabsClient } from "./IndustryTabClient";

// ---------- Types ----------
type TabItem = {
  id: string;
  title: string;
  description: string;
  offer: { points: string[] };
  cta: { label: string; link: string };
  image: string;
};

type TabsData = {
  tabs: TabItem[];
};

const DEFAULT_DATA: TabsData = {
  tabs: [
    {
      id: "podcasting",
      title: "Podcasting",
      description:
        "Our brilliant team are expert on both 2D and 3D Animation. We create Character Animation and Explainer for personal and commercial use.",
      offer: {
        points: [
          "Experienced team",
          "20+ in-house team to grow your online presence",
          "1000+ projects completed successfully",
        ],
      },
      cta: { label: "Book a Call", link: "#" },
      image: "/assets/industries.png",
    },
    {
      id: "corporate",
      title: "Corporate",
      description:
        "We deliver engaging corporate video content including company profiles, training videos, and client testimonials designed to strengthen your brand story.",
      offer: {
        points: [
          "Dedicated creative director for each project",
          "Custom scriptwriting & professional voiceover",
          "Trusted by 200+ corporate clients",
        ],
      },
      cta: { label: "Explore Corporate Works", link: "#" },
      image: "/assets/industries.png",
    },
    {
      id: "saas_tech",
      title: "SaaS & Tech",
      description:
        "We help SaaS and Tech brands explain their complex solutions through high-quality explainer videos, animations, and product walkthroughs.",
      offer: {
        points: [
          "Tech-savvy script & design team",
          "3D product visualization & app demos",
          "Result-driven storytelling for user engagement",
        ],
      },
      cta: { label: "See Tech Projects", link: "#" },
      image: "/assets/industries.png",
    },
    {
      id: "content_creation",
      title: "Content Creation",
      description:
        "Our content team crafts scroll-stopping video and social content tailored for brands, influencers, and digital campaigns.",
      offer: {
        points: [
          "Creative direction & brand strategy",
          "Optimized for social media & ads",
          "Weekly content calendar support",
        ],
      },
      cta: { label: "Start Creating", link: "#" },
      image: "/assets/industries.png",
    },
  ],
};

export default function IndustryWeWork({ data }: { data?: TabsData }) {
  const tabs = data?.tabs ?? DEFAULT_DATA.tabs;
  return (
    <section className="w-full sectionGap container rounded-[40px] py-10 industriesbg">
      <style>{`
      .industriesbg {
        background: linear-gradient(180deg, #E9F8FC 0%, #F6FDFF 100%);
      }
      `}</style>
      <Heading
        subtitle="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
        tag="Our Works"
        title="Industries We Work With"
      />
      <TabsClient tabs={tabs} />
    </section>
  );
}
