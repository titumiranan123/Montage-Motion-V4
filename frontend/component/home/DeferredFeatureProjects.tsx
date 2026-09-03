"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const OurFeatureProject = dynamic(() => import("./OurFeatureProject"), {
  ssr: false,
  loading: () => <div className="min-h-150" aria-hidden="true" />,
});

export default function DeferredFeatureProjects({
  category,
  header,
}: {
  category: unknown;
  header: unknown;
}) {
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
      {shouldLoad ? <OurFeatureProject category={category} header={header} /> : <div className="min-h-150" aria-hidden="true" />}
    </div>
  );
}
