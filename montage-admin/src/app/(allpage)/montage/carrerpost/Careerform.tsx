"use client";
import { api_url } from "@/hook/Apiurl";
import React, { useState } from "react";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from "react-hook-form";
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
    currency: "$" | "BDT" | "EUR" | "INR" | "GBP" | string;
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

/* -------------------------------------------------------------------------- */
/*                             DEFAULT VALUES                                */
/* -------------------------------------------------------------------------- */
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

const JobItem = ({ job, jobIndex, control, register, removeJob }: any) => {
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
        </div>

        {/* Employment Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Employment Type *
          </label>
          <select
            {...register(`jobposts.${jobIndex}.employment_type`)}
            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
          >
            <option value="Full time">Full time</option>
            <option value="Part time">Part time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Temporary">Temporary</option>
            <option value="Freelance">Freelance</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Apprenticeship">Apprenticeship</option>
            <option value="Commission">Commission</option>
          </select>
        </div>

        {/* Work Arrangement */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Work Arrangement *
          </label>
          <select
            {...register(`jobposts.${jobIndex}.work_arrangement`)}
            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
          >
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
            <option value="In House">In House</option>
            <option value="Flexible">Flexible</option>
            <option value="Field Work">Field Work</option>
          </select>
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
                    valueAsNumber: true,
                    min: { value: 0, message: "Salary must be positive" },
                  })}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Currency *
                </label>
                <select
                  {...register(`jobposts.${jobIndex}.salary.currency`)}
                  className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
                >
                  <option value="$">USD ($)</option>
                  <option value="BDT">BDT (৳)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Salary Unit *
                </label>
                <select
                  {...register(`jobposts.${jobIndex}.salary.unit`)}
                  className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
                >
                  <option value="/Month">Per Month</option>
                  <option value="/Hour">Per Hour</option>
                  <option value="/Year">Per Year</option>
                  <option value="/Project">Per Project</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CareerPageForm = ({ initialData }: { initialData?: ICareerPage }) => {
  console.log(initialData?.jobposts);

  const {
    register,
    control,
    handleSubmit,

    formState: { errors, isSubmitting },
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
  const onSubmit: SubmitHandler<ICareerPage> = async (data) => {
    try {
      // Filter out jobs with empty salary if amount is 0
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
      console.log("Submitting career page data:", processedData);
      // Simulate API call - replace with your actual API endpoint
      const responsce = await api_url.post(`/api/jobpost`, processedData);
      if (responsce.status === 201 || responsce.status === 200) {
        toast.success(" Career page saved successfully!");
      }
    } catch (err) {
      toast.error("❌ Failed to save career page");
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="h-[80vh]  bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="max-w-6xl mx-auto h-[75vh] overflow-y-scroll">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Page Information Card */}
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
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
                    Page Type
                  </label>
                  <select
                    {...register("type")}
                    className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
                  >
                    <option value="career">Career</option>
                    {/* <option value="home">Home</option>
                    <option value="about">About</option>
                    <option value="podcast">Podcast</option>
                    <option value="shorts">Shorts</option>
                    <option value="thumbnail">Thumbnail</option>
                    <option value="saas">SaaS</option>
                    <option value="talkinghead">Talking Head</option> */}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Tag Line
                  </label>
                  <input
                    {...register("tag")}
                    placeholder="e.g., Join Our Team, We're Hiring"
                    className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Heading Part 1
                  </label>
                  <input
                    {...register("heading_part1")}
                    placeholder="First part of main heading"
                    className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Heading Part 2
                  </label>
                  <input
                    {...register("heading_part2")}
                    placeholder="Second part of main heading"
                    className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="lg:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Description Paragraph
                  </label>
                  <textarea
                    {...register("paragraph")}
                    placeholder="Describe your company culture, career growth opportunities, and what makes your workplace special..."
                    rows={4}
                    className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200 resize-vertical"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Jobs Section */}
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-[#1E9ED2] rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">
                    Job Postings
                  </h2>
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
          </div>

          {/* Submit Section */}
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Save Career Page
                </h3>
                <p className="text-gray-400 text-sm">
                  {initialData
                    ? "Update your career page and job postings"
                    : "Create a new career page with job opportunities"}
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-gradient-to-r from-[#1E9ED2] to-[#1a8abc] hover:from-[#1a8abc] hover:to-[#1679a3] text-white font-bold rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center gap-2 min-w-[200px] justify-center"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareerPageForm;
