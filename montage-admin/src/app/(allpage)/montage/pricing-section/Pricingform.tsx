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

const defaultValues: IPagePricePlan = {
  type: "home",
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
            Package Name
          </label>
          <input
            {...register(`packages.${pkgIndex}.name`)}
            placeholder="e.g., Basic Plan, Premium Plan"
            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <input
            {...register(`packages.${pkgIndex}.description`)}
            placeholder="Short description of the package"
            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Currency
          </label>
          <select
            {...register(`packages.${pkgIndex}.currency`)}
            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
          >
            <option value="BDT">BDT</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Price
          </label>
          <input
            type="number"
            {...register(`packages.${pkgIndex}.price`, { valueAsNumber: true })}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Billing Cycle
          </label>
          <select
            {...register(`packages.${pkgIndex}.billing_cycle`)}
            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
          >
            <option value="one-time">One-time</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
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
          <h4 className="text-lg font-semibold text-white">Features</h4>
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
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Enter feature description"
                        className="w-full p-3  border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200"
                      />
                    )}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Controller
                    name={`packages.${pkgIndex}.features.${featIndex}.is_active`}
                    control={control}
                    render={({ field }) => (
                      <label className="flex items-center gap-2 text-sm text-gray-300">
                        <span>Active:</span>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="h-4 w-4 text-[#1E9ED2] rounded focus:ring-[#1E9ED2]"
                        />
                      </label>
                    )}
                  />
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
              No features added yet. Click "Add Feature" to get started.
            </p>
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
    formState: { isSubmitting },
  } = useForm<IPagePricePlan>({
    defaultValues: initialData ?? defaultValues,
  });

  const {
    fields: packageFields,
    append: addPackage,
    remove: removePackage,
  } = useFieldArray({
    control,
    name: "packages",
  });

  const onSubmit: SubmitHandler<IPagePricePlan> = async (data) => {
    try {
      const respon = await api_url.post(`/api/pricing`, data);
      if (respon.status === 200 || respon.status === 201) {
        toast.success(" Pricing Page saved successfully!");
        setIsModalOpent(false);
      }
    } catch (err) {
      toast.error("❌ Failed to save pricing page");
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="h-[80vh] overflow-y-scroll  bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl">
      <div className="w-4xl mx-auto ">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">
            Pricing Page Manager
          </h1>
          <p className="text-gray-400 text-lg">
            Configure pricing plans for different pages on your website
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Page Information Card */}
          <div className=" rounded-2xl  overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-[#1E9ED2] rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">
                  Page Information
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Section Type */}
                <div>
                  <label className="block font-medium text-gray-200">
                    Page Type
                  </label>

                  <ServiceTypeSelect
                    value={watch("type")}
                    onChange={(url: any) => {
                      setValue(`type`, url, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Tag Line
                  </label>
                  <input
                    {...register("tag")}
                    placeholder="e.g., Affordable Pricing, Premium Plans"
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
                    placeholder="Detailed description about the pricing section..."
                    rows={4}
                    className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1E9ED2] focus:border-transparent transition-all duration-200 resize-vertical"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Packages Section */}
          <div className=" backdrop-blur-sm  rounded-2xl  overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-[#1E9ED2] rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">
                    Packages & Pricing
                  </h2>
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
                  className="px-6 py-3 bg-[#1E9ED2] hover:bg-[#1a8abc] text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 flex items-center gap-2 "
                >
                  <span className="text-lg">+</span>
                  Add New Package
                </button>
              </div>

              <div className="space-y-6">
                {packageFields.map((pkg, pkgIndex) => (
                  <PackageItem
                    key={pkg.id}
                    pkg={pkg}
                    pkgIndex={pkgIndex}
                    control={control}
                    register={register}
                    removePackage={removePackage}
                  />
                ))}
              </div>

              {packageFields.length === 0 && (
                <div className="text-center py-12 bg-gray-900/20 rounded-xl border border-gray-700 border-dashed">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">
                    No Packages Yet
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Start by adding your first pricing package
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
                    className="px-6 py-3 bg-[#1E9ED2] hover:bg-[#1a8abc] text-white font-semibold rounded-xl transition-all duration-200"
                  >
                    Create First Package
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-4 bg-gradient-to-r from-[#1E9ED2] to-[#1a8abc] hover:from-[#1a8abc] hover:to-[#1679a3] text-white font-bold rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ms-auto  flex items-center gap-2 min-w-[200px] justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <> Save Pricing Page</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PricingPageForm;
