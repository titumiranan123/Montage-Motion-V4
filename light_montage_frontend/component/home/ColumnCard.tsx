/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { Bullet } from "./BulletPoint";

export function ColumnCard({ column }: { column: any }) {
  return (
    <div
      className={`max-w-[389px] min-h-[716px] w-full h-full  p-px rounded-3xl ${
        column.title === null ? "comparison-border" : ""
      }`}
    >
      <style>
        {`
        .comparison-border{
          background: linear-gradient(242.39deg, #1FB5DD -5.78%, rgba(31, 181, 221, 0) 38.74%);
        }
.active {
  background:linear-gradient(179.93deg, #FFFFFF 0.07%, #CCF4FF 99.96%);

    transition: all 300 ease-in-out;
}
    .others {
      background: linear-gradient(180deg, #FFFFFF -4.65%, #FDEFE4 100.01%);
    }
      .freelancer{
      
      background: linear-gradient(180deg, #FFFFFF -5.46%, #BFD0FF 100.01%);

      }
.bonus-bg{
    background: linear-gradient(209.88deg, rgba(0, 0, 0, 0.28) 23.29%, rgba(49, 95, 172, 0.28) 214.87%);
}
            `}
      </style>
      <div
        className={`relative rounded-3xl text-(--text-primary) p-6 sm:p-8 bg-white h-full  ${
          column.title === null
            ? "active"
            : column.id !== "agencies"
            ? "others"
            : "freelancer"
        }`}
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
            // style={{ boxShadow: "0px -7px 24px 0px #5E8EF399 inset" }}
            className="mt-6 bg-white/40 border-white border rounded-2xl bonus-bg p-4 sm:p-5  backdrop-blur-xl"
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
