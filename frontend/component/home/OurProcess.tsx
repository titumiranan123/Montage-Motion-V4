/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading } from "../share/Headering";
import ProcessSlider from "./ProcessSlider";

export const OurProcess = ({ data }: { data: any }) => {
  return (
    <div className="mx-auto max-w-7xl px-2 sectionGap">
      <Heading
        subtitle={data?.paragraph}
        title={data?.heading_part1}
        tag={data?.tag}
        isbackground={true}
        width="160"
      />
      <ProcessSlider data={data?.process_steps} />
    </div>
  );
};

export default OurProcess;
