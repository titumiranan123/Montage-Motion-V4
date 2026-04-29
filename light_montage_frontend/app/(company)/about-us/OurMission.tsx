import { Heading } from "@/component/share/Headering";

const OurMission = () => {
  return (
    <div className="container rounded-[42px] py-15 sectionGap missionbg">
      <style>{`
      .missionbg {
        background:
linear-gradient(180deg, #E9F8FC 0%, #F6FDFF 100%);

        
      }
      `}</style>
      <Heading
        subtitle="Every frame we touch is designed to earn attention and deliver results. "
        title="Visuals Built to Perform"
   
        tag="Our Mission & Vission"
        width="210"
      />
      <div className="lg:mt-10 mt-8 flex justify-between items-center lg:flex-row flex-col gap-6">
        <div data-aos="fade-up" data-aos-delay={300}>
          <div className="max-w-147 min-h-45 w-full h-full rounded-3xl py-6 px-5 text-(--text-primary)  bg-white/40  glassShadow backdrop-blur-lg">
            <h3 className="text-[20px] md:text-[24px] font-semibold poppins">
              Our Mission{" "}
            </h3>
            <p className="text-[14px] md:text-[16px] font-normal opensans mt-2">
             To be the creative engine behind the world&apos;s best video content. We handle the editing, design, and strategy so our clients can focus on growing. Every cut is intentional. Every thumbnail earns its click. 
            </p>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay={300}>
          <div className="max-w-147 min-h-45 w-full h-full rounded-3xl py-6 px-5 text-(--text-primary)  bg-white/40  glassShadow backdrop-blur-lg">
            <h3 className="text-[20px] md:text-[24px] font-semibold poppins">
              Our Vision{" "}
            </h3>
            <p className="text-[14px] md:text-[16px] font-normal opensans mt-2">
             A future where every creator and brand, regardless of size, has access to studio-quality production. We are building Montage Motion into the go-to creative partner for ambitious brands across the globe. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
