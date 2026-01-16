import React from "react";
import { getData } from "@/utils/getDate";
import Homewrapper from "./Homewrapper";

const Header: React.FC<{ searchParams: any }> = async ({ searchParams }) => {
  const { page } = await searchParams;
  const data = await getData({ slug: `header?type=${page}` });
  return (
    <section className="min-h-screen text-gray-100 p-4 md:p-8 relative">
      <div className="max-w-7xl mx-auto">
        <Homewrapper initialData={data} />
      </div>
    </section>
  );
};

export default Header;
