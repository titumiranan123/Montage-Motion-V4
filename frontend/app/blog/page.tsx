import Gradientcard from "@/component/share/Gradientcard";
import Heading from "@/component/share/Headering";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Blogtab from "./Blogtab";
export const metadata = {
  title: "Blog | MontageMotion - Tips, Trends & Insights in Video Editing",
  description:
    "Explore expert articles, creative tips, and the latest trends in video editing, content creation, and digital marketing from the MontageMotion team.",
};

const Blogs = async () => {
  const res = await axios.get(
    "https://api-v2.montagemotion.com/api/website/blog"
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
const Blogcard = ({
  image,
  title,
  short_description,
  slug,
}: {
  image: string;
  title: string;
  short_description: string;
  slug: string;
}) => {
  return (
    <Gradientcard
      className="max-w-[384px] w-full max-h-[616px] h-full rounded-[17.45px]"
      borderClassName="max-w-[384px] w-full max-h-[616px] h-full rounded-[17.45px] p-[1px]"
    >
      <Link
        href={`/blog/${slug}`}
        className=" p-4  overflow-hidden block cursor-pointer"
      >
        <div className="max-w-[344px] max-h-[276px] w-full h-full overflow-hidden">
          <Image src={image} alt={title} width={456} height={242} priority />
        </div>

        <div className="mt-8 text-[#E4E8F7]">
          <div className="flex justify-between items-center">
            <p className="text-[12px] font-[400] opensans">5 Minutes Read</p>
            <p className="text-[12px] font-[400] opensans">
              September 25, 2025
            </p>
          </div>
          <h3 className=" md:text-[18px] text-[22px] font-[600] leading-[26px] mt-2 poppins">
            {title.slice(0, 60)} {title.length > 60 ? ". . . . ." : ""}
          </h3>
          <p className="text-[14px] md:text-[16px] opensans font-[400] mt-2">
            {" "}
            {short_description.slice(0, 120)}{" "}
            {short_description.length > 120 ? ". . . . ." : ""}
          </p>
          <p className="text-[16px] font-[400] opensans max-w-[200px] bg-[#141B34] mt-6 md:mt-8 rounded-[36px] py-2 px-3 md:px-4 flex justify-center items-center">
            Video Editing TIps
          </p>
        </div>
      </Link>
    </Gradientcard>
  );
};

export default Blogs;
