import Image from "next/image";
import Link from "next/link";
import React from "react";

const SaasInshight = () => {
  return (
    <div className="saasinsight sectionarea sectionGap rounded-[40px] p-[60px]">
      <style>
        {`
        .saasinsight {
            background:linear-gradient(180deg, #E9F8FC 0%, #F6FDFF 100%);
        }
        `}
      </style>

      <div className=" flex justify-between items-center gap-10 lg:flex-row flex-col">
        <Image
          data-aos="fade-up"
          data-aos-delay={200}
          src={"/assets/services/saasinsight.png"}
          className="md:w-1/2 w-full"
          alt="sass"
          width={560}
          height={409}
        />
        <div className="md:w-1/2 w-full">
          <p className="glassShadowithoutinset bg-white/40  backdrop-blur-2xl w-[138px]  h-[46px] flex justify-center items-center rounded-3xl text-[14px] leading-[120%] text-(--text-primary) font-normal  poppins">
            Insight
          </p>
          <h2
            data-aos="fade-up"
            data-aos-delay={300}
            className="text-(--text-primary) text-[40px] font-semibold md:text-[56px] poppins text-center md:text-left leading-[110%]  mt-6"
          >
            Turn Your Saas Into a Story Customers Remember
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay={400}
            className="text-(--text-primary) text-[14px] font-normal md:text-[16px] opensans text-center md:text-left leading-[150% ]  mt-6"
          >
            Don’t let your product get lost in technical jargon. With Montage
            Motion, you get videos that simplify, engage, and convert—designed
            to boost signups, retention, and trust. Let’s create the explainer
            video that takes your SaaS from great idea to market leader.
          </p>
          <div className="w-full flex md:flex-row flex-col gap-3 mt-10">
            <button
              data-aos="fade-up"
              data-aos-delay={500}
              className="md:w-[205px] w-full  h-12 btn-color btn-color py-4 px-5 rounded-2xl flex justify-center items-center poppins font-medium"
            >
              Get an Estimate
            </button>
            <Link
              href={"/portfolio"}
              // data-aos="fade-up"
              // data-aos-delay={600}
              style={{}}
              className="md:w-[155px] w-full h-12 btn-secondary text-(--text-primary) py-4 px-5 rounded-2xl flex justify-center items-center poppins font-medium  bg-white/40 backdrop-blur-[21px] glassShadow"
            >
              Our Works
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaasInshight;
