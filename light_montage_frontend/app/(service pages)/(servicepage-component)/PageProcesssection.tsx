/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading } from "@/component/share/Headering";

import PageProcessslider from "./PageProcessslider";

export const PageProcesssection = ({ data }: { data: any }) => {
  return (
    <div className="mx-auto max-w-7xl sectionGap">
      <Heading
        subtitle={data?.paragraph ?? ""}
        tag={data?.tag ?? ""}
        title={data?.heading_part1 ?? ""}
        extratitle={data?.heading_part2 ?? ""}
        width="160"
        isbackground={true}
      />

      <PageProcessslider data={data?.process_steps} />
    </div>
  );
};

export default PageProcesssection;
