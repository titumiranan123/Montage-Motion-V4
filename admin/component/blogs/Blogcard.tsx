import Image from "next/image";
import { FiEdit2, FiTrash2, FiEye, FiEyeOff, FiStar } from "react-icons/fi";
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
  onEdit: (blog: IBlog) => void;
  onDelete: (id: string) => void;
  onTogglePublish?: (id: string, is_publish: boolean) => void;
  onToggleFeature?: (id: string, is_feature: boolean) => void;
}

const BlogCardHorizontal = ({
  blog,
  onEdit,
  onDelete,
  onTogglePublish,
  onToggleFeature,
}: BlogCardProps) => {
  return (
    <div className="flex flex-col border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white w-full sm:w-[350px] rounded-[21px] overflow-hidden">
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
      <div className="flex flex-col p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {blog.title}
          </h3>

          <div className="flex gap-2">
            {blog.is_publish !== undefined && (
              <button
                onClick={() => onTogglePublish?.(blog.id!, !blog.is_publish)}
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

            {blog.is_feature !== undefined && (
              <button
                onClick={() => onToggleFeature?.(blog.id!, !blog.is_feature)}
                className={`p-2 rounded-full ${
                  blog.is_feature
                    ? "text-yellow-600 bg-yellow-50"
                    : "text-gray-500 bg-gray-50"
                }`}
                aria-label={blog.is_feature ? "Featured" : "Not featured"}
              >
                <FiStar />
              </button>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm mt-1 mb-3 line-clamp-3">
          {blog.short_description}
        </p>

        <div className="flex gap-2 mt-auto pt-2">
          <button
            onClick={() => onEdit(blog)}
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
    </div>
  );
};

export default BlogCardHorizontal;
