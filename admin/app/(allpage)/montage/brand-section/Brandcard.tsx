"use client";
import { api_url } from "@/hook/Apiurl";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const Brandcard = ({ dt }: { dt: any }) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await api_url.delete(`/api/brand/images/${id}`);

        if (res.status === 200) {
          router.refresh();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div className="relative">
      <button
        onClick={() => handleDelete(dt.id)}
        className="absolute -right-5  -top-1 cursor-pointer"
      >
        <Trash className="text-red-500 " />
      </button>
      <Image alt={dt?.alt} src={dt?.image} width={120} height={40} />
    </div>
  );
};

export default Brandcard;
