import Heading from "../share/Headering";
import { ColumnCard } from "./ColumnCard";

// ----- JSON DATA (edit freely) -----
const comparisonData = {
  columns: [
    {
      id: "montage",
      title: null,
      items: [
        "20+ in-house team to grow your online presence",
        "Experienced team",
        "1000+ projects completed successfully",
        "All time support",
        "All time support",
        "All time support",
        "All time support",
        "All time support",
        "All time support",
        "All time support",
      ],
      bonus: {
        title: "Bonuses you will get with\nMontage Motion Limited",
        items: [
          "20+ in-house team to grow your online presence",
          "Experienced team",
          "1000+ projects completed successfully",
        ],
      },
    },
    {
      id: "agencies",
      title: "Other Agencies",
      items: [
        "20+ in-house team to grow your online presence",
        "Experienced team",
        "1000+ projects completed successfully",
        "All time support",
        "All time support",
        "All time support",
        "All time support",
        "All time support",
      ],
    },
    {
      id: "freelancers",
      title: "Freelancers",
      items: [
        "20+ in-house team to grow your online presence",
        "Experienced team",
        "1000+ projects completed successfully",
        "All time support",
        "All time support",
        "All time support",
        "All time support",
      ],
    },
  ],
};

// ----- MAIN EXPORT -----
export default function ComparisonCards() {
  return (
    <div className="mx-auto container sectionGap">
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
}
