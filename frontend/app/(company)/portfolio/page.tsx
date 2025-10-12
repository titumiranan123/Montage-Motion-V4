import Heading from "@/component/share/Headering";
import React from "react";
import Portfoliotab from "./Portfoliotab";
import axios from "axios";

const Portfolio = async ({ searchParams }: { searchParams: any }) => {
  const { search, cat } = await searchParams;
  const res = await axios.get(
    `https://api-v2.montagemotion.com/api/website/data?type=${
      cat ? cat : "main"
    }&search=${search}`
  );
  const data = res.data;
  console.log(data);
  return (
    <div>
      <Heading
        title="Blogs"
        subtitle="Explore tips, trends, and strategies from the world of video editing, content creation, and digital marketing."
        tag="Blogs"
      />
      <Portfoliotab />
    </div>
  );
};

export default Portfolio;
