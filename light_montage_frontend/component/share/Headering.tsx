import React from "react";
import GlassMorphism from "./GlassMorphism";

interface headerProp {
  title: string;
  subtitle: string;
  tag: string;
  extratitle?: string;
  isbackground?: boolean;
}

export const Heading: React.FC<headerProp> = ({
  title,
  subtitle,
  tag,
  extratitle,
}) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center max-w-3xl w-full mx-auto">
      <GlassMorphism tag={tag} />
      <p className="text-4xl md:text-5xl font-semibold text-center text-gray-800 mt-4">
        {title}
      </p>

      {extratitle && (
        <p className="text-4xl md:text-5xl font-semibold text-center text-gray-800">
          {extratitle}
        </p>
      )}

      <p className="text-sm md:text-base font-normal text-center text-gray-600 mt-2 w-3/5 mx-auto">
        {subtitle}
      </p>
    </div>
  );
};
