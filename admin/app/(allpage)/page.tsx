import StatsCard from "@/component/StatsDashboard";
import { getData } from "@/utils/getDate";
const Dashboard = async () => {
  const data = await getData({ slug: "dashboard/overview" });
  const overview = !Array.isArray(data) && data ? data : {};
  return (
    <div className="container mx-auto px-6 py-4">
      <div className="text-white flex gap-3 flex-col">
        <h2 className=" mb-8 text-white font-semibold  text-2xl">
          Dashboard Overview :
        </h2>
        <div className="text-white flex gap-3">
          <StatsCard title="Total Works" value={overview.fullWorksCount ?? 0} />
          <StatsCard title="Short Works" value={overview.shortsWorksCount ?? 0} />
          <StatsCard title="Testimonials" value={overview.testimonialCount ?? 0} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
