import React, { ReactNode } from "react";

interface props {
  className: string;
  borderClassName: string;
  children: ReactNode;
  isHover?: boolean;
}
const Gradientcard: React.FC<props> = ({
  className,
  borderClassName,
  children,
  isHover = false,
}) => {
  return (
    <div
      className={`animated ${borderClassName}  ${
        isHover ? "bg-border-hover" : "bg-border-color"
      }  `}
    >
      <style>{`
      /* gadient card */
      .bg-gradient-card {
        background: linear-gradient(179.93deg, #ffffff 0.07%, #ccf4ff 99.96%);
      }
      .bg-border-color {
        background: linear-gradient(
          242.39deg,
          #1fb5dd -5.78%,
          rgba(31, 181, 221, 0) 38.74%
        );
      }
      .bg-border-hover{
        background: #F7F7F7;
        
      }
      .bg-border-hover:hover {
        background: linear-gradient(
          242.39deg,
          #1fb5dd -5.78%,
          rgba(31, 181, 221, 0) 38.74%
        );
      }
      .bg-border-color:hover {
        /* background: linear-gradient(208.39deg, #3357a3 100%, rgba(51, 87, 163, 0) 0%); */
        transition: all 0.3s ease-in-out;
      } 
      .bg-gradient-card-hover:hover{
        background: linear-gradient(179.93deg, #ffffff 0.07%, #ccf4ff 99.96%);
      }
      `}</style>
      <div
        className={`animated ${className} ${
          isHover ? "bg-gradient-card-hover bg-white" : "bg-gradient-card"
        } `}
      >
        {children}
      </div>
    </div>
  );
};

export default Gradientcard;
