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
          
          .button-wrap {
            position: relative;
            display: inline-flex;
            margin: 1rem;
            z-index: 2;
            border-radius: 999vw;
            background: transparent;
            pointer-events: none;
            transition: all var(--anim--hover-time) var(--anim--hover-ease);
          }
       
          
          .glass-button {
            --border-width: clamp(1px, 0.0625em, 4px);
            all: unset;
            cursor: pointer;
            position: relative;
            pointer-events: auto;
            z-index: 3;
            background: #BAE8F417;
            border-radius: 999vw;
            // box-shadow: inset 0 0.125em 0.125em rgba(0,0,0,0.05),
            //             inset 0 -0.125em 0.125em rgba(255,255,255,0.5),
            //             0 0.25em 0.125em -0.125em rgba(0,0,0,0.2),
            //             0 0 0.1em 0.25em inset rgba(255,255,255,0.2),
            //             0 0 0 0 rgba(255,255,255,1);
            backdrop-filter: blur(clamp(1px, 0.125em, 4px));
            -webkit-backdrop-filter: blur(clamp(1px, 0.125em, 4px));
            transition: all var(--anim--hover-time) var(--anim--hover-ease);
    
          }
         .glass-button::after {
            content: "";
            position: absolute;
            z-index: 1;
            inset: 0;
            border-radius: 999vw;
            // width: calc(100% + var(--border-width));
            // height: calc(100% + var(--border-width));
            // top: calc(0% - var(--border-width) / 2);
            // left: calc(0% - var(--border-width) / 2);
            padding: var(--border-width);
            box-sizing: border-box;
            background: conic-gradient(from var(--angle-1) at 50% 50%, rgba(0,0,0,0.5), rgba(0,0,0,0) 5% 40%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 60% 95%, rgba(0,0,0,0.5)),
                        linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0.5));
            mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            mask-composite: exclude;
         
            transition: all var(--anim--hover-time) var(--anim--hover-ease), --angle-1 500ms ease;
            box-shadow: inset 0 0 0 calc(var(--border-width)/2) rgba(255,255,255,0.5);
          }
         
        `}
      </style>

      <div className="button-wrap h-[50px] ">
        <button className="glass-button w-80 ">
          <span className="text-xl py-4 px-3">{tag}</span>
        </button>
      </div>
    </div>
  );
};

export default GlassMorphism;
