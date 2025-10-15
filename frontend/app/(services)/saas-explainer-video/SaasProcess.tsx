import Gradientcard from "@/component/share/Gradientcard";
import Heading from "@/component/share/Headering";
import Image from "next/image";
import React from "react";

const SaasProcess = () => {
  return (
    <div className="container sectionGap">
      <Heading
        subtitle="Podcast editing made easy -- from raw recording to final polished episode."
        tag="Our Process"
        title="Our Simple Process"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-9 md:mt-16 gap-5">
        <Image
          src={"/assets/podcast/process.png"}
          alt="process "
          width={420}
          height={542}
          className="max-w-[420px] w-full max-h-[542px] h-full"
          priority
        />

        <div className="col-span-2 flex flex-col  gap-2">
          <Gradientcard
            className="contact-card flex justify-between items-center text-white max-w-[700px] w-full h-[170px] rounded-[24px]"
            borderClassName="max-w-[698px] w-full h-[168px] rounded-[24px] p-[1px]"
          >
            <div className="w-full">
              <h3 className="font-[600] poppins text-[24px] text-white">
                Share Your Raw Files
              </h3>
              <p className="text-white font-[400] text-[16px]">
                Upload your recordings and any notes, and we'll take it from
                there.{" "}
              </p>
            </div>
            <Image
              src={"/assets/icon/video-cut.png"}
              alt="icon"
              className="w-[56px] h-[56px]  rounded-[12px] p-[10px]"
              width={36}
              height={36}
            />
          </Gradientcard>
          <Gradientcard
            className="contact-card flex justify-between items-center text-white max-w-[700px] w-full h-[170px] rounded-[24px]"
            borderClassName="max-w-[698px] w-full h-[168px] rounded-[24px] p-[1px]"
          >
            <div className="w-full">
              <h3 className="font-[600] poppins text-[24px] text-white">
                Share Your Raw Files
              </h3>
              <p className="text-white font-[400] text-[16px]">
                Upload your recordings and any notes, and we'll take it from
                there.{" "}
              </p>
            </div>
            <Image
              src={"/assets/icon/video-cut.png"}
              alt="icon"
              className="w-[56px] h-[56px]  rounded-[12px] p-[10px]"
              width={36}
              height={36}
            />
          </Gradientcard>
          <Gradientcard
            className="contact-card flex justify-between items-center text-white max-w-[700px] w-full h-[170px] rounded-[24px]"
            borderClassName="max-w-[698px] w-full h-[168px] rounded-[24px] p-[1px]"
          >
            <div className="w-full">
              <h3 className="font-[600] poppins text-[24px] text-white">
                Share Your Raw Files
              </h3>
              <p className="text-white font-[400] text-[16px]">
                Upload your recordings and any notes, and we'll take it from
                there.{" "}
              </p>
            </div>
            <Image
              src={"/assets/icon/video-cut.png"}
              alt="icon"
              className="w-[56px] h-[56px]  rounded-[12px] p-[10px]"
              width={36}
              height={36}
            />
          </Gradientcard>
        </div>
      </div>
    </div>
  );
};

export default SaasProcess;
