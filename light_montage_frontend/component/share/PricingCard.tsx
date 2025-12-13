import React from "react";
import { Bullet } from "../home/BulletPoint";
import Image from "next/image";
interface priceProp {
  price: any;
  idx: number;
}
const PricingCard: React.FC<priceProp> = ({ price, idx }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={100 + idx * 100}
      className="max-w-[398px] max-h-[716px] w-full h-full pricing-border p-px rounded-3xl"
    >
      <style>
        {`
    .pricing-border{
        background: linear-gradient(-419.36deg, #000000 43.7%, #315FAC 110.87%);
    }
    .pricing:hover {
        background: linear-gradient(189.36deg, #000000 13.7%, #315FAC 85.87%);
        transition: all 300 ease-in-out;
            }
    .bonus-bg{
    background: linear-gradient(209.88deg, rgba(0, 0, 0, 0.28) 23.29%, rgba(49, 95, 172, 0.28) 214.87%);
    }
        `}
      </style>
      <div
        className={`relative rounded-[24px] text-[#E4E8F7] p-6 sm:p-8 bg-black h-full pricing flex flex-col w-full overflow-hidden`}
      >
        <div>
          <h2 className="font-[600] poppins text-[24px]">{price?.name}</h2>
          <p className="text-[16px] font-[400] opensans">
            {price?.description}
          </p>
        </div>
        <div className="flex justify-start items-center lg:mt-6 lg:mb-6">
          <p className="text-[64px] font-[600] poppins flex items-center  text-(--text-primary)  gap-2">
            {" "}
            <Image
              src={"/assets/dollar.png"}
              alt="dollar"
              className="w-[38px] h-[64px]"
              width={38}
              height={64}
            />
            {Number(price?.price).toFixed(0)}
          </p>{" "}
          <p className="text-[16px] font-[400] mt-9 opensans">
            /{price?.billing_cycle}
          </p>
        </div>
        <div className="h-full flex justify-between flex-col gap-10">
          <div className="space-y-2">
            {price?.features?.map((b: any, i: number) => (
              <Bullet key={i} text={b?.feature} />
            ))}
          </div>
          <button className="max-w-[348px]   w-full  h-[48px] btn-color text-black py-4 px-5 rounded-[16px] flex justify-center items-center poppins font-[500] hover:scale-105 hover:-rotate-2 duration-300 delay-75 transition-all ease-in-out">
            Start a project
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
