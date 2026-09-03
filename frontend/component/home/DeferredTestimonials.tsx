"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const TestimonialSection = dynamic(() => import("@/component/share/Testimonial"), {
  ssr: false,
  loading: () => <div className="min-h-175" aria-hidden="true" />,
});

export default function DeferredTestimonials({ data }: { data: unknown[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      {shouldLoad ? (
        <TestimonialSection
          title="What Our Clients Say"
          description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
          data={data as never[]}
        />
      ) : (
        <div className="min-h-175" aria-hidden="true" />
      )}
    </div>
  );
}
