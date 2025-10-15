import Image from "next/image";
import React from "react";

const SaasThirdSection = () => {
  return (
    <div className="container sectionGap flex justify-between items-center gap-10 lg:flex-row flex-col">
      <Image
        src={"/assets/sass/saascustomer.png"}
        alt="sass"
        width={560}
        height={409}
      />
      <div>
        <h2 className="text-white text-[40px] font-[600] md:text-[56px] poppins text-center md:text-left leading-[110%]  mt-6">
          Turn Your Saas Into a Story Customers Remember
        </h2>
        <p className="text-white text-[14px] font-[400] md:text-[16px] opensans text-center md:text-left leading-[150% ]  mt-6">
          Don’t let your product get lost in technical jargon. With Montage
          Motion, you get videos that simplify, engage, and convert—designed to
          boost signups, retention, and trust. Let’s create the explainer video
          that takes your SaaS from great idea to market leader.
        </p>
        <div className="w-full flex md:flex-row flex-col gap-3 mt-10">
          <button className="md:w-[205px] w-full  h-[48px] btn-color text-black py-4 px-5 rounded-[16px] flex justify-center items-center poppins font-[500]">
            Get an Estimate
          </button>
          <button
            style={{}}
            className="md:w-[155px] w-full h-[48px] btn-secondary text-white py-4 px-5 rounded-[16px] flex justify-center items-center poppins font-[500]"
          >
            Our Works
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaasThirdSection;
