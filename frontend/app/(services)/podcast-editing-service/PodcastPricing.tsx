import Heading from "@/component/share/Headering";
import PricingCard from "@/component/share/PricingCard";
import React from "react";
const pricingInfo = {
  plans: [
    {
      name: "Starter Plan",
      description: "Perfect for new creators testing the waters.",
      price: 149,
      billing_cycle: "per month",
      features: [
        "5 Reels/Shorts per month",
        "Basic editing (cuts, captions, music)",
        "Standard turnaround (3–4 days)",
        "1 free revision",
      ],
      button_text: "Get Started",
    },
    {
      name: "Growth Plan",
      description: "For creators & brands building consistency.",
      price: 399,
      billing_cycle: "per month",
      features: [
        "15 Reels/Shorts per month",
        "Advanced editing (transitions, motion graphics, effects)",
        "Fast turnaround (2–3 days)",
        "2 revisions per video",
        "Thumbnail design included",
      ],
      button_text: "Get Started",
    },
    {
      name: "Pro Plan",
      description: "For businesses & influencers ready to scale.",
      price: 799,
      billing_cycle: "per month",
      features: [
        "30+ Reels/Shorts per month",
        "Premium editing (custom animations, branded templates, effects)",
        "Priority turnaround (24–48 hrs)",
        "Unlimited revisions",
        "Content strategy support",
        "Dedicated editor",
      ],
      button_text: "Get Started",
    },
  ],
};
const PodcastPricing = ({ pricing }: { pricing: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        title={pricing?.heading_part1}
        extratitle={pricing?.heading_part2}
        tag={pricing?.tag}
        subtitle={pricing?.paragraph}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 md:mt-10">
        {pricing?.packages?.map((price: any, idx: number) => (
          <PricingCard price={price} key={idx} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default PodcastPricing;
