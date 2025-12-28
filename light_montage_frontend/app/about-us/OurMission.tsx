import { Heading } from "@/component/share/Headering";

const OurMission = () => {
  return (
    <div className="container rounded-[42px] py-[60px] sectionGap testimonialbg">
      <Heading
        subtitle="At Montage Motion, we blend creativity, strategy, and technology to transform ideas into visuals that inspire, engage, and deliver results."
        title="Crafting Stories That "
        extratitle="Connect"
        tag="Our Mission & Vission"
      />
      <div className="lg:mt-10 mt-8 flex justify-between items-center lg:flex-row flex-col gap-6">
        <div data-aos="fade-up" data-aos-delay={300}>
          <div className="max-w-[588px] min-h-[180px] w-full h-full rounded-3xl py-6 px-5 text-(--text-primary)  bg-white/40  glassShadow backdrop-blur-lg">
            <h2 className="text-[20px] md:text-[24px] font-semibold poppins">
              Our Mission{" "}
            </h2>
            <p className="text-[14px] md:text-[16px] font-normal opensans mt-2">
              Our mission is to simplify the creative process for brands,
              creators , and bussinesses. We deliver video editing , design ,
              advertising , and digital solutions that not only look stunning
              but also achieve measurable impact. Every project is bilt on
              clarity, creativity, and consistency.
            </p>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay={300}>
          <div className="max-w-[588px] min-h-[180px] w-full h-full rounded-3xl py-6 px-5 text-(--text-primary)  bg-white/40  glassShadow backdrop-blur-lg">
            <h2 className="text-[20px] md:text-[24px] font-semibold poppins">
              Our Vision{" "}
            </h2>
            <p className="text-[14px] md:text-[16px] font-normal opensans mt-2">
              We see a future where every story—whether from a creator, startup,
              or enterprise—has the power to captivate audiences. By combining
              design, marketing, and storytelling, Montage Motion envisions
              building a global hub of creative excellence that shapes how
              people connect with content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
