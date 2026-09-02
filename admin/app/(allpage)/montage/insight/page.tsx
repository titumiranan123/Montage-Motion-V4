import { getData } from "@/utils/getDate";
import ComparisonWrapper from "./InsightWrapper";

export default async function ComparisonPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  const data = await getData({ slug: `insight?page=${page ?? "home"}` });
  return (
    <div className="w-full">
      <ComparisonWrapper data={Array.isArray(data) ? data[0] : undefined} />
    </div>
  );
}
