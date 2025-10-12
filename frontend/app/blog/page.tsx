import Heading from "@/component/share/Headering";
import axios from "axios";

import React from "react";
import Blogtab from "./Blogtab";
import Blogcard from "./Blogcard";
export const metadata = {
  title: "Blog | MontageMotion - Tips, Trends & Insights in Video Editing",
  description:
    "Explore expert articles, creative tips, and the latest trends in video editing, content creation, and digital marketing from the MontageMotion team.",
};

const Blogs = async ({ searchParams }: { searchParams: any }) => {
  const { cat, search } = await searchParams;
  const res = await axios.get(
    `https://api-v2.montagemotion.com/api/website/blog?category=${cat}&search=${search}`
  );
  const data = res.data.data;
  return (
    <div className="relative container lg:mt-20 mt-16 min-h-screen header-background pagelogo">
      <Heading
        tag="Blogs"
        title="Insights & Ideas"
        subtitle="Explore tips, trends, and strategies from the world of video editing, content creation, and digital marketing ."
      />
      <Blogtab />
      <div className="grid grid-cols-1 max-w-[1000px] mx-auto w-full md:grid-cols-2 gap-5 mt-10 lg:mt-16">
        {data?.map((blog: any, idx: number) => (
          <div key={idx} data-aos="fade-up" data-aos-delay={100 + idx * 100}>
            <Blogcard
              image={blog.image}
              title={blog.title}
              short_description={blog.short_description}
              slug={blog.slug}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
