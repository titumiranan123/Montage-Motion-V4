"use client";
import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Image from "next/image";

interface Bonus {
  title: string;
  items: string[];
}

interface Comparison {
  type: string;
  title: string | null;
  items: string[];
  bonus?: Bonus;
  image?: string;
}

interface FormValues {
  comparisons: Comparison[];
}

const EditableComparisonColumn = () => {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      comparisons: [
        {
          type: "montage",
          title: null,
          image:
            "https://pub-6a9bd81559354e09b0ca799ba12301c8.r2.dev/montagelogo.png",
          items: [
            "20+ in-house team to grow your online presence",
            "Experienced team",
            "1000+ projects completed successfully",
            "All time support",
            "All time support",
            "All time support",
            "All time support",
            "All time support",
            "All time support",
            "All time support",
          ],
          bonus: {
            title: "Bonuses you will get with\nMontage Motion Limited",
            items: [
              "20+ in-house team to grow your online presence",
              "Experienced team",
              "1000+ projects completed successfully",
            ],
          },
        },
        {
          type: "agencies",
          title: "Other Agencies",
          items: [
            "20+ in-house team to grow your online presence",
            "Experienced team",
            "1000+ projects completed successfully",
            "All time support",
            "All time support",
            "All time support",
            "All time support",
            "All time support",
          ],
        },
        {
          type: "freelancers",
          title: "Freelancers",
          items: [
            "20+ in-house team to grow your online presence",
            "Experienced team",
            "1000+ projects completed successfully",
            "All time support",
            "All time support",
            "All time support",
            "All time support",
          ],
        },
      ],
    },
  });

  const {
    fields: cards,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "comparisons",
  });

  const comparisons = watch("comparisons");

  const onSubmit = (data: FormValues) => {
    console.log("✅ Submitted Data:", data);
    alert("Data Submitted! Check console for output.");
  };

  //   const addNewCard = () => {
  //     const newId = `card-${Date.now()}`;
  //     append({
  //       id: newId,
  //       title: "New Card",
  //       items: ["Add your features here..."],
  //     });
  //   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Why Choose Us?
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Compare Montage Motion with other options and see why we're the best
            choice for your project
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row gap-8 justify-center items-stretch flex-wrap"
        >
          {cards.map((comparison, cardIndex) => (
            <ComparisonCard
              key={comparison.type}
              comparison={comparison}
              cardIndex={cardIndex}
              control={control}
              isFeatured={comparison.type === "montage"}
              onRemove={() => remove(cardIndex)}
            />
          ))}

          {/* Add New Card Button */}
          {/* <div className="flex-1 max-w-md flex items-center justify-center">
            <button
              type="button"
              onClick={addNewCard}
              className="w-full h-full min-h-[716px] border-3 border-dashed border-gray-600 hover:border-blue-400 rounded-3xl text-gray-400 hover:text-blue-400 transition-all duration-200 flex flex-col items-center justify-center gap-4 p-8 group"
            >
              <div className="w-16 h-16 bg-gray-700 group-hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-200">
                <span className="text-2xl text-white">+</span>
              </div>
              <span className="text-xl font-semibold">Add New Card</span>
              <span className="text-sm text-gray-500 text-center">
                Add a new comparison card to the list
              </span>
            </button>
          </div> */}
        </form>

        {/* Submit Button */}
        <div className="text-center mt-12">
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
          >
            💾 Save All Changes
          </button>
        </div>

        {/* Debug Output */}
        <div className="mt-12 bg-black/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">
            Current Output Data:
          </h3>
          <pre className="bg-gray-900 rounded-lg p-4 overflow-auto text-sm text-green-400">
            {JSON.stringify(comparisons, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

const ComparisonCard = ({
  comparison,
  cardIndex,
  control,
  isFeatured,
  onRemove,
}: any) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`flex-1 max-w-md ${
        isFeatured ? "lg:scale-105 lg:-translate-y-4" : ""
      } transition-all duration-300`}
    >
      <style>
        {`
          .comparison-border {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 2px;
            border-radius: 24px;
          }
          .comparisonHover {
            background: linear-gradient(135deg, #000000 0%, #315FAC 100%);
          }
          .featured-card {
            background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
          }
          .standard-card {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%);
          }
          .bonus-bg {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(49, 95, 172, 0.4) 100%);
            backdrop-filter: blur(20px);
          }
          .glow {
            box-shadow: 0 0 50px 20px rgba(59, 130, 246, 0.15);
          }
        `}
      </style>

      <div
        className={`comparison-border rounded-3xl h-full ${
          isFeatured ? "glow" : ""
        }`}
      >
        <div
          className={`relative rounded-[22px] text-[#E4E8F7] p-8 h-full ${
            isFeatured ? "featured-card" : "standard-card"
          } border border-gray-700/50 backdrop-blur-sm`}
        >
          {/* Remove Card Button */}
          {!isFeatured ||
            cardIndex === 1 ||
            (cardIndex == 2 && (
              <button
                type="button"
                onClick={onRemove}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors duration-200 z-10"
              >
                🗑️
              </button>
            ))}

          {/* Header */}
          <div className="mb-8 text-center">
            {isFeatured ? (
              <div className="flex flex-col items-center gap-4">
                {/* Image Upload for Featured Card */}
                <div className="relative">
                  <Controller
                    control={control}
                    name={`comparisons.${cardIndex}.image`}
                    render={({ field }) => (
                      <div className="flex flex-col items-center gap-2">
                        {field.value || imagePreview ? (
                          <div className="relative">
                            <Image
                              src={field.value || imagePreview}
                              alt="montage logo"
                              width={150}
                              height={60}
                              className=" "
                            />
                            <label className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full cursor-pointer text-xs">
                              📷
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageUpload(e, field.onChange)
                                }
                              />
                            </label>
                          </div>
                        ) : (
                          <label className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-2xl cursor-pointer hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                            <div className="bg-slate-900 rounded-xl p-4 hover:bg-slate-800 transition-all duration-200">
                              <div className="text-center">
                                <div className="text-2xl mb-2">📷</div>
                                <div className="text-xs text-gray-300">
                                  Upload Logo
                                </div>
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageUpload(e, field.onChange)
                                }
                              />
                            </div>
                          </label>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Controller
                  control={control}
                  name={`comparisons.${cardIndex}.title`}
                  render={({ field }) => (
                    <input
                      {...field}
                      defaultValue={comparison?.cardIndex?.title}
                      className="text-2xl font-bold  text-center border-b border-gray-600 focus:outline-none focus:border-blue-400 pb-2 w-full"
                      placeholder="Card Title..."
                    />
                  )}
                />
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="space-y-4 mb-8">
            <h4 className="font-semibold text-lg text-gray-300 mb-4 border-b border-gray-600 pb-2">
              Features & Services
            </h4>
            <ItemEditor control={control} cardIndex={cardIndex} />
          </div>

          {/* Bonus Section */}
          {comparison.bonus && (
            <BonusEditor control={control} cardIndex={cardIndex} />
          )}

          {/* Add Bonus Section Button */}
          {!comparison.bonus && (
            <Controller
              control={control}
              name={`comparisons.${cardIndex}.bonus`}
              render={({ field }) => (
                <button
                  type="button"
                  onClick={() =>
                    field.onChange({
                      title: "Bonuses you will get",
                      items: ["Add your first bonus point..."],
                    })
                  }
                  className="w-full py-3 border-2 border-dashed border-gray-600 hover:border-green-400 rounded-xl text-gray-400 hover:text-green-400 transition-all duration-200 flex items-center justify-center gap-2 mt-4"
                >
                  <span className="text-lg">🎁</span>
                  Add Bonus Section
                </button>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------------- Item Editor ---------------- */
const ItemEditor = ({ control, cardIndex }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `comparisons.${cardIndex}.items`,
  });

  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-200 group"
        >
          <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">✓</span>
          </div>
          <Controller
            control={control}
            name={`comparisons.${cardIndex}.items.${index}`}
            render={({ field }) => (
              <textarea
                {...field}
                rows={2}
                className="flex-1 bg-transparent text-sm border-none focus:outline-none text-[#E4E8F7] placeholder-gray-500 resize-none"
                placeholder="Write feature..."
              />
            )}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-400 hover:text-red-600 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append("")}
        className="w-full py-3 border-2 border-dashed border-gray-600 hover:border-blue-400 rounded-xl text-gray-400 hover:text-blue-400 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <span className="text-lg">+</span>
        Add New Feature
      </button>
    </div>
  );
};

/* ---------------- Bonus Editor ---------------- */
const BonusEditor = ({ control, cardIndex }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `comparisons.${cardIndex}.bonus.items`,
  });

  return (
    <div className="bonus-bg rounded-2xl p-6 border border-cyan-400/30 backdrop-blur-lg">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🎁</span>
        <Controller
          control={control}
          name={`comparisons.${cardIndex}.bonus.title`}
          render={({ field }) => (
            <textarea
              {...field}
              rows={2}
              className="flex-1 bg-transparent text-lg font-bold border-b border-cyan-400/30 focus:outline-none text-[#E4E8F7] placeholder-cyan-200/50 resize-none"
              placeholder="Bonus Title..."
            />
          )}
        />
      </div>

      <div className="space-y-3">
        {fields.map((field, i) => (
          <div
            key={field.id}
            className="flex items-center gap-3 bg-cyan-500/10 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-3 hover:bg-cyan-500/15 transition-all duration-200 group"
          >
            <div className="flex-shrink-0 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-cyan-900">+</span>
            </div>
            <Controller
              control={control}
              name={`comparisons.${cardIndex}.bonus.items.${i}`}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={2}
                  className="flex-1 bg-transparent text-sm border-none focus:outline-none text-[#E4E8F7] placeholder-cyan-200/50 resize-none"
                  placeholder="Bonus point..."
                />
              )}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-red-400 hover:text-red-600 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append("")}
        className="w-full mt-4 py-2 border border-cyan-400/30 hover:border-cyan-400 rounded-lg text-cyan-400 hover:text-cyan-300 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <span className="text-sm">+</span>
        Add Bonus Point
      </button>
    </div>
  );
};

export default EditableComparisonColumn;
