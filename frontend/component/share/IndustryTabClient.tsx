"use client";
import Image from "next/image";
import { useState, useCallback, useId } from "react";
import Gradientcard from "./Gradientcard";
import { ChevronRight, CircleCheck } from "lucide-react";

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

  const underlineStyle = {
    left: `${(activeTab * 100) / tabs.length}%`,
    width: `${100 / tabs.length}%`,
  };

  const activeTabData = tabs[activeTab];

  return (
    <div className="space-y-6 lg:mt-16 mt-8">
      {/* Tabs Navigation */}
      <div
        role="tablist"
        aria-label="Content categories"
        className="relative flex justify-center items-center ]  max-w-[680px] mx-auto "
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            data-aos="fade-up"
            data-aos-delay={100 + index * 100}
            aria-selected={activeTab === index}
            aria-controls={`${labelId}-${tab.id}-panel`}
            onClick={() => setActiveTab(index)}
            className={`relative z-10 max-w-[170px] w-full mx-auto rounded-[36px] px-3 md:px-4 py-2 text-sm font-medium transition-opacity text-white md:py-3 md:text-base ${
              activeTab === index ? "bg-[#2B6AB2] " : ""
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
        <div className="relative">
          <Gradientcard
            className="rounded-[16px] bg-gradient-to-b from-white/5 to-white/0 p-3   md:p-6 flex justify-between items-center lg:flex-row flex-col-reverse gap-4 max-w-[900px] mx-auto w-full relative "
            borderClassName="p-[1px] max-w-[900px] rounded-[16px] mx-auto  w-full h-full"
          >
            <div className="text-white  w-full lg:w-1/2">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0" />
            </div>
          </Gradientcard>
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
      </div>
    </div>
  );
}
