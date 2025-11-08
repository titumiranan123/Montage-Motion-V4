import Gradientcard from "@/component/share/Gradientcard";
import Heading from "@/component/share/Headering";
import Image from "next/image";
import React from "react";

const OurTeam = async () => {
  const response = await fetch(
    `https://api-v2.montagemotion.com/api/website/about`
  );
  const data = await response.json();
  return (
    <div className="container sectionGap">
      <Heading
        subtitle="A passionate team of creators, strategists, and innovatiors working together to bring ideas to life."
        tag="Our Services"
        title="Meet the Minds Behind "
        extratitle="Montage Motion"
      />
      <div className="mt-8 lg:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.data?.member.map((member: any, idx: number) => {
          return (
            <div data-aos="fade-up" data-aos-delay={100 + idx * 100}>
              <Gradientcard
                className="max-w-[394px] h-[499px] w-full rounded-[24px] py-6 px-5 flex flex-col justify-center items-center"
                borderClassName="max-w-[394px] h-[501px] w-full rounded-[24px] p-[1px]"
              >
                <Image
                  src={member?.photourl}
                  alt={member?.name}
                  priority
                  className="max-w-[344px] max-h-[369px] w-full h-full bg-cover"
                  width={344}
                  height={369}
                />
                <div className="flex flex-col gap-1.5 w-full justify-start mt-4 text-[#E4E8F7]">
                  <h2 className="text-[20px] md:text-[24px] font-[600] poppins">
                    {member?.name}
                  </h2>
                  <p className="text-[14px] md:text-[16px] font-[400] opensans">
                    {member?.designation}
                  </p>
                </div>
              </Gradientcard>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurTeam;
