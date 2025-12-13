import React from "react";
import { Heading } from "../share/Headering";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OurProcess = ({ process }: { process: any }) => {
  // console.log(process);
  return (
    <div>
      <Heading
        tag="Our Services"
        title="Our Process for Your Online Growth"
        subtitle="Montage Motion is an Advertising and Digital Agency specializing in influencer Marketing"
      />
    </div>
  );
};

export default OurProcess;
