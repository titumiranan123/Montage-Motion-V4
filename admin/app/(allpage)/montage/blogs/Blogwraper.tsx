"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCardHorizontal from "@/component/blogs/Blogcard";
import BlogForm from "@/component/blogs/Blogform";
import React, { useState } from "react";

const Blogwraper = ({ data }: { data: any }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Blog Page</h1>
          <p className="text-gray-400">Manage your Blogs</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Add section */}
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="bg-[#1FB5DD] text-white py-2 px-6 rounded-lg"
          >
            Add Blog
          </button>
        </div>
      </div>
      <div>
        {data?.map((bg: any, idx: number) => (
          <BlogCardHorizontal key={idx} blog={bg} />
        ))}
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm p-4 z-50 overflow-y-auto flex justify-center items-center">
          <BlogForm onCancel={setOpen} />
        </div>
      )}
    </div>
  );
};

export default Blogwraper;
