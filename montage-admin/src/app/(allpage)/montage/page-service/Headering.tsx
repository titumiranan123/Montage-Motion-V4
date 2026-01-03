import React from "react";
interface headerProp {
  title: string;
  subtitle: string;
  tag: string;
  extratitle?: string;
}
const Heading: React.FC<headerProp> = ({
  title,
  subtitle,
  tag,
  extratitle,
}) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center sectionGap max-w-[668px] w-full mx-auto">
      <p
        data-aos="fade-up"
        data-aos-delay={100}
        className="bg-[#1D2122] text-[#E4E8F7] min-w-[122px] h-[38px] rounded-[24px] py-2 px-5 text-center opensans"
      >
        {tag}
      </p>
      <p
        data-aos="fade-up"
        data-aos-delay={200}
        className="poppins md:text-[56px] md:leading-[120%] font-semibold text-center text-white text-[32px]"
      >
        {title}
      </p>
      <p
        data-aos="fade-up"
        data-aos-delay={200}
        className="poppins md:text-[56px] text-[32px] md:leading-[120%] font-semibold text-center text-white"
      >
        {extratitle}
      </p>
      <p
        data-aos="fade-up"
        data-aos-delay={200}
        className="opensans font-[400] md:text-[16px] text-[14px] md:leading-[150%] text-[#E4E8F7] text-center"
      >
        {subtitle}
      </p>
    </div>
  );
};

export default Heading;
