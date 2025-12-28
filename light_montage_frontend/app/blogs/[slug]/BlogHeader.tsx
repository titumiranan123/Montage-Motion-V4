import Image from "next/image";
import React from "react";

const BlogHeader = () => {
  return (
    <div className="flex items-center text-white gap-4 mt-3 md:flex-row flex-wrap">
      <div className="flex items-center gap-2">
        <Image
          src={"/assets/icon/date.png"}
          alt="date"
          width={24}
          height={24}
        />
        <p>Updated on: 03 October, 2025 </p>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src={"/assets/icon/clock-01.png"}
          alt="date"
          width={24}
          height={24}
        />
        <p>10 Mins Read</p>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src={"/assets/icon/author.png"}
          alt="date"
          width={24}
          height={24}
        />
        <p>Author : Jaber Hossain </p>
      </div>
    </div>
  );
};

export default BlogHeader;
