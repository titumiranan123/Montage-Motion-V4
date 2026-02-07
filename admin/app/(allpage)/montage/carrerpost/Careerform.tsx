/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api_url } from "@/hook/Apiurl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                   */
/* -------------------------------------------------------------------------- */
export interface IJob {
  id?: string;
  job_title: string;
  positions_available: number;
  deadline: string;
  description: string;
  employment_type:
    | "Full time"
    | "Part time"
    | "Internship"
    | "Contract"
    | "Temporary"
    | "Freelance"
    | "Volunteer"
    | "Apprenticeship"
    | "Commission";
  work_arrangement:
    | "Remote"
    | "On-site"
    | "Hybrid"
    | "In House"
    | "Flexible"
    | "Field Work";
  salary?: {
    amount: number;
    unit: "/Month" | "/Hour" | "/Year" | "/Project" | string;
    currency: "$" | "Tk" | string;
  };
  applylink: string;
  created_at?: Date;
  updated_at?: Date;
}

export type pageType =
  | "podcast"
  | "shorts"
  | "thumbnail"
  | "saas"
  | "talkinghead"
  | "home"
  | "about"
  | "career";

export interface ICareerPage {
  id?: string;
  type: pageType;
  tag: string;
  heading_part1: string;
  heading_part2: string;
  paragraph: string;
  jobposts: IJob[];
  created_at?: Date;
  updated_at?: Date;
}

const defaultCareerPage: ICareerPage = {
  type: "career",
  tag: "",
  heading_part1: "",
  heading_part2: "",
  paragraph: "",
  jobposts: [
    {
      job_title: "",
      positions_available: 1,
      deadline: "",
      description: "",
      employment_type: "Full time",
      work_arrangement: "On-site",
      salary: {
        amount: 0,
        unit: "/Month",
        currency: "$",
      },
      applylink: "",
    },
  ],
};

