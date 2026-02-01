"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MemberProfile } from "@/interface/interface";
import { MemberProfileForm } from "./Memberform";
import { api_url } from "@/hook/Apiurl";
import useMembers from "@/hook/useMember";

interface MemberProfileCardProps {
  profile: Partial<MemberProfile>;
}

export function MemberProfileCard({ profile }: MemberProfileCardProps) {
  const { refetch } = useMembers();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = async (formData: MemberProfile) => {
    try {
      const response = await api_url.put(
        `/api/members/${formData.id}`,
        formData,
      );
      await Swal.fire({
        title: response.data.message,
        icon: "success",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#6366f1",
      });
      setIsFormOpen(false);
      refetch();
    } catch (err: any) {
      await Swal.fire({
        title: "Error!",
        text:
          err.response?.data?.errorMessage?.[0]?.message ||
          "Failed to update member",
        icon: "error",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#6366f1",
      });
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#1f2937",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: "Deleting...",
          allowOutsideClick: false,
          background: "#1f2937",
          color: "#fff",
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await api_url.delete(`/api/members/${id}`);

        await Swal.fire({
          title: "Deleted!",
          text: "The member has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#1f2937",
          color: "#fff",
        });

        refetch();
      } catch (err) {
        await Swal.fire({
          title: "Error!",
          text: err instanceof Error ? err.message : "Failed to delete member",
          icon: "error",
          background: "#1f2937",
          color: "#fff",
        });
      }
    }
  };
  if (!profile) return null;
  return (
    <div className="w-[280px] mx-auto text-white rounded-xl shadow-md overflow-hidden  border p-4 border-[#1FB5DD]">
      {/* Header with Photo on Right and Basic Info on Left */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Photo on Right */}
        <div className="md:shrink-0">
          <img
            className="h-48 w-[250px]  object-cover md:h-full  rounded-lg"
            src={profile.photourl}
            alt={`${profile.name}'s profile`}
          />
          <div className="flex flex-col gap-2 mt-4">
            <h1 className="block mt-1 text-lg leading-tight font-medium text-white">
              {profile.name}
            </h1>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-white line-clamp-1 ">
              {profile.designation}
            </h1>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 cursor-pointer text-[#1FB5DD] hover:text-[#1a9fc4]"
          aria-label="Edit member"
        >
          <FaEdit />
          <span>Edit</span>
        </button>

        <button
          onClick={() => profile.id && handleDelete(profile.id)}
          className="flex items-center gap-2 text-gray-300 hover:text-red-500"
          aria-label="Delete member"
        >
          <FaTrash />
          <span>Delete</span>
        </button>
      </div>

      {/* Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end items-center mb-4">
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-red-400 font-bold hover:text-red-600 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <MemberProfileForm
              onSubmit={handleSubmit}
              defaultValues={profile}
            />
          </div>
        </div>
      )}
    </div>
  );
}
