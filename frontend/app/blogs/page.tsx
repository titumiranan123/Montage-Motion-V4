"use client";
import useBlog from "@/src/hook/useBlogs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Blogs = () => {
  const { data ,isLoading } = useBlog();
  return (
    <div  className="relative container lg:mt-20 mt-16 min-h-screen header-background pagelogo">
      <div className="text-white flex flex-col justify-center items-center lg:w-[695px] gap-6 mx-auto w-full">
        <h2 data-aos="fade-up"
          data-aos-delay="300" className="satoshi gradienttext">Read Our Blogs</h2>
        <p
        data-aos="fade-up"
          data-aos-delay="400"
        >
          Montage Motion is an Advertising and Digital Agency specializing in
          Influencer Marketing.
        </p>
      </div>
      <div className="grid grid-cols-1 max-w-[1000px] mx-auto w-full md:grid-cols-2 gap-5 mt-10 lg:mt-16" >
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
  slug
}: {
  image: string;
  title: string;
  short_description: string;
  slug:string
}) => {
  return (
    <Link style={{ boxShadow: "0px 4px 60px 0px #1FB5DD29 inset" }} href={`/blogs/${slug}`} className="lg:w-[488px] block cursor-pointer lg:h-[386.46px] rounded-[17.45px] p-4 text-[#58585833] border border-[#58585833] backdrop-blur-[25.82px] overflow-hidden">
      <div className="lg:w-[456px] lg:h-[242px] overflow-hidden">
        <Image src={image} alt={title} width={456} height={242} priority />
      </div>
      <div className="mt-4">
        <h3 className="text-white md:text-[18px] text-[22px] font-[700] leading-[26px] ">{title.slice(0,60)} {title.length > 60 ?". . . . .":""}</h3>
        <p  className="text-white"> {short_description.slice(0,60)} {short_description.length > 60 ?". . . . .":""}</p>
      </div>
    </Link>
  );
};

export default Blogs;
