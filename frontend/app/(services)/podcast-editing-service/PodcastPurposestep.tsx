import React from "react";

// --- Types ---
type Step = {
  title: string;
};

interface VerticalStepperProps {
  steps: Step[];
  activeIndex?: number; // 0-based
}

// --- Components ---
const Dot: React.FC<{ index: number; isActive: boolean }> = ({
  index,
  isActive,
}) => {
  // Active (first) node is a rounded square per the reference image; others are small white circles with numbers.
  if (isActive) {
    return (
      <div className="relative z-10 text-[25px] poppins text-white firstNumber-bg ">
        <style>
          {`
            .firstNumber-bg::before {
              content: "1";
              display:flex;
              font-size:"24px";
              justify-content:center;
              align-items: center;
              position: absolute;
              left: 1px;
              top:1px;
              background: black;
              z-index: 0;
              padding:2px;
              width:84px;
              height:84px;
              border-radius: 24px;
            }
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
        {/* <span className="text-base font-semibold leading-none">
          {index + 1}
        </span> */}
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
}) => {
  return (
    <div className="relative grid w-full max-w-[340px] grid-cols-[auto_1fr] gap-x-4">
      {/* Vertical line */}
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(49, 95, 172, 0.2) 0.02%, #315FAC 21.38%, rgba(49, 95, 172, 0.2) 100%)",
        }}
        className="pointer-events-none absolute left-[39px] top-1 h-[90%] w-[8px] "
      />

      {/* Steps */}
      {steps.map((step, i) => {
        const isActive = i === activeIndex;
        return (
          <React.Fragment key={i}>
            {/* Dot column */}
            <div className="col-start-1 row-span-1 flex items-start pt-1">
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
  return (
    <main className="flex items-center justify-center bg-black mt-6 ">
      <VerticalStepper
        activeIndex={0}
        steps={[
          { title: "Plan with Purpose" },
          { title: "Record with Quality" },
          { title: "Edit for Impact" },
        ]}
      />
    </main>
  );
}

/*
Usage in Next.js (App Router):
- Ensure Tailwind CSS is set up.
- Save this file as app/vertical-steps/page.tsx or any page/client component.
- The default export renders the preview. To reuse the stepper elsewhere export VerticalStepper too.
*/
