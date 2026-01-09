/* eslint-disable @typescript-eslint/no-explicit-any */
import Gradientcard from "@/component/share/Gradientcard";
import { Heading } from "@/component/share/Headering";
import Image from "next/image";
import Link from "next/link";

const JobPost = ({ data }: { data: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        subtitle={data.paragraph}
        title={data.heading_part1}
        extratitle={data.heading_part2}
        tag={data.tag}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:mt-10 mt-8">
        {data?.jobposts?.map((job: any, idx: number) => (
          <div key={idx} data-aos="fade-up" data-aos-delay={100 + idx * 100}>
            <Gradientcard
              key={idx}
              className="max-w-[384px] w-full  h-full rounded-3xl py-6 px-5 text-(--text-primary)"
              borderClassName="max-w-[384px] w-full max-h-[425px] h-full rounded-[24px] p-[1px]"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p className="text-[12px] opensans font-normal">
                    {job?.positions_available} Positions
                  </p>
                  <p className="text-[12px] opensans font-normal">
                    Deadline:{job?.deadline}
                  </p>
                </div>
                <h2 className="text-[20px] md:text-[24px] poppins font-semibold">
                  {job?.job_title}
                </h2>
                <p className="text-[14px] md:text-[16px] opensans font-normal">
                  {job?.description}
                </p>
              </div>
              <div className="flex">
                <button>Full time</button>
                <button>In House</button>
              </div>
              <div className="flex flex-col justify-between ">
                <div className="hidden justify-start items-center lg:mt-6 ">
                  {job?.salary ? (
                    <>
                      <div className="text-[64px] font-semibold poppins flex items-center text-white gap-2">
                        <Image
                          src={"/assets/dollar.png"}
                          alt="dollar"
                          className="w-[38px] h-16"
                          width={38}
                          height={64}
                        />
                        {job?.salary?.amount}
                      </div>
                      <p className="text-[16px] font-normal mt-9 opensans">
                        /Month
                      </p>
                    </>
                  ) : (
                    <div className="h-5" /> // একটু spacing রাখবে, design consistent
                  )}
                </div>

                <style>
                  {`
          .btn-colors:hover{
            background: linear-gradient(96.76deg, #FFFFFF -19.08%, #1FB5DD 48.57%, #FFFFFF 116.22%);

          }
          
          `}
                </style>
                <Link
                  href={`${job?.applylink}`}
                  target="_blank"
                  style={{ boxShadow: "0px 0px 25px 0px #FFFFFF40 inset" }}
                  className="max-w-[348px] bg-white/20 backdrop-blur-[20px] text-white    w-full  h-12 btn-colors hover:text-black py-4 px-5 rounded-2xl flex justify-center items-center poppins font-medium mt-6"
                >
                  Apply Now
                </Link>
              </div>
            </Gradientcard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPost;
