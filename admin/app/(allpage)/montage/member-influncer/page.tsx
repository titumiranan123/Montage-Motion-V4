/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { MemberProfileCard } from "./MemberProfileCard";
import { MemberProfile } from "@/interface/interface";
import useMembers from "@/hook/useMember";
import { MemberProfileForm } from "./Memberform";
import { api_url } from "@/hook/Apiurl";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import { GripVertical } from "lucide-react";

const Member = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { data = [], isLoading, isError, refetch } = useMembers();
  const [orderedMembers, setOrderedMembers] = useState<MemberProfile[] | null>(null);
  const [draggedMemberId, setDraggedMemberId] = useState<string | null>(null);
  const [isReordering, setIsReordering] = useState(false);
  const members = orderedMembers ?? (data as MemberProfile[]);

  const handleCreateNew = () => {
    setIsCreating(true);
    setIsFormOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (formData: MemberProfile) => {
    try {
      const res = isCreating
        ? await api_url.post("/api/members", formData)
        : await api_url.put(`/api/members/${formData.id}`, formData);
      await refetch();
      Swal.fire({
        title: res.data.message,
        icon: "success",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#6366f1",
      });

      setIsFormOpen(false);
    } catch (err: any) {
      Swal.fire({
        title: "Something went wrong!",
        text:
          err.response?.data?.message ||
          err.response?.data?.errorDetails?.[0]?.message ||
          "Failed to save member",
        icon: "error",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#6366f1",
      });
    }
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    memberId: string,
  ) => {
    setDraggedMemberId(memberId);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", memberId);
  };

  const handleDrop = async (
    event: React.DragEvent<HTMLDivElement>,
    targetMemberId: string,
  ) => {
    event.preventDefault();
    const sourceMemberId = draggedMemberId || event.dataTransfer.getData("text/plain");

    if (!sourceMemberId || sourceMemberId === targetMemberId || isReordering) {
      setDraggedMemberId(null);
      return;
    }

    const sourceIndex = members.findIndex((member) => member.id === sourceMemberId);
    const targetIndex = members.findIndex((member) => member.id === targetMemberId);
    if (sourceIndex === -1 || targetIndex === -1) {
      setDraggedMemberId(null);
      return;
    }

    const reorderedMembers = [...members];
    const [movedMember] = reorderedMembers.splice(sourceIndex, 1);
    reorderedMembers.splice(targetIndex, 0, movedMember);
    setOrderedMembers(reorderedMembers);
    setDraggedMemberId(null);
    setIsReordering(true);

    try {
      await api_url.patch("/api/members/positions", {
        members: reorderedMembers.map((member, index) => ({
          id: member.id,
          position: index + 1,
        })),
      });
      await refetch();
      setOrderedMembers(null);
      Swal.fire({
        title: "Order updated",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
        background: "#1f2937",
        color: "#fff",
      });
    } catch (err) {
      setOrderedMembers(null);
      const response = (err as { response?: { data?: { message?: string } } })
        .response;
      Swal.fire({
        title: "Order update failed",
        text: response?.data?.message ?? "Could not update member order",
        icon: "error",
        background: "#1f2937",
        color: "#fff",
      });
    } finally {
      setIsReordering(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Our Team </h1>

          <div className="flex gap-2.5">
            <button
              onClick={handleCreateNew}
              className="px-4 py-1 h-12 bg-[#1FB5DD] text-white rounded-md flex items-center gap-4"
            >
              Add New Member <FaPlus />
            </button>
          </div>
        </div>

        {/* Members grid */}
        <div className="grid grid-cols-1 md:grid-cols-4  gap-6">
          {isLoading && (
            <div className="col-span-full text-center py-12 text-gray-400">
              Loading members...
            </div>
          )}
          {isError && (
            <div className="col-span-full text-center py-12 text-red-400">
              Could not load members. Please try again.
            </div>
          )}
          {!isLoading && !isError && members.map((member) => (
            <div
              key={member.id}
              draggable={!isReordering}
              onDragStart={(event) => member.id && handleDragStart(event, member.id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => member.id && handleDrop(event, member.id)}
              onDragEnd={() => setDraggedMemberId(null)}
              className={`relative transition-opacity ${
                draggedMemberId === member.id ? "opacity-50" : "opacity-100"
              } ${isReordering ? "cursor-wait" : "cursor-grab active:cursor-grabbing"}`}
              title="Drag to change member order"
            >
              <div className="absolute right-3 top-3 z-10 rounded-md bg-gray-900/80 p-1 text-gray-300">
                <GripVertical size={16} aria-hidden="true" />
              </div>
              <MemberProfileCard profile={member} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {!isLoading && !isError && members.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-300">No members found</p>
          </div>
        )}

        {/* Form modal */}
        {isFormOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start text-white justify-center p-4 z-50 w-full overflow-y-auto"
            onClick={() => setIsFormOpen(false)}
          >
            <div
              className="relative w-full max-w-4xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute right-3 top-3 z-10 text-gray-300 hover:text-white"
                aria-label="Close member form"
              >
                ✕
              </button>
              <MemberProfileForm
                onSubmit={handleSubmit}
                defaultValues={undefined}
                onCancel={() => setIsFormOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Member;
