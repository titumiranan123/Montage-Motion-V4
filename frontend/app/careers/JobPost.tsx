import Gradientcard from "@/component/share/Gradientcard";
import Heading from "@/component/share/Headering";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const jobData = [
  {
    jobTitle: "Sr. Video Editor",
    positionsAvailable: 2,
    deadline: "October 25, 2025",
    description: "Craft engaging videos for creators, brands, and campaigns.",
    employmentType: "Full time",
    workArrangement: "In House",
    salary: {
      amount: 300,
      unit: "/Month",
      currency: "$",
    },
    action: "Apply Now",
  },
  {
    jobTitle: "Sr. Video Editor",
    positionsAvailable: 2,
    deadline: "October 25, 2025",
    description: "Craft engaging videos for creators, brands, and campaigns.",
    employmentType: "Full time",
    workArrangement: "In House",
    salary: {
      amount: 300,
      unit: "/Month",
      currency: "$",
    },
    action: "Apply Now",
  },
  {
    jobTitle: "Sr. Video Editor",
    positionsAvailable: 2,
    deadline: "October 25, 2025",
    description: "Craft engaging videos for creators, brands, and campaigns.",
    employmentType: "Full time",
    workArrangement: "In House",
    salary: {
      amount: 300,
      unit: "/Month",
      currency: "$",
    },
    action: "Apply Now",
  },
  {
    jobTitle: "Sr. Video Editor",
    positionsAvailable: 2,
    deadline: "October 25, 2025",
    description: "Craft engaging videos for creators, brands, and campaigns.",
    employmentType: "Full time",
    workArrangement: "In House",
    salary: {
      amount: 300,
      unit: "/Month",
      currency: "$",
    },
    action: "Apply Now",
  },
  {
    jobTitle: "Sr. Video Editor",
    positionsAvailable: 2,
    deadline: "October 25, 2025",
    description: "Craft engaging videos for creators, brands, and campaigns.",
    employmentType: "Full time",
    workArrangement: "In House",
    salary: {
      amount: 300,
      unit: "/Month",
      currency: "$",
    },
    action: "Apply Now",
  },
  {
    jobTitle: "Sr. Video Editor",
    positionsAvailable: 2,
    deadline: "October 25, 2025",
    description: "Craft engaging videos for creators, brands, and campaigns.",
    employmentType: "Full time",
    workArrangement: "In House",
    salary: {
      amount: 300,
      unit: "/Month",
      currency: "$",
    },
    action: "Apply Now",
  },
];
const JobPost = ({ data }: { data: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        subtitle={
          data.paragraph
            ? data?.paragraph
            : "Everything you need to make your podcast sound professional, polished, and ready to publish."
        }
        title={data.heading_part1 ? data?.heading_part1 : "Check Our Open "}
        extratitle={
          data.heading_part2 ? data?.heading_part2 : "Positions for you"
        }
        tag={data.heading_part2 ? data?.heading_part2 : "Avaiable Positions"}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:mt-10 mt-8">
        {data?.jobposts?.map((job: any, idx: number) => (
          <div key={idx} data-aos="fade-up" data-aos-delay={100 + idx * 100}>
            <Gradientcard
              key={idx}
              className="max-w-[384px] w-full  h-full rounded-[24px] py-6 px-5 text-[#E4E8F7]"
              borderClassName="max-w-[384px] w-full max-h-[425px] h-full rounded-[24px] p-[1px]"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p className="text-[12px] opensans font-[400]">
                    {job?.positions_available} Positions
                  </p>
                  <p className="text-[12px] opensans font-[400]">
                    Deadline:{job?.deadline}
                  </p>
                </div>
                <h2 className="text-[20px] md:text-[24px] poppins font-[600]">
                  {job?.job_title}
                </h2>
                <p className="text-[14px] md:text-[16px] opensans font-[400]">
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
                      <div className="text-[64px] font-[600] poppins flex items-center text-white gap-2">
                        <Image
                          src={"/assets/dollar.png"}
                          alt="dollar"
                          className="w-[38px] h-[64px]"
                          width={38}
                          height={64}
                        />
                        {job?.salary?.amount}
                      </div>
                      <p className="text-[16px] font-[400] mt-9 opensans">
                        /Month
                      </p>
                    </>
                  ) : (
                    <div className="h-[20px]" /> // একটু spacing রাখবে, design consistent
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
                  className="max-w-[348px] bg-white/20 backdrop-blur-[20px] text-white    w-full  h-[48px] btn-colors hover:text-black py-4 px-5 rounded-[16px] flex justify-center items-center poppins font-[500] mt-6"
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
