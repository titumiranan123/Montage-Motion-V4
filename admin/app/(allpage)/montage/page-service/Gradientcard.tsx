import React, { ReactNode } from "react";

interface props {
  className: string;
  borderClassName: string;
  children: ReactNode;
}
const Gradientcard: React.FC<props> = ({
  className,
  borderClassName,
  children,
}) => {
  return (
    <div className={`${borderClassName} bg-border`}>
      <div className={`${className} bg-gradient`}>{children}</div>
    </div>
  );
};

export default Gradientcard;
