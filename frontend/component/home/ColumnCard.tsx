"use client";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Bullet } from "./BulletPoint";

export function ColumnCard({ column }: { column: any }) {
  return (
    <div className="max-w-[389px] min-h-[716px] w-full h-full comparison-border p-[1px] rounded-[24px]">
      <style>
        {`
        .comparison-border{
            background: linear-gradient(-419.36deg, #000000 43.7%, #315FAC 110.87%);
        }
.comparison:hover {
    background: linear-gradient(189.36deg, #000000 13.7%, #315FAC 85.87%);
    transition: all 300 ease-in-out;
}
.bonus-bg{
    background: linear-gradient(209.88deg, rgba(0, 0, 0, 0.28) 23.29%, rgba(49, 95, 172, 0.28) 214.87%);
}
            `}
      </style>
      <div
        className={`relative rounded-[24px] text-[#E4E8F7] p-6 sm:p-8 bg-black h-full comparison `}
      >
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
              {column.title === null ? (
                <Image
                  src={"/assets/montagelogo.png"}
                  alt={""}
                  width={133}
                  height={52}
                />
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
          {column.items.map((it: any, idx: number) => (
            <Bullet key={idx} text={it} />
          ))}
        </div>

        {/* Bonus box (only for highlight) */}
        {column.bonus && (
          <div
            style={{ boxShadow: "0px -7px 24px 0px #5E8EF399 inset" }}
            className="mt-6 rounded-2xl bonus-bg p-4 sm:p-5 border border-cyan-300/20 backdrop-blur-[24px]"
          >
            <h4 className="text-sm font-semibold leading-6 mb-3 whitespace-pre-line">
              {column.bonus.title}
            </h4>
            <div className="space-y-2">
              {column.bonus.items.map((b: any, i: number) => (
                <Bullet key={i} text={b} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
