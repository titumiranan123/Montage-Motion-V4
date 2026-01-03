"use client";
import Image from "next/image";
import { useState, useCallback, useId } from "react";
import { ChevronRight, CircleCheck } from "lucide-react";
import Gradientcard from "./Gradientcard";

type TabItem = {
  id: string;
  title: string;
  description: string;
  offer: { points: string[] };
  cta: { label: string; link: string };
  image: string;
};

export function TabsClient({ tabs }: { tabs: TabItem[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const labelId = useId();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;

      e.preventDefault();
      const actions = {
        Home: () => setActiveTab(0),
        End: () => setActiveTab(tabs.length - 1),
        ArrowRight: () => setActiveTab((i) => (i + 1) % tabs.length),
        ArrowLeft: () =>
          setActiveTab((i) => (i - 1 + tabs.length) % tabs.length),
      };
      actions[e.key as keyof typeof actions]?.();
    },
    [tabs.length]
  );

  const activeTabData = tabs[activeTab];

  return (
    <div className="space-y-6  lg:mt-16 mt-8 ">
      {/* Tabs Navigation */}

      <div
        role="tablist"
        aria-label="Content categories"
        className="relative flex justify-start  lg:justify-center 
           items-center 
          w-full px-2 overflow-x-auto scrollbar-hide  rounded-[12px] glassShadow  bg-white/40 p-3 max-w-[520px] mx-auto"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`${labelId}-${tab.id}-panel`}
            onClick={() => setActiveTab(index)}
            className={`p-3 text-(--text-primary) opensans font-normal text-[16px] leading-[120%] rounded-[12px] text-center transition-colors whitespace-nowrap h-[51px] ${
              activeTab === index ? "btn-color font-semibold" : ""
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div
        role="tabpanel"
        aria-labelledby={`${labelId}-${activeTabData.id}`}
        className=""
        data-aos="fade-up"
        data-aos-delay={300}
      >
        {/* Content Card */}
        <Gradientcard
          borderClassName="lg:w-[918px] lg:max-w-full max-w-[918px]  mx-auto w-full p-px rounded-2xl"
          className="lg:w-[916px] lg:max-w-full max-w-[916px]  mx-auto w-full rounded-2xl"
        >
          <div className="relative">
            <div className="rounded-2xl  p-3   md:p-6 flex justify-between items-center lg:flex-row flex-col-reverse gap-4 lg:w-[916px] lg:max-w-full max-w-[916px]  mx-auto w-full relative ">
              <div className=" text-(--text-primary)   w-full lg:w-1/2">
                <h3 className="mb-3 text-xl font-semibold md:text-2xl poppins">
                  {activeTabData.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed opacity-90 md:text-base opensans">
                  {activeTabData.description}
                </p>

                <ul className="space-y-2 text-sm md:text-base opensans">
                  {activeTabData.offer.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CircleCheck />
                      <span className="opacity-90">{point}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={activeTabData.cta.link}
                  className="mt-6 inline-flex items-center justify-center rounded-2xl  px-4 py-2.5 md:text-[16px] text-[14px] font-medium  opensans"
                >
                  {activeTabData.cta.label}
                  <ChevronRight />
                </a>
              </div>
              {/* Image Card */}
              <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10 w-full lg:w-1/2 ">
                <Image
                  src={activeTabData.image}
                  alt={activeTabData.title}
                  width={600}
                  height={390}
                  className="h-full w-full object-cover"
                  priority={activeTab === 0}
                />
                <div className="absolute inset-0 " />
              </div>
            </div>
            <div className="lg:absolute hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
              <Image
                src="/assets/industriesworok.png"
                alt="backend"
                className="max-w-[1435px] w-full mx-auto"
                width={1435}
                height={10}
              />
            </div>
          </div>
        </Gradientcard>
      </div>
    </div>
  );
}
