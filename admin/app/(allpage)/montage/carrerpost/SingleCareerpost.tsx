import Image from "next/image";
import React from "react";
import Heading from "../page-service/Headering";
import Gradientcard from "../page-service/Gradientcard";
import PricingCard from "./Careercard";
import CareerCard from "./Careercard";

const SinglePricePlan = ({ data }: { data: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        subtitle={data?.paragraph}
        title={data?.heading_part1}
        extratitle={data?.heading_part2}
        tag={data?.tag}
      />
      <div className="lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {" "}
        {data?.jobposts?.map((dt: any, idx: number) => (
          <CareerCard job={dt} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default SinglePricePlan;
