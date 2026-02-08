import Image from "next/image";
import React from "react";

interface BlogHeaderProps {
  data: {
    updatedAt: string;
    readTime: string;
    author: string;
  };
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ data }) => {
  const { updatedAt, readTime, author } = data;

  return (
    <div className="flex items-center text-(--text-primary) gap-4 mt-3 md:flex-row flex-wrap">
      <div className="flex items-center gap-2">
        <Image src="/assets/icon/date.png" alt="date" width={24} height={24} />
        <p>Updated on: {updatedAt}</p>
      </div>

      <div className="flex items-center gap-2">
        <Image
          src="/assets/icon/clock-01.png"
          alt="read time"
          width={24}
          height={24}
        />
        <p>{readTime} Read</p>
      </div>

      <div className="flex items-center gap-2">
        <Image
          src="/assets/icon/author.png"
          alt="author"
          width={24}
          height={24}
        />
        <p>Author: {author}</p>
      </div>
    </div>
  );
};

export default BlogHeader;
