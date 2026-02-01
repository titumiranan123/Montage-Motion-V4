import StatsCard from "@/component/StatsDashboard";
import { getData } from "@/utils/getDate";
import React from "react";
const Dashboard = async () => {
  const data = await getData({ slug: "dashboard/overview" });
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-white flex gap-3 flex-col">
        <h2 className="mt-10 mb-8 text-white font-semibold  text-2xl">
          Dashboard Overview :
        </h2>
        <div className="text-white flex gap-3">
          <StatsCard title="Total Works" value={data?.fullWorksCount} />
          <StatsCard title="Short Works" value={data?.shortsWorksCount} />
          <StatsCard title="Testimonials" value={data?.testimonialCount} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
