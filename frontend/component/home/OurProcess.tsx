import React from "react";
import Heading from "../share/Headering";
import AIProcess from "../share/Timeline";

const OurProcess = ({ process }: { process: any }) => {
  console.log(process);
  return (
    <div>
      <Heading
        tag="Our Services"
        title="Our Process for Your Online Growth"
        subtitle="Montage Motion is an Advertising and Digital Agency specializing in influencer Marketing"
      />
      <AIProcess data={process?.process_steps} />
    </div>
  );
};

export default OurProcess;
