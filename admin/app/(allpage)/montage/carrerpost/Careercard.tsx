/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Gradientcard from "../page-service/Gradientcard";
import { api_url } from "@/hook/Apiurl";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
interface priceProp {
  job: any;
}
const CareerCard: React.FC<priceProp> = ({ job }) => {
  const router = useRouter();

  const deleteJob = async () => {
    const result = await Swal.fire({
      title: "Delete job post?",
      text: "This job post will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
      cancelButtonText: "Keep",
      background: "#1f2937",
      color: "#fff",
    });
    if (!result.isConfirmed || !job?.id) return;
    try {
      await api_url.delete(`/api/jobpost/job/${job.id}`);
      toast.success("Job post deleted successfully");
      router.refresh();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to delete job post");
    }
  };
  return (
    <Gradientcard
      className="max-w-[384px] w-full h-full min-h-[425px] rounded-3xl py-6 px-5 text-[#E4E8F7] flex flex-col"
      borderClassName="max-w-[384px] w-full h-full min-h-[425px] rounded-[24px] p-[1px]"
    >
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-[12px] opensans font-normal">
            {job?.positions_available} Positions
          </p>
          <p className="text-[12px] opensans font-normal">
            Deadline: {job?.deadline}
          </p>
        </div>
        <h2 className="text-[20px] md:text-[24px] poppins font-semibold">
          {job?.job_title}
        </h2>
        <p className="text-[14px] md:text-[16px] opensans font-normal">
          {job?.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
            {job?.employment_type}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
            {job?.work_arrangement}
          </span>
        </div>
        <div className="flex justify-start items-center lg:mt-6 lg:mb-6">
          <p className="text-[34px] font-semibold poppins flex items-center text-white gap-2">
            <span>{job?.salary?.currency}</span>
            {job?.salary?.amount}
          </p>
          <p className="text-[16px] font-normal mt-2 opensans">{job?.salary?.unit}</p>
        </div>
      </div>
      <div className="mt-auto flex flex-col">
        <style>
          {`
  .btn-colors:hover{
    background: linear-gradient(96.76deg, #FFFFFF -19.08%, #1FB5DD 48.57%, #FFFFFF 116.22%);

  }
  
  `}
        </style>
        <a
          href={job?.applylink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ boxShadow: "0px 0px 25px 0px #FFFFFF40 inset" }}
          className="w-full bg-white/20 backdrop-blur-[20px] text-white h-12 btn-colors hover:text-black py-4 px-5 rounded-2xl flex justify-center items-center poppins font-medium"
        >
          Apply Now
        </a>
        <button
          type="button"
          onClick={deleteJob}
          className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-red-400/50 text-sm font-medium text-red-300 transition-colors hover:border-red-300 hover:bg-red-500/10 hover:text-red-200"
        >
          <Trash2 size={15} />
          Delete Job Post
        </button>
      </div>
    </Gradientcard>
  );
};

export default CareerCard;