const JobItem = ({ job, jobIndex, register, removeJob, errors }: any) => {
  const [showSalary, setShowSalary] = useState(!!job.salary?.amount);

  return (
    <div className="p-6 bg-gray-800/40 border border-gray-700 rounded-xl space-y-6 shadow-lg">
      {/* Job Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white">
          {job.jobTitle || `Job Position ${jobIndex + 1}`}
        </h3>
        <button
          type="button"
          onClick={() => removeJob(jobIndex)}
          className="px-3 py-2 bg-red-600/20 border border-red-600/30 rounded-lg text-red-400 hover:bg-red-600/30 transition-colors duration-200 text-sm font-medium"
        >
          ✖ Remove Job
        </button>
      </div>

      {/* Job Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Job Title */}
        <div className="space-y-2 lg:col-span-2">
          <label className="block text-sm font-medium text-gray-300">
            Job Title *
          </label>
          <input
            {...register(`jobposts.${jobIndex}.job_title`, {
              required: "Job title is required",
            })}
            placeholder="e.g., Senior Video Editor, Frontend Developer"
            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
          />
          {errors?.jobposts?.[jobIndex]?.job_title && (
            <p className="text-red-400 text-sm mt-1">
              {errors.jobposts[jobIndex].job_title.message}
            </p>
          )}
        </div>

        {/* Positions Available */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Positions Available *
          </label>
          <input
            type="number"
            {...register(`jobposts.${jobIndex}.positions_available`, {
              required: "Number of positions is required",
              min: { value: 1, message: "At least 1 position required" },
              valueAsNumber: true,
            })}
            min="1"
            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
          />
          {errors?.jobposts?.[jobIndex]?.positions_available && (
            <p className="text-red-400 text-sm mt-1">
              {errors.jobposts[jobIndex].positions_available.message}
            </p>
          )}
        </div>

        {/* Application Deadline */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Application Deadline *
          </label>
          <input
            type="date"
            {...register(`jobposts.${jobIndex}.deadline`, {
              required: "Deadline is required",
            })}
            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
          />
          {errors?.jobposts?.[jobIndex]?.deadline && (
            <p className="text-red-400 text-sm mt-1">
              {errors.jobposts[jobIndex].deadline.message}
            </p>
          )}
        </div>

        {/* Employment Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Employment Type *
          </label>
          <select
            {...register(`jobposts.${jobIndex}.employment_type`, {
              required: "Employment type is required",
            })}
            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
          >
            <option value="Full time">Full time</option>
            <option value="Part time">Part time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Temporary">Temporary</option>
          </select>
          {errors?.jobposts?.[jobIndex]?.employment_type && (
            <p className="text-red-400 text-sm mt-1">
              {errors.jobposts[jobIndex].employment_type.message}
            </p>
          )}
        </div>

        {/* Work Arrangement */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Work Arrangement *
          </label>
          <select
            {...register(`jobposts.${jobIndex}.work_arrangement`, {
              required: "Work arrangement is required",
            })}
            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
          >
            <option value="On-site">On-site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="In House">In House</option>
            <option value="Flexible">Flexible</option>
          </select>
          {errors?.jobposts?.[jobIndex]?.work_arrangement && (
            <p className="text-red-400 text-sm mt-1">
              {errors.jobposts[jobIndex].work_arrangement.message}
            </p>
          )}
        </div>

        {/* Apply Link */}
        <div className="space-y-2 lg:col-span-2">
          <label className="block text-sm font-medium text-gray-300">
            Application Link *
          </label>
          <input
            type="url"
            {...register(`jobposts.${jobIndex}.applylink`, {
              required: "Application link is required",
              pattern: {
                value: /^https?:\/\/.+/,
                message:
                  "Please enter a valid URL starting with http:// or https://",
              },
            })}
            placeholder="https://your-application-form.com/apply"
            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
          />
          {errors?.jobposts?.[jobIndex]?.applylink && (
            <p className="text-red-400 text-sm mt-1">
              {errors.jobposts[jobIndex].applylink.message}
            </p>
          )}
        </div>

        {/* Job Description */}
        <div className="space-y-2 lg:col-span-2">
          <label className="block text-sm font-medium text-gray-300">
            Job Description *
          </label>
          <textarea
            {...register(`jobposts.${jobIndex}.description`, {
              required: "Job description is required",
              minLength: {
                value: 50,
                message: "Description should be at least 50 characters",
              },
            })}
            rows={4}
            placeholder="Describe the role, responsibilities, requirements, and what makes this position exciting..."
            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200 resize-vertical"
          />
          {errors?.jobposts?.[jobIndex]?.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.jobposts[jobIndex].description.message}
            </p>
          )}
        </div>

        {/* Salary Section */}
        <div className="lg:col-span-2 space-y-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 text-sm font-medium text-gray-300">
              <input
                type="checkbox"
                checked={showSalary}
                onChange={(e) => setShowSalary(e.target.checked)}
                className="h-5 w-5 text-[#1E9ED2] rounded focus:ring-[#1E9ED2]"
              />
              Include Salary Information
            </label>
          </div>

          {showSalary && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-900/30 rounded-lg border border-gray-600">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Salary Amount *
                </label>
                <input
                  type="number"
                  {...register(`jobposts.${jobIndex}.salary.amount`, {
                    required: "Salary amount is required when salary is shown",
                    valueAsNumber: true,
                    min: { value: 0, message: "Salary must be positive" },
                  })}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
                />
                {errors?.jobposts?.[jobIndex]?.salary?.amount && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.jobposts[jobIndex].salary.amount.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Currency *
                </label>
                <select
                  {...register(`jobposts.${jobIndex}.salary.currency`, {
                    required: "Currency is required when salary is shown",
                  })}
                  className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
                >
                  <option value="$">USD ($)</option>
                  <option value="৳">BDT (৳)</option>
                </select>
                {errors?.jobposts?.[jobIndex]?.salary?.currency && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.jobposts[jobIndex].salary.currency.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Salary Unit *
                </label>
                <select
                  {...register(`jobposts.${jobIndex}.salary.unit`, {
                    required: "Salary unit is required when salary is shown",
                  })}
                  className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
                >
                  <option value="/Month">Per Month</option>
                  <option value="/Hour">Per Hour</option>
                  <option value="/Year">Per Year</option>
                  <option value="/Project">Per Project</option>
                </select>
                {errors?.jobposts?.[jobIndex]?.salary?.unit && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.jobposts[jobIndex].salary.unit.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CareerPageForm = ({
  initialData,
  setOpen,
}: {
  initialData?: ICareerPage;
  setOpen: (p: boolean) => void;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ICareerPage>({
    defaultValues: initialData ?? defaultCareerPage,
  });

  const {
    fields: jobFields,
    append: addJob,
    remove: removeJob,
  } = useFieldArray({
    control,
    name: "jobposts",
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<ICareerPage> = async (data) => {
    try {
      const processedData = {
        ...data,
        jobposts: data.jobposts.map((job) => ({
          ...job,
          salary:
            job.salary?.amount && job.salary.amount > 0
              ? job.salary
              : undefined,
        })),
      };

      // Simulate API call - replace with your actual API endpoint
      const responsce = await api_url.post(`/api/jobpost`, processedData);
      if (responsce.status === 201 || responsce.status === 200) {
        setOpen(false);
        router.refresh();
        toast.success(" Career page saved successfully!");
      }
    } catch (err) {
      toast.error("❌ Failed to save career page");
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="h-[80vh] rounded-lg  bg-linear-to-br from-gray-900 to-gray-800 p-4">
      <div className="w-6xl mx-auto h-[75vh] overflow-y-scroll">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-[#1E9ED2] rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">
                Page Information
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Page Type *
                </label>
                <select
                  {...register("type", {
                    required: "Page type is required",
                  })}
                  className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
                >
                  <option value="career">Career</option>
                </select>
                {errors?.type && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.type.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Tag Line *
                </label>
                <input
                  {...register("tag", {
                    required: "Tag line is required",
                  })}
                  placeholder="e.g., Join Our Team, We're Hiring"
                  className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
                />
                {errors?.tag && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.tag.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Heading Part 1 *
                </label>
                <input
                  {...register("heading_part1", {
                    required: "Heading part 1 is required",
                  })}
                  placeholder="First part of main heading"
                  className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
                />
                {errors?.heading_part1 && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.heading_part1.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Heading Part 2 *
                </label>
                <input
                  {...register("heading_part2", {
                    required: "Heading part 2 is required",
                  })}
                  placeholder="Second part of main heading"
                  className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
                />
                {errors?.heading_part2 && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.heading_part2.message}
                  </p>
                )}
              </div>

              <div className="lg:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Description Paragraph *
                </label>
                <textarea
                  {...register("paragraph", {
                    required: "Description paragraph is required",
                    minLength: {
                      value: 20,
                      message: "Description should be at least 20 characters",
                    },
                  })}
                  placeholder="Describe your company culture, career growth opportunities, and what makes your workplace special..."
                  rows={4}
                  className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200 resize-vertical"
                />
                {errors?.paragraph && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.paragraph.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Jobs Section */}
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-[#1E9ED2] rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">Job Postings</h2>
                <span className="bg-[#1E9ED2] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {jobFields.length} {jobFields.length === 1 ? "Job" : "Jobs"}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  addJob({
                    job_title: "",
                    positions_available: 1,
                    deadline: "",
                    description: "",
                    employment_type: "Full time",
                    work_arrangement: "On-site",
                    salary: {
                      amount: 0,
                      unit: "/Month",
                      currency: "$",
                    },
                    applylink: "",
                  })
                }
                className="px-6 py-3 bg-[#1E9ED2] hover:bg-[#1a8abc] text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 flex items-center gap-2 shadow-lg"
              >
                <span className="text-lg">+</span>
                Add New Job
              </button>
            </div>

            <div className="space-y-6">
              {jobFields.map((job, jobIndex) => (
                <JobItem
                  key={job.id}
                  job={job}
                  jobIndex={jobIndex}
                  control={control}
                  register={register}
                  removeJob={removeJob}
                  errors={errors}
                />
              ))}
            </div>

            {jobFields.length === 0 && (
              <div className="text-center py-12 bg-gray-900/20 rounded-xl border border-gray-700 border-dashed">
                <div className="text-6xl mb-4">💼</div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  No Job Postings Yet
                </h3>
                <p className="text-gray-400 mb-4">
                  Start by adding your first job position
                </p>
                <button
                  type="button"
                  onClick={() =>
                    addJob({
                      job_title: "",
                      positions_available: 1,
                      deadline: "",
                      description: "",
                      employment_type: "Full time",
                      work_arrangement: "On-site",
                      salary: {
                        amount: 0,
                        unit: "/Month",
                        currency: "$",
                      },
                      applylink: "",
                    })
                  }
                  className="px-6 py-3 bg-[#1E9ED2] hover:bg-[#1a8abc] text-white font-semibold rounded-xl transition-all duration-200"
                >
                  Create First Job Posting
                </button>
              </div>
            )}
          </div>
          {/* Submit Section */}
          <div className="flex justify-end items-center p-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-linear-to-r from-[#1E9ED2] to-[#1a8abc] hover:from-[#1a8abc] hover:to-[#1679a3] text-white font-bold rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center gap-2 min-w-50 justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>Save Career Page</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareerPageForm;
