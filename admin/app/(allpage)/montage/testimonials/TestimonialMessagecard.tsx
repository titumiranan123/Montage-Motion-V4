import { api_url } from "@/hook/Apiurl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
export interface ITestimonial {
  id?: string;
  name: string;
  designation: string;
  image: string;
  thumbnail: string;
  video_message?: string;
  message?: string;
  position?: number;
  category: "message" | "video_message";
  type: string;
}
const TestimonialMessagecard = ({
  testimonial,
  setEditData,
  setTestimonial,
}: {
  testimonial: ITestimonial;
  setEditData: (testimonial: ITestimonial) => void;
  setTestimonial: (a: boolean) => void;
}) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: "Deleting...",
          text: "Please wait while we delete the video",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await api_url.delete(`/api/testimonials/${id}`);
        router.refresh();
        Swal.fire({
          title: "Deleted!",
          text: "Your Testimonial has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to Testimonial the video",
          icon: "error",
        });
      }
    }
  };
  return (
    <div className="testimonialTextcard flex flex-col gap-8">
      <p
        title={testimonial?.message}
        className="h-24 overflow-hidden text-ellipsis line-clamp-4"
      >
        {testimonial?.message}
      </p>
      <div className="flex justify-start gap-10 items-center">
        <Image
          className="rounded-full w-[64px] h-[64px] overflow-hidden"
          src={testimonial?.image}
          alt=""
          width={64}
          height={64}
          priority
        />
        <div>
          <h2 className="font-bold text-2xl">{testimonial?.name}</h2>
          <p className="text-[16px] font-[400] ">{testimonial?.designation}</p>
        </div>
      </div>
      <div className="flex justify-around items-center">
        <button
          className="flex items-center gap-2 border py-2 px-3 rounded-md"
          onClick={() => {
            setEditData(testimonial);
            setTestimonial(true);
          }}
        >
          {" "}
          <FaEdit />
          <span>Edit Testimonail</span>
        </button>
        <button
          className="flex items-center gap-2 border py-2 px-3 rounded-md hover:text-red-500"
          onClick={() => handleDelete(testimonial?.id as string)}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default TestimonialMessagecard;
