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
      <div className="relative z-10 flex h-11 w-9 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.18)]">
        <span className="text-base font-semibold leading-none">
          {index + 1}
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white text-zinc-900 shadow"
      aria-hidden
    >
      <span className="text-xs font-semibold leading-none">{index + 1}</span>
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
      <div className="pointer-events-none absolute left-[14px] top-0 h-full w-[2px] bg-gradient-to-b from-blue-900 via-blue-700 to-blue-400" />

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
            <div className="col-start-2 -mt-0.5 mb-6 flex min-h-[44px] items-center">
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
    <main className="flex min-h-screen items-center justify-center bg-black p-6">
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
