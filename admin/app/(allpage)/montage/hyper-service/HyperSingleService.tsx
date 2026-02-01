import Image from "next/image";
import React from "react";
import Gradientcard from "./Gradientcard";
import Heading from "../page-service/Headering";
import Link from "next/link";

const SingleService = ({ data }: { data: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        subtitle={data?.paragraph}
        title={data?.heading_part1}
        extratitle={data?.heading_part2}
        tag={data?.tag}
      />
      <div className="lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.services?.map((dt: any, idx: number) => (
          <div key={idx} className="card-wrapper">
            {/* Front side */}
            <div className="card-front text-(--text-primary) flex justify-center items-start flex-col py-6 px-5 h-full bg-black rounded-3xl">
              <h2 className="md:text-[24px] text-[20px] poppins font-semibold">
                {dt?.service_title}
              </h2>
              <p className="md:text-[16px] text-[14px] font-normal leading-[140%] text-(--text-primary) mt-2 opensans">
                {dt?.service_description}
              </p>
              <div className="mt-auto w-full">
                <Image
                  src={dt?.image}
                  alt={dt?.alt}
                  width={344}
                  height={276}
                  priority
                  className="max-w-[344px] w-full max-h-[276px] h-full md:mt-8 mt-4"
                />
              </div>
            </div>

            {/* Back side */}
            <div className="card-back">
              <Gradientcard
                className="w-full h-full md:py-6 py-4 md:px-5 px-4 bg-black flex flex-col justify-center rounded-3xl"
                borderClassName="w-full h-full rounded-[24px] p-[1px] animated !duration-100"
              >
                <div className="flex justify-between items-start flex-col text-(--text-primary) gap-[111px] h-full">
                  <div>
                    <Image
                      src={dt?.icon}
                      alt={dt?.icon_alt ?? ""}
                      width={35}
                      height={35}
                      priority
                      className="transition-transform duration-500 ease-out"
                    />
                    <p className="text-[24px] leading-[100%] md:text-[24px] font-semibold poppins mt-2 text-(--text-primary)">
                      {dt?.service_title}
                    </p>
                  </div>
                  <p className="text-[14px] md:text-[16px] font-normal opensans text-(--text-secondary) leading-[140%]">
                    {dt?.service_description}
                  </p>
                  <div className="flex justify-end items-center w-full">
                    <Link
                      href={`https://montagemotion.com/${dt?.href}`}
                      className="py-2 px-4 rounded-lg btn-color transition-transform duration-300 ease-out hover:scale-105"
                    >
                      Get Start
                    </Link>
                  </div>
                </div>
              </Gradientcard>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .card-wrapper {
          position: relative;
          min-h-[500px];
          overflow: hidden;
          border-radius: 24px;
        }

        .card-front {
          transition: all 0.5s ease-out;
          opacity: 1;
          transform: translateY(0px);
        }

        .card-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: all 0.5s ease-out;
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
        }

        .card-wrapper:hover .card-front {
          opacity: 0;
          transform: translateY(-20px);
        }

        .card-wrapper:hover .card-back {
          opacity: 1;
          transform: translateY(0px);
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
};

export default SingleService;
