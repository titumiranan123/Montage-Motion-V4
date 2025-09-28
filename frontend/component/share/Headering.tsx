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
    <div className="flex flex-col gap-1 justify-center items-center sectionGap max-w-[658px] w-full mx-auto">
      <p className="bg-[#1D2122] text-[#E4E8F7] min-w-[122px] h-[38px] rounded-[24px] py-2 px-5 text-center opensans">
        {tag}
      </p>
      <p className="poppins text-[56px] leading-[120%] font-semibold text-center text-white">
        {title}
      </p>
      <p className="poppins text-[56px] leading-[120%] font-semibold text-center text-white">
        {extratitle}
      </p>
      <p className="opensans font-[400] text-[16px] leading-[150%] text-[#E4E8F7] text-center">
        {subtitle}
      </p>
    </div>
  );
};

export default Heading;
