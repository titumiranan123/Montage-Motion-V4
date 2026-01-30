import { getData } from "@/utils/getDate";
import ComparisonForm from "./ComparisonForm";
import ComparisonWrapper from "./ComparisonWrapper";

export default async function ComparisonPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;

  const data = await getData({ slug: `comparison?page=${page ?? "home"}` });
  // console.log(
  //   data?.columns?.[2].entries.filter((en) => en.entry_type === "item"),
  // );
  // console.log(data?.columns);
  return (
    <div className="w-full">
      <ComparisonWrapper data={data} />
    </div>
  );
}
