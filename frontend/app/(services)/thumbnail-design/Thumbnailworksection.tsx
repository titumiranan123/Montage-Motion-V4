import Heading from "@/component/share/Headering";
import Image from "next/image";
import React from "react";

const Thumbnailworksection = ({ works }: { works: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        subtitle="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing "
        tag="Our Works"
        title="Our Feature Reels"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 lg:mt-16">
        {works?.map((dt: any, idx: number) => (
          <div
            data-aos="fade-up"
            data-aos-delay={200 + idx * 100}
            key={dt.id || idx}
            className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 aspect-video max-w-[348px] w-full h-full max-h-[216px] rounded-[13px]"
          >
            {/* Title */}
            {dt.title && (
              <p className="absolute z-20 text-sm py-1 px-2 rounded-[13px] left-2 top-2 text-white bg-[#00000066]">
                {dt.title}
              </p>
            )}

            {/* Thumbnail */}
            {dt.thumbnail ? (
              <Image
                src={dt.thumbnail}
                alt={dt.title || "Graphic work"}
                width={348}
                height={216}
                className="rounded-[13px] object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center bg-gray-700 w-full h-full rounded-[13px]">
                <p>No thumbnail</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thumbnailworksection;
