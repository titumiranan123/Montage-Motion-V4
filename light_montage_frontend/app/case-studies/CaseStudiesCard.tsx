import Gradientcard from '@/component/share/Gradientcard';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CaseStudiesCard = ({
  image,
  title,
  short_description,
  slug,
}: {
  image: string;
  title: string;
  short_description: string;
  slug: string;
}) => {
  return (
    <Gradientcard
      isHover={true}
      className="w-full lg:max-w-210 lg:w-210 lg:h-146.5 rounded-3xl bg-[#F7F7F7]!"
      borderClassName="w-full lg:max-w-211 lg:w-211 group animated lg:h-[588px] rounded-3xl p-[1.5px]"
    >
      <Link
        href={`/case-studies/${slug}`}
        className="p-4 sm:p-5 overflow-hidden block cursor-pointer"
      >
        <Image
          className="w-full lg:max-w-200 h-48 sm:h-56 lg:h-106 object-center rounded-[13px] object-cover"
          src={image}
          alt={title}
          width={800}
          height={276}
          priority
        />

        <div className="mt-4 sm:mt-6 text-(--text-primary)">
          <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold leading-6 sm:leading-6.5 md:leading-8 mt-2 poppins line-clamp-2">
            {title}
          </h3>
          <p className="text-[13px] sm:text-[14px] md:text-[16px] opensans font-normal mt-2 transform-gpu line-clamp-2">
            {short_description}
          </p>
        </div>
      </Link>
    </Gradientcard>
  );
};

export default CaseStudiesCard;