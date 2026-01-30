/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { Bullet } from "../carrerpost/BulletPoint";

export function ColumnCard({ column }: { column: any }) {
  const bonus = column?.entries.filter((en: any) => en.entry_type === "bonus");
  const items = column?.entries.filter((en: any) => en.entry_type === "item");
  return (
    <div
      className={`max-w-[389px] border min-h-[716px] w-full h-full  p-px rounded-3xl ${
        column.title === null ? "border-[#2fbafa]" : ""
      }`}
    >
      <div
        className={`relative rounded-3xl text-(--text-primary) p-6 sm:p-8 bg-black h-full  ${
          column.title === null
            ? "active"
            : column.type !== "agencies"
              ? "others"
              : "freelancer"
        }`}
      >
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
              {column.title === null ? (
                <Image src={column?.image} alt={""} width={133} height={52} />
              ) : (
                column.title
              )}{" "}
              {column.subtitle && (
                <span className="opacity-75">{column.subtitle}</span>
              )}
            </h3>
          </div>
        </div>

        {/* Bullets */}
        <div className="space-y-3">
          {items?.map((it: any, idx: number) => (
            <Bullet key={idx} text={it.text} />
          ))}
        </div>

        {/* Bonus box (only for highlight) */}
        {column.title === null && (
          <div
            // style={{ boxShadow: "0px -7px 24px 0px #5E8EF399 inset" }}
            className="mt-6 bg-white/40   rounded-2xl glassShadow p-4 sm:p-5  backdrop-blur-xl"
          >
            <h4 className="lg:text-[20px] lg:leading-[140%] font-semibold leading-6 mb-3 whitespace-pre-line text-white">
              {column?.bonus_title}
            </h4>
            <div className="space-y-2">
              {bonus?.map((b: any, i: number) => (
                <Bullet key={i} text={b?.text} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
