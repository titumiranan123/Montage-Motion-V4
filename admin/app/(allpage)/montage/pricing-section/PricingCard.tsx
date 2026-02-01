import React from "react";
import Image from "next/image";
import { Bullet } from "./BulletPoint";
interface priceProp {
  price: any;
}
const PricingCard: React.FC<priceProp> = ({ price }) => {
  console.log(price.features);
  return (
    <div className="max-w-[398px] max-h-[716px] w-full h-full pricing-border p-[1px] rounded-[24px]">
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
          <p className="text-[44px] font-[600] poppins flex items-center text-white gap-2">
            {" "}
            {price.currency !== "BDT" ? (
              <Image
                src={"/assets/dollar.png"}
                alt="dollar"
                className="w-[38px] h-[64px]"
                width={38}
                height={64}
              />
            ) : (
              <span>Tk.</span>
            )}
            {price?.price}
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
          <button className="max-w-[348px]   w-full  h-[48px] btn-color text-black py-4 px-5 rounded-[16px] flex justify-center items-center poppins font-[500]">
            Start a project
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
