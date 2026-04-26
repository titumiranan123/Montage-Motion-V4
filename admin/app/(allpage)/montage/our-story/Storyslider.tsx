/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Heading from "../page-service/Headering";
import ProcessSlider from "./ProcessSlider";

const StroySlider = ({ data }: { data: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        subtitle={data?.paragraph}
        title={data?.heading_part1}
        extratitle={data?.heading_part2}
        tag={data?.tag}
      />
      <ProcessSlider data={data?.ourstory_steps} />
    </div>
  );
};

export default StroySlider;
