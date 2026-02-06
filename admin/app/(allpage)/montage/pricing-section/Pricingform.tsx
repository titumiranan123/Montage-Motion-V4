/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from "react-hook-form";
import toast from "react-hot-toast";
import { api_url } from "@/hook/Apiurl";
import { IPagePricePlan } from "./types";
import { ServiceTypeSelect } from "@/utils/ServiceTypeseclect";
import { useRouter } from "next/navigation";

const defaultValues: IPagePricePlan = {
  type: " ",
  tag: "",
  heading_part1: "",
  heading_part2: "",
  paragraph: "",
  packages: [
    {
      name: "",
      description: "",
      currency: "BDT",
      price: 0,
      billing_cycle: "one-time",
      features: [],
      ishiden: false,
      position: 0,
    },
  ],
};

const PackageItem = ({
  pkg,
  pkgIndex,
  control,
  register,
  removePackage,
  errors,
}: any) => {
  const {
    fields: featureFields,
    append: addFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: `packages.${pkgIndex}.features`,
  });

  return (
    <div className="p-6  rounded-xl space-y-6 ">
      {/* Package Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white">
          {pkg.name || `Package ${pkgIndex + 1}`}
        </h3>
        <button
          type="button"
          onClick={() => removePackage(pkgIndex)}
          className="px-3 py-2 bg-red-600/20 border border-red-600/30 rounded-lg text-red-400 hover:bg-red-600/30 transition-colors duration-200 text-sm font-medium"
        >
          ✖ Remove Package
        </button>
      </div>

      {/* Package Fields Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Package Name *
          </label>
          <input
            {...register(`packages.${pkgIndex}.name`, {
              required: "Package name is required",
            })}
            placeholder="e.g., Basic Plan, Premium Plan"
            className={`w-full p-3 bg-gray-900/50 border ${
              errors?.packages?.[pkgIndex]?.name
                ? "border-red-500"
                : "border-gray-600"
            } rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200`}
          />
          {errors?.packages?.[pkgIndex]?.name && (
            <p className="text-sm text-red-400 mt-1">
              {errors.packages[pkgIndex].name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Description *
          </label>
          <input
            {...register(`packages.${pkgIndex}.description`, {
              required: "Description is required",
            })}
            placeholder="Short description of the package"
            className={`w-full p-3 bg-gray-900/50 border ${
              errors?.packages?.[pkgIndex]?.description
                ? "border-red-500"
                : "border-gray-600"
            } rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200`}
          />
          {errors?.packages?.[pkgIndex]?.description && (
            <p className="text-sm text-red-400 mt-1">
              {errors.packages[pkgIndex].description.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Currency *
          </label>
          <select
            {...register(`packages.${pkgIndex}.currency`, {
              required: "Currency is required",
            })}
            className={`w-full p-3 bg-gray-900/50 border ${
              errors?.packages?.[pkgIndex]?.currency
                ? "border-red-500"
                : "border-gray-600"
            } rounded-lg text-white focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200`}
          >
            <option value="BDT">BDT</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          {errors?.packages?.[pkgIndex]?.currency && (
            <p className="text-sm text-red-400 mt-1">
              {errors.packages[pkgIndex].currency.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Price *
          </label>
          <input
            type="number"
            {...register(`packages.${pkgIndex}.price`, {
              required: "Price is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Price must be 0 or greater",
              },
            })}
            placeholder="0.00"
            min="0"
            step="0.01"
            className={`w-full p-3 bg-gray-900/50 border ${
              errors?.packages?.[pkgIndex]?.price
                ? "border-red-500"
                : "border-gray-600"
            } rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200`}
          />
          {errors?.packages?.[pkgIndex]?.price && (
            <p className="text-sm text-red-400 mt-1">
              {errors.packages[pkgIndex].price.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Billing Cycle *
          </label>
          <select
            {...register(`packages.${pkgIndex}.billing_cycle`, {
              required: "Billing cycle is required",
            })}
            className={`w-full p-3 bg-gray-900/50 border ${
              errors?.packages?.[pkgIndex]?.billing_cycle
                ? "border-red-500"
                : "border-gray-600"
            } rounded-lg text-white focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200`}
          >
            <option value="one-time">One-time</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          {errors?.packages?.[pkgIndex]?.billing_cycle && (
            <p className="text-sm text-red-400 mt-1">
              {errors.packages[pkgIndex].billing_cycle.message}
            </p>
          )}
        </div>

        <div className="space-y-2 flex items-end">
          <label className="flex items-center gap-3 p-3 bg-gray-900/50 border border-gray-600 rounded-lg w-full">
            <input
              type="checkbox"
              {...register(`packages.${pkgIndex}.ishiden`)}
              className="h-5 w-5 text-[#1E9ED2] rounded focus:ring-[#1E9ED2]"
            />
            <span className="text-gray-300 font-medium">Hide Package</span>
          </label>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t border-gray-700 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-white">Features *</h4>
          <button
            type="button"
            onClick={() => addFeature({ feature: "", is_active: true })}
            className="px-4 py-2 bg-[#1E9ED2] hover:bg-[#1a8abc] text-white rounded-lg transition-colors duration-200 font-medium flex items-center gap-2"
          >
            <span>+</span>
            Add Feature
          </button>
        </div>

        {featureFields.length > 0 ? (
          <div className="space-y-3">
            {featureFields.map((feat, featIndex) => (
              <div
                key={feat.id}
                className="flex items-center gap-3 p-4  rounded-lg "
              >
                <div className="flex-1">
                  <Controller
                    name={`packages.${pkgIndex}.features.${featIndex}.feature`}
                    control={control}
                    rules={{ required: "Feature is required" }}
                    render={({ field, fieldState }) => (
                      <div>
                        <input
                          {...field}
                          placeholder="Enter feature description"
                          className={`w-full p-3  border ${
                            fieldState.error
                              ? "border-red-500"
                              : "border-gray-600"
                          } rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200`}
                        />
                        {fieldState.error && (
                          <p className="text-sm text-red-400 mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => removeFeature(featIndex)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-600/20 rounded-lg transition-colors duration-200"
                    title="Remove feature"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8  rounded-lg border border-gray-700 border-dashed">
            <p className="text-gray-400 text-sm">
              No features added yet. Click &quot;Add Feature&quot; to get
              started.
            </p>
            {errors?.packages?.[pkgIndex]?.features && (
              <p className="text-sm text-red-400 mt-2">
                At least one feature is required
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const PricingPageForm = ({
  initialData,
  setIsModalOpent,
}: {
  initialData?: IPagePricePlan;
  setIsModalOpent: (p: boolean) => void;
}) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IPagePricePlan>({
    defaultValues: initialData ?? defaultValues,
    mode: "onBlur",
  });

  const {
    fields: packageFields,
    append: addPackage,
    remove: removePackage,
  } = useFieldArray({
    control,
    name: "packages",
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<IPagePricePlan> = async (data) => {
    try {
      const respon = await api_url.post(`/api/pricing`, data);
      if (respon.status === 200 || respon.status === 201) {
        router.refresh();
        toast.success(" Pricing Page saved successfully!");
        setIsModalOpent(false);
      }
    } catch (err) {
      toast.error("❌ Failed to save pricing page");
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="h-[85vh] overflow-y-auto bg-linear-to-br from-gray-950 to-gray-900 p-6 rounded-2xl border border-gray-800/50 shadow-2xl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 bg-[#1E9ED2] bg-clip-text">
            Pricing Page Manager
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Fields marked with * are required
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Page Information Card */}
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-3xl border border-gray-800 overflow-hidden shadow-xl">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-3 h-12 bg-[#1E9ED2] rounded-full"></div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Page Information
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Configure basic page settings
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Section Type */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Page Type *
                    </label>
                    <div className="relative">
                      <ServiceTypeSelect
                        value={watch("type")}
                        onChange={(url: any) => {
                          setValue(`type`, url);
                        }}
                      />
                      <input
                        {...register("type", {
                          required: "Type is required",
                        })}
                        placeholder="e.g., Affordable Pricing, Premium Plans"
                        className="hidden"
                      />
                    </div>
                    {errors.type && (
                      <p className="text-sm text-red-400 mt-1">
                        {errors.type.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Tag Line *
                  </label>
                  <div className="relative">
                    <input
                      {...register("tag", {
                        required: "Tag line is required",
                      })}
                      placeholder="e.g., Affordable Pricing, Premium Plans"
                      className={`w-full pl-12 p-4 bg-gray-900/50 border ${
                        errors.tag ? "border-red-500" : "border-gray-700"
                      } rounded-xl text-white placeholder-gray-500 transition-all duration-200`}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.tag && (
                    <p className="text-sm text-red-400 mt-1">
                      {errors.tag.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Heading *
                  </label>
                  <div className="relative">
                    <input
                      {...register("heading_part1", {
                        required: "Heading is required",
                      })}
                      placeholder="First part of main heading"
                      className={`w-full pl-12 p-4 bg-gray-900/50 border ${
                        errors.heading_part1
                          ? "border-red-500"
                          : "border-gray-700"
                      } rounded-xl text-white placeholder-gray-500  transition-all duration-200`}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.heading_part1 && (
                    <p className="text-sm text-red-400 mt-1">
                      {errors.heading_part1.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Second Heading *
                  </label>
                  <div className="relative">
                    <input
                      {...register("heading_part2", {
                        required: "Second heading is required",
                      })}
                      placeholder="Second part of main heading"
                      className={`w-full pl-12 p-4 bg-gray-900/50 border ${
                        errors.heading_part2
                          ? "border-red-500"
                          : "border-gray-700"
                      } rounded-xl text-white placeholder-gray-500  transition-all duration-200`}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.heading_part2 && (
                    <p className="text-sm text-red-400 mt-1">
                      {errors.heading_part2.message}
                    </p>
                  )}
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Description Paragraph *
                  </label>
                  <div className="relative">
                    <textarea
                      {...register("paragraph", {
                        required: "Description paragraph is required",
                      })}
                      placeholder="Detailed description about the pricing section..."
                      rows={4}
                      className={`w-full pl-12 pt-4 pb-4 bg-gray-900/50 border ${
                        errors.paragraph ? "border-red-500" : "border-gray-700"
                      } rounded-xl text-white placeholder-gray-500  transition-all duration-200 resize-vertical`}
                    />
                    <div className="absolute top-4 left-3 flex items-start pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.paragraph && (
                    <p className="text-sm text-red-400 mt-1">
                      {errors.paragraph.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Packages Section */}
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-3xl border border-gray-800 overflow-hidden shadow-xl">
            <div className="p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-12 bg-[#1E9ED2]"></div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Packages & Pricing
                    </h2>
                    <p className="text-gray-400 mt-1">
                      Configure your pricing plans
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addPackage({
                      name: "",
                      description: "",
                      currency: "BDT",
                      price: 0,
                      billing_cycle: "one-time",
                      features: [],
                      ishiden: false,
                      position: packageFields?.length || 0,
                    })
                  }
                  className="px-7 py-3.5 bg-[#1E9ED2] text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 flex items-center gap-3 shadow-lg shadow-emerald-900/20"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add New Package
                </button>
              </div>

              {errors.packages &&
                typeof errors.packages.message === "string" && (
                  <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
                    <p className="text-red-400">{errors.packages.message}</p>
                  </div>
                )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {packageFields.map((pkg, pkgIndex) => (
                  <PackageItem
                    key={pkg.id}
                    pkg={pkg}
                    pkgIndex={pkgIndex}
                    control={control}
                    register={register}
                    removePackage={removePackage}
                    errors={errors}
                  />
                ))}
              </div>

              {packageFields.length === 0 && (
                <div className="text-center py-16 bg-gray-900/20 rounded-2xl border-2 border-gray-700 border-dashed">
                  <div className="w-20 h-20 mx-auto bg-linear-to-r from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                    <svg
                      className="w-10 h-10 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-3">
                    No Packages Created
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Start building your pricing strategy by adding packages
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      addPackage({
                        name: "",
                        description: "",
                        currency: "BDT",
                        price: 0,
                        billing_cycle: "one-time",
                        features: [],
                        ishiden: false,
                        position: 0,
                      })
                    }
                    className="px-7 py-3.5 bg-[#1E9ED2] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-900/20"
                  >
                    Create First Package
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-4 bg-[#1E9ED2] hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-3 shadow-xl shadow-blue-900/30 min-w-55 justify-center group"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Save Pricing Page</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PricingPageForm;
