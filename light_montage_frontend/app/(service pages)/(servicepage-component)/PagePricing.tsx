/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading } from "@/component/share/Headering";
import PricingCard from "@/component/share/PricingCard";

const PagePricing = ({ pricing }: { pricing: any }) => {
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

export default PagePricing;
