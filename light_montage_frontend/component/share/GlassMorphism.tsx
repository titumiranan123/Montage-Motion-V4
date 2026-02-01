import React from "react";

const GlassMorphism = ({ tag }: { tag: string }) => {
  return (
    <div>
      <style>
        {`
          @property --angle-1 {
            syntax: "<angle>";
            inherits: false;
            initial-value: -75deg;
          }
          
          @property --angle-2 {
            syntax: "<angle>";
            inherits: false;
            initial-value: -45deg;
          }
          
          :root {
            --global--size: clamp(2rem, 7vw, 2rem);
            --anim--hover-time: 400ms;
            --anim--hover-ease: cubic-bezier(0.25, 1, 0.5, 1);
          }
          
         
        `}
      </style>

      <button className="glass-button glass-card   ">
        <span className="text-xl py-4 px-3 ">{tag}</span>
      </button>
    </div>
  );
};

export default GlassMorphism;
