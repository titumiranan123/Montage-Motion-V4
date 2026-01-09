import React, { ReactNode } from "react";

interface Props {
  className: string;
  borderClassName: string;
  children: ReactNode;
  isHover?: boolean;
}

const Gradientcard: React.FC<Props> = ({
  className,
  borderClassName,
  children,
  isHover = false,
}) => {
  return (
    <div
      className={`${borderClassName}  ${
        isHover ? "border-hover " : "border-normal"
      }`}
    >
      <style>{`
      .bg {
        background: linear-gradient(179.93deg, #ffffff 0.07%, #ccf4ff 99.96%);
      }
      .bg-gradient-card:hover {
        background: linear-gradient(179.93deg, #ffffff 0.07%, #ccf4ff 99.96%);
      }
      
      .border-normal {
        background: linear-gradient(
          242.39deg,
          #1fb5dd -5.78%,
          rgba(255, 255, 255, 0.9) 38.74%
        );
      }
      
      .border-hover:hover {
        background: linear-gradient(
          242.39deg,
          #1fb5dd -5.78%,
          rgba(31, 181, 221, 0) 38.74%
        );
      }
      
      `}</style>
      <div
        className={`${className} ${
          !isHover ? "bg" : "bg-gradient-card"
        } transition-colors duration-300 `}
      >
        {children}
      </div>
    </div>
  );
};

export default Gradientcard;
