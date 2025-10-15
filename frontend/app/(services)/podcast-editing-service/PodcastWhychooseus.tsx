import { ColumnCard } from "@/component/home/ColumnCard";
import Heading from "@/component/share/Headering";
import React from "react";
const comparisonData = {
  columns: [
    {
      id: "montage",
      title: "Do It Yourself",
      items: [
        "Full Podcast editing (basic level)",
        "Audio cleanup with free tools",
        "Limited sound balancing ",
      ],
    },
    {
      id: "agencies",
      title: null,
      items: [
        "Full podcast editing (studio quality)",
        "Custom branded Intro/outro",
        "Advanced audio cleanup & noise reduction",
        "Professional sound effects & noise reduction",
        "Reels/shorts repurposed from episodes",
        "Multiple format expart for all platforms",
        "Content strategy & growth support",
      ],
      bonus: {
        title: "Bonuses you will get with\nMontage Motion Limited",
        items: [
          "Social-Ready Clips ",
          "Episode Thumbnails",
          "Content Strategy Support",
        ],
      },
    },
    {
      id: "freelancers",
      title: "Freelancers",
      items: [
        "Full podcasting editing ",
        "Intro/outro creation (basic to mid-level)",
        "Audio cleanup & noise reduction",
        "sound effects & music (stack options)",
        "Multiple format export (common formats)",
      ],
    },
  ],
};
const PodcastWhychooseus = () => {
  return (
    <div className="container sectionGap">
      <Heading
        subtitle="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing "
        tag="Our Service"
        title="Our Process for your"
        extratitle="Online Growth"
      />
      <div className="grid gap-5 sm:gap-6 md:gap-8  grid-cols-1 md:grid-cols-3 lg:mt-16 mt-9">
        {comparisonData.columns.map((col) => (
          <ColumnCard key={col.id} column={col} />
        ))}
      </div>
    </div>
  );
};

export default PodcastWhychooseus;
