"use client";
import VideoPlayer from "@/component/home/VideoPlayer";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading } from "@/component/share/Headering";
import Image from "next/image";
import { getSafeImageSrc } from "@/utils/media";
import { useState } from "react";

const INITIAL_VISIBLE_WORKS = 6;
const WORKS_PER_LOAD = 6;

const Thumbnailworksection = ({
  works,
}: {
  works: any;
}) => {
  const allWorks = Array.isArray(works?.work) ? works.work : [];
  const [visibleWorks, setVisibleWorks] = useState<any[]>(
    allWorks.slice(0, INITIAL_VISIBLE_WORKS),
  );
  const [nextPage, setNextPage] = useState(2);
  const [hasMoreWorks, setHasMoreWorks] = useState(
    allWorks.length > INITIAL_VISIBLE_WORKS,
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(false);

  const loadMoreWorks = async () => {
    if (isLoadingMore || !hasMoreWorks || !works?.type) return;

    setIsLoadingMore(true);
    setLoadMoreError(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/works/website?type=${encodeURIComponent(
          works.type,
        )}&page=${nextPage}&limit=${WORKS_PER_LOAD}`,
      );

      if (!response.ok) throw new Error("Failed to load more works");

      const result = await response.json();
      const pageData = result?.data;
      const nextItems = Array.isArray(pageData)
        ? pageData
        : pageData?.items ?? [];
      const pagination = pageData?.pagination;

      setVisibleWorks((currentWorks) => {
        const existingKeys = new Set(
          currentWorks.map((item) => item?.id || item?.video_link || item?.thumbnail),
        );
        const uniqueItems = nextItems.filter(
          (item: any) =>
            !existingKeys.has(item?.id || item?.video_link || item?.thumbnail),
        );
        return [...currentWorks, ...uniqueItems];
      });

      const reachedLastPage = pagination
        ? nextPage >= pagination.totalPages
        : nextItems.length < WORKS_PER_LOAD;
      setHasMoreWorks(!reachedLastPage);
      setNextPage((page) => page + 1);
    } catch {
      setLoadMoreError(true);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="sectionarea thumbnailng rounded-[40px] overflow-hidden sectionGap">
      <Heading
        subtitle={works?.paragraph}
        tag={works?.tag}
        title={works?.heading_part1}
        width="180"
      />
      <style>{`
        .thumbnailng {
          background: linear-gradient(180deg, #E9F8FC 0%, #F6FDFF 100%);

        }
        `}</style>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 lg:mt-16">
        {works?.type !== "shortsreels-editing" ? (
          <>
            {visibleWorks.map((dt: any, idx: number) => (
              <div
                data-aos="fade-up"
                data-aos-delay={200 + idx * 100}
                key={dt?.id || idx}
              >
                {/* Thumbnail */}
                {dt?.video_link === "" || dt?.video_link === null ? (
                  <Image
                    src={getSafeImageSrc(dt?.thumbnail)}
                    alt={dt?.title || "Graphic work"}
                    width={410}
                    height={308}
                    className="  z-10 
                  relative
                  overflow-hidden
                  origin-center
                  transition-all
                  duration-300
                  hover:scale-105
                  aspect-video
                  max-w-102.5
                  w-full
                  h-full
                  max-h-77
                  rounded-[13px]
                
                "
                  />
                ) : (
                  <div className="aspect-auto overflow-hidden rounded-xl">
                    <VideoPlayer
                      thumbnail={dt?.thumbnail}
                      link={dt?.video_link}
                    />
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <>
            {visibleWorks.map((dt: any, idx: number) => (
              <div
                data-aos="fade-up"
                data-aos-delay={200 + idx * 100}
                key={dt?.id || idx}
              >
                <div className="aspect-9/16! overflow-hidden rounded-xl">
                  <VideoPlayer
                    thumbnail={dt?.thumbnail}
                    link={dt?.video_link}
                    className="aspect-9/16!"
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {hasMoreWorks && (
        <div className="mt-16 flex justify-center items-center">
          <button
            type="button"
            data-aos="fade-up"
            data-aos-delay={400}
            onClick={loadMoreWorks}
            disabled={isLoadingMore}
            className="btn-color py-4 px-6 hover:scale-105 active:scale-90 rounded-lg text-base font-medium transition-transform ease-in-out duration-200"
          >
            {isLoadingMore ? "Loading..." : "View More"}
          </button>
          {loadMoreError && (
            <p role="alert" className="mt-3 text-sm text-red-600">
              Could not load more videos. Please try again.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Thumbnailworksection;
