"use client";
import React, { useState } from "react";

// --- Types ---
type Step = {
  title: string;
};

interface VerticalStepperProps {
  steps: Step[];
  activeIndex?: number; // 0-based
  onSetpclick?: (p: number) => void;
}

// --- Components ---
const Dot: React.FC<{ index: number; isActive: boolean }> = ({
  index,
  isActive,
}) => {
  // Active (first) node is a rounded square per the reference image; others are small white circles with numbers.
  if (isActive) {
    return (
      <div className="relative p-[1px] z-10 text-[25px] poppins text-white firstNumber-bg ">
        <style>
          {`
            
            .firstNumber-bg{
              background: linear-gradient(
                250.64deg,
                rgba(51, 87, 163, 0.5) 0%,
                rgba(51, 87, 163, 0) 50%,
                rgba(51, 87, 163, 0.5) 100%
              );
              width:86px;
              height:86px;
              border-radius: 24px;
            }
            `}
        </style>
        <span className="text-base font-semibold flex justify-center items-center h-full leading-none z-30 w-full  bg-black rounded-[24px]">
          {index + 1}
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative w-[84px] h-[84px] z-10 flex  items-center justify-center  text-zinc-900 "
      aria-hidden
    >
      <span className="text-xs font-semibold leading-none flex justify-center items-center h-7 w-7 rounded-full  bg-white">
        {index + 1}
      </span>
    </div>
  );
};

const VerticalStepper: React.FC<VerticalStepperProps> = ({
  steps,
  activeIndex = 0,
  onSetpclick,
}) => {
  return (
    <div className="relative grid w-full max-w-[340px] grid-cols-[auto_1fr] gap-x-4">
      {/* Vertical line */}
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(49, 95, 172, 0.2) 0.02%, #315FAC 21.38%, rgba(49, 95, 172, 0.2) 100%)",
        }}
        className="pointer-events-none absolute left-[39px] top-8 h-[70%] w-[8px] "
      />

      {/* Steps */}
      {steps.map((step, i) => {
        const isActive = i === activeIndex;
        return (
          <React.Fragment key={i}>
            {/* Dot column */}
            <div
              onClick={() => onSetpclick?.(i)}
              className="col-start-1 row-span-1 flex items-start pt-1"
            >
              <Dot index={i} isActive={isActive} />
            </div>

            {/* Text column */}
            <div className="col-start-2  flex  opensans items-center">
              <p
                className={[
                  "select-none text-[17px] font-medium",
                  isActive ? "text-white" : "text-zinc-400",
                ].join(" ")}
              >
                {step.title}
              </p>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

// --- Demo wrapper as default export (ready to paste into a Next.js page) ---
export default function StepperDemo() {
  const [activeStep, setActivestep] = useState(0);
  return (
    <main className="flex items-center justify-center bg-black mt-6 ">
      <VerticalStepper
        activeIndex={activeStep}
        onSetpclick={setActivestep}
        steps={[
          { title: "Plan with Purpose" },
          { title: "Record with Quality" },
          { title: "Edit for Impact" },
        ]}
      />
    </main>
  );
}
