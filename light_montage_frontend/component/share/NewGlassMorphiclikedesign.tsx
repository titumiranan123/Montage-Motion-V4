import React from "react";

const NewGlassMorphiclikedesign = ({
  tag,
  width,
}: {
  tag: string;
  width: number;
}) => {
  return (
    <div>
      <style>
        {`

@property --angle-3 {
    syntax: "<angle>";
    inherits: false;
    initial-value: -95deg;
  }
  
  @property --angle-4 {
    syntax: "<angle>";
    inherits: false;
    initial-value: -45deg;
  }
        .glass-button-new {
        
            --border-width: clamp(1px, 0.0625em, 5px);
        position:relative;
        backdrop-filter: blur(1.25px);
        transition: all var(--anim--hover-time) var(--anim--hover-ease);
        display: flex;
        justify-content: center;
        align-items: center;
        }
        .glass-button-new:after{
            content: "";
            position: absolute;
            z-index: 1;
            inset: 0;
            padding: 2px;
            box-sizing: border-box;
            height:60px;
            border-radius: 999vw;
            display: flex;
            justify-content: center;
            align-items: center;
            background: conic-gradient(from 73deg at 52% 50%, rgba(0,0,0,0.5), rgba(252,252,252,252) 5% 45%, rgba(0,0,0,0.5) 50%, rgba(252,252,252,252) 54% 90%, rgba(0,0,0,0.5)),
                        linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.2));
            mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            mask-composite: exclude;
         
            transition: all var(--anim--hover-time) var(--anim--hover-ease), --angle-1 500ms ease;
            box-shadow: inset 0 0 0 2px rgba(255,255,255,0.1);
          
        }
            
            `}
      </style>
      <div className="button-wraps  bg-white/40  rounded-full  ">
        <button
          className={`${
            width > 0 ? `w-[${width}px]` : "w-52"
          } glass-button-new h-[60px] rounded-full cursor-pointer relative pointer-events-auto z-30 `}
        >
          <span className="text-xl py-4 px-3  bg-white/40  backdrop-blur-lg">
            {tag}
          </span>
        </button>
      </div>
    </div>
  );
};

export default NewGlassMorphiclikedesign;
