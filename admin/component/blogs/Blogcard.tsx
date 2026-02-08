/* eslint-disable @typescript-eslint/no-explicit-any */
import { api_url } from "@/hook/Apiurl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";
import BlogForm from "./Blogform";
interface IBlog {
  id?: string;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  keywords?: string[];
  short_description: string;
  description: string;
  image: string;
  alt: string;
  is_publish?: boolean;
  is_feature?: boolean;
  is_position?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
interface BlogCardProps {
  blog: IBlog;
}

const BlogCardHorizontal = ({ blog }: BlogCardProps) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [initialData, setInitialData] = useState({});
  const onDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Blog?",
      text: "This will permanently remove the blog post.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
      cancelButtonText: "Keep",
      background: "#1f2937",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        const res = await api_url.delete(`/api/blogs/${id}`);

        if (res.status === 200 || res.status === 204) {
          toast.success("Blog deleted successfully");
          router.refresh();
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to delete blog");
      }
    }
  };

  return (
    <div className="flex flex-col border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white w-full sm:w-87.5 rounded-[21px] overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-56 rounded-t-[21px] overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {blog.title}
          </h3>

          <div className="flex gap-2">
            {blog.is_publish !== undefined && (
              <button
                className={`p-2 rounded-full ${
                  blog.is_publish
                    ? "text-[#1FB5DD] bg-green-50"
                    : "text-gray-500 bg-gray-50"
                }`}
                aria-label={blog.is_publish ? "Published" : "Unpublished"}
              >
                {blog.is_publish ? <FiEye /> : <FiEyeOff />}
              </button>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm mt-1 mb-3 line-clamp-3">
          {blog.short_description}
        </p>

        <div className="flex gap-2 mt-auto pt-2">
          <button
            onClick={() => {
              setOpen(true);
              setInitialData(blog);
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-[#1FB5DD] rounded hover:bg-[#1FB5DD]/20 transition-colors"
          >
            <FiEdit2 size={16} />
            Edit
          </button>

          <button
            onClick={() => onDelete(blog.id!)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
          >
            <FiTrash2 size={16} />
            Delete
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm p-4 z-50 overflow-y-auto flex justify-center items-center">
          <BlogForm onCancel={setOpen} initialData={initialData} />
        </div>
      )}
    </div>
  );
};

export default BlogCardHorizontal;
