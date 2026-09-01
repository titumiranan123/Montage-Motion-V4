/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Bullet } from "../home/BulletPoint";
import Gradientcard from "./Gradientcard";
interface priceProp {
  price: any;
  idx: number;
}
const PricingCard: React.FC<priceProp> = ({ price, idx }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={100 + idx * 100}
      className="max-w-[398px] max-h-[716px] w-full h-full  p-px rounded-3xl"
    >
      <Gradientcard
        className="max-w-[398px] max-h-[716px] w-full h-full  p-px rounded-3xl bg-[#F7F7F7]"
        borderClassName="max-w-[398px] max-h-[716px] w-full h-full  p-px rounded-3xl "
        isHover={true}
      >
        <div
          className={`relative rounded-3xl text-(--text-primary) p-6 sm:p-8  h-full pricing flex flex-col w-full overflow-hidden`}
        >
          <div>
            <h2 className="font-semibold poppins text-[24px]">{price?.name}</h2>
            <p className="text-[16px] font-normal opensans">
              {price?.description}
            </p>
          </div>
          <div className="flex justify-start items-center lg:mt-6 lg:mb-6">
            <p className="text-[64px] font-semibold poppins flex items-center  text-(--text-primary)  gap-2">
              {" "}
              <span>$</span>
              {Number(price?.price).toFixed(0)}
            </p>
            <p className="text-[16px] font-normal mt-9 opensans">
              /{price?.billing_cycle}
            </p>
          </div>
          <div className="h-full flex justify-between flex-col gap-10">
            <div className="space-y-2">
              {price?.features?.map((b: any, i: number) => (
                <Bullet key={i} text={b?.feature} />
              ))}
            </div>
            <button className="max-w-[348px]   w-full  h-12 btn-color text-black py-4 px-5 rounded-2xl flex justify-center items-center poppins font-medium hover:scale-105  duration-300 delay-75 transition-all ease-in-out">
              Start a project
            </button>
          </div>
        </div>
      </Gradientcard>
    </div>
  );
};

export default PricingCard;
