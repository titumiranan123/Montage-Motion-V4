/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading } from "../share/Headering";
import { ColumnCard } from "./ColumnCard";

// ----- MAIN EXPORT -----
export default function ComparisonCards({ data }: { data: any }) {
  return (
    <div className="mx-auto  container sectionGap">
      <Heading
        subtitle={data?.paragraph}
        tag={data?.tag}
        title={data?.heading_title}
        width="160"
        isbackground={true}
        className="max-w-2xl!"
      />
      <div className="grid gap-5 sm:gap-6 md:gap-8  grid-cols-1 md:grid-cols-3 lg:mt-16 mt-9">
        {data?.columns?.map((col: any, idx: number) => (
          <div
            key={col?.id}
            data-aos="fade-up"
            data-aos-delay={100 + idx * 100}
          >
            <ColumnCard key={col?.id} column={col} />
          </div>
        ))}
      </div>
    </div>
  );
}
