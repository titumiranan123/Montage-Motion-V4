"use client";
import Gradientcard from "@/component/share/Gradientcard";
import { Heading } from "@/component/share/Headering";
import Image from "next/image";
import { useEffect, useState } from "react";

const storyCards = [
  {
    title: "Where we Began",
    description:
      "Montage Motion started with a passion for storytelling through video. What began as a small editing team focused on helping creators polish their content quickly became a creative hub where ideas turned into impactful visuals.",
    image: "/assets/podcast/process.png",
  },
  {
    title: "How we Grew",
    description:
      "As demand grew, so did we. From video editing, we expanded into advertising, graphic design, and custom website development. Our team grew into a powerhouse of 12+ specialists, delivering projects for creators, businesses, and brands across industries.",
    image: "/assets/podcast/greatpodcast.png",
  },
  {
    title: "Where we're Going",
    description:
      "The future is bold. Montage Motion is on a mission to become a global creative partner for content creators and brands, pushing the boundaries of short-form video, marketing visuals, and digital storytelling. We're building towards innovation, scale, and impact that inspires millions.",
    image: "/assets/podcast/process.png",
  },
];

export default function OurStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [capPosition, setCapPosition] = useState(8);
  console.log("capPosition", capPosition);
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll(".story-card");
      const cardsContainer = document.querySelector(".cards-container");
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (
          rect.top < window.innerHeight / 2 &&
          rect.bottom > window.innerHeight / 2
        ) {
          setActiveIndex(index);
        }
      });

      if (cardsContainer) {
        const containerRect = cardsContainer.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const windowHeight = window.innerHeight;
        const relativeScroll = Math.max(
          0,
          Math.min(1, (windowHeight / 2 - containerTop) / containerHeight)
        );
        setCapPosition(relativeScroll * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white p-8 max-w-7xl mx-auto">
      <Heading
        tag="Our Story"
        title="Our Story in Motion"
        subtitle="From humble beginnings to a growing creative powerhouse — discover how Montage Motion started, evolved, and where we’re headed next."
      />

      <div className="flex gap-8 mt-16">
        {/* Left - Image */}
        <div className="w-1/2 sticky top-36 h-fit">
          <Image
            src={storyCards[activeIndex].image}
            alt={storyCards[activeIndex].title}
            width={590}
            height={620}
            className="w-[590px] h-[620px] rounded-[13px] object-cover"
          />
        </div>
        <div className="relative w-6 lg:flex hidden items-start justify-center select-none lg:sticky lg:top-32 h-[600px]">
          <div className="relative h-full w-6 rounded-full overflow-visible">
            {/* Background beam */}
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(31, 181, 221, 0.2) 0.02%, #1FB5DD 21.38%, rgba(31, 181, 221, 0.2) 100%)",
              }}
              className="absolute left-1/2 -translate-x-1/2 w-2.5 h-full rounded-[25px]"
            />

            {/* Fill (TOP → DOWN) */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 rounded-[25px] transition-all duration-300"
              style={{
                height: "0%",
                background: `linear-gradient(180deg, rgba(31, 181, 221, 0.2) 0.02%, #1FB5DD 21.38%, rgba(31, 181, 221, 0.2) 100%)`,
              }}
            />

            {/* Handle (animated cap) */}
            <div
              style={{
                top: `${
                  Number(capPosition) === 0 ? capPosition + 0 : capPosition - 6
                }%`,
              }}
              className="absolute top-5 left-1/2 -translate-x-1/2 w-[18px] h-[38px] rounded-[25px] bg-[#1FB5DD]  pointer-events-none"
              aria-label="Progress indicator"
            />
          </div>
        </div>
        {/* Right - Cards */}
        <div className="w-1/2 space-y-8 cards-container">
          {storyCards.map((card, index) => (
            <div
              key={index}
              className="story-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Gradientcard
                isHover={activeIndex !== index}
                className="max-w-[582px] min-h-[250px] rounded-3xl py-6 px-4"
                borderClassName={`max-w-[582px]  min-h-[250px] rounded-[24px] p-[1px] ${
                  activeIndex === index ? "scale-105" : "scale-100"
                }`}
              >
                <h2 className="text-[20px] md:text-[24px] font-semibold poppins mb-3">
                  {card.title}
                </h2>
                <p className="text-[14px] md:text-[16px] font-normal opensans leading-relaxed">
                  {card.description}
                </p>
              </Gradientcard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
