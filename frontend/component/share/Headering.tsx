import React from "react";

interface headerProp {
  title: string;
  subtitle: string;
  tag: string;
  extratitle?: string;
  isbackground?: boolean;
  width?: string;
  className?: string;
}

export const Heading: React.FC<headerProp> = ({
  title,
  subtitle,
  tag,
  width = 400,
  isbackground,
  className,
}) => {
  return (
    <div
      className={`flex flex-col gap-1 justify-center items-center max-w-4xl w-full mx-auto ${className}`}
    >
      <p
        data-aos="fade-up"
        data-aos-delay={200}
        style={{ maxWidth: `${width}px` }}
        className={`  max-w-59.5 w-full h-11.5 flex justify-center items-center rounded-3xl text-[16px] leading-[140%]  font-normal  poppins glass-card ${isbackground ? "text-[#1FB5DD]" : "text-(--text-primary)"}`}
      >
        {tag}
      </p>

      <h2
        data-aos="fade-up"
        data-aos-delay={300}
        className="text-[36px] md:text-[56px] md:leading-[120%] font-medium text-center text-(--text-primary) mt-2 xl:mt-4 poppins"
      >
        {title}
      </h2>
      {/* 
      {extratitle && (
        <p className="text-4xl md:text-5xl font-semibold text-center text-gray-800 poppins">
          {extratitle}
        </p>
      )} */}

      <p
        data-aos="fade-up"
        data-aos-delay={400}
        className="text-sm md:text-base md:leading-[150%] font-normal text-center text-gray-600 mt-2 w-full xl:w-8/9 mx-auto "
      >
        {subtitle}
      </p>
      <style>{`
       .glass-card {
        width: "100%";
        height: 46px;
        background: rgba(255, 255, 255, 0.09);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 
          0 0.2px 1px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.5),
          inset 0 -1px 0 rgba(255, 255, 255, 0.1),
          inset 0 0 6px 3px rgba(255, 255, 255, 0.3);
        position: relative;
        overflow: hidden;
      }
      
      .glass-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.1),
          transparent
        );
      }
      
      .glass-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 100%;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.8),
          transparent,
          rgba(255, 255, 255, 0.3)
        );
      }
     
      `}</style>
    </div>
  );
};
