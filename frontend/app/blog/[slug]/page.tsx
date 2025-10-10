"use client";
import useBlogSingle from "@/src/hook/useBlogsingle";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const SingleBlog = () => {
  const param = useParams();
  const { data } = useBlogSingle(param?.slug as string);
  return (
    <div className="max-w-[964px] min-h-screen mx-auto flex flex-col pagelogo  mt-16 lg:mt-30 px-2">
      <div>
        <Image src={data?.image} alt={data?.title} width={900} height={500} priority />
      </div>
      <div className="mt-5 max-w-[764px]  mx-auto ">
        <h3 className="text-white">{data?.title}</h3>
        <div
          className="text-white mt-10"
          dangerouslySetInnerHTML={{ __html: data?.description }}
        ></div>
      </div>
    </div>
  );
};

export default SingleBlog;
