/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api_url } from "@/hook/Apiurl";
import { Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const Brandcard = ({ dt, onEdit }: { dt: any; onEdit: () => void }) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirmation.isConfirmed) return;

    try {
      const res = await api_url.delete(`/api/team-image/${id}`);
      if (res.status === 200) {
        router.refresh();
        toast.success("Team image deleted successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete team image");
    }
  };
  return (
    <div className="relative w-[120px] overflow-hidden rounded-xl bg-slate-900/40">
      <div className="absolute inset-x-1 top-1 z-10 flex items-center justify-between gap-1">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 rounded-md bg-black/75 px-2 py-1 text-xs font-medium text-cyan-300 shadow-sm transition-colors hover:bg-black"
          aria-label="Edit team image"
        >
          <Pencil size={12} />
          Edit
        </button>
        <button
          type="button"
          onClick={() => handleDelete(dt.id)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-black/75 text-red-400 shadow-sm transition-colors hover:bg-black hover:text-red-300"
          aria-label="Delete team image"
          title="Delete team image"
        >
          <Trash size={15} />
        </button>
      </div>
      <Image
        alt={dt?.alt}
        src={dt?.image}
        width={120}
        height={40}
        className="block h-auto w-full object-contain"
      />
    </div>
  );
};

export default Brandcard;
