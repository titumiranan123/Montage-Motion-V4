import { getData } from "@/utils/getDate";
import React from "react";
import Blogwraper from "./Blogwraper";

const Blogs = async () => {
  const data = await getData({ slug: "/blogs" });

  return (
    <div>
      <Blogwraper data={data} />
    </div>
  );
};

export default Blogs;
