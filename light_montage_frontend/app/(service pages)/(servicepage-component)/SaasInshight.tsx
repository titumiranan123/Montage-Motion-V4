import Image from "next/image";
import Link from "next/link";
import React from "react";

const SaasInshight = () => {
  return (
    <div className="saasinsight sectionarea sectionGap rounded-[40px] ">
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
            SaaS Explainer Video Editing That Converts Visitor into Customers
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay={400}
            className="text-(--text-primary) text-[14px] font-normal md:text-[16px] opensans text-center md:text-left leading-[150% ]  mt-6"
          >
            Features mean nothing if prospects don&apos;t understand them in 60
            seconds. Tight editing removes confusion, highlights benefits over
            specs, and shows exactly how your software solves their problem
            without wasting time on unnecessary details.
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
              data-aos="fade-up"
              data-aos-delay={600}
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
