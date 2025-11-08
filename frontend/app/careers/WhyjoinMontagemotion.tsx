import Heading from "@/component/share/Headering";
import Gradientcard from "@/component/share/Gradientcard";
import StorySlider from "../about-us/StorySlider";

function WhyjoinMontagemotion() {
  return (
    <section className="sectionGap container">
      <Heading
        subtitle="From humble beginnings to a growing creative powerhouse — discover how Montage Motion started, evolved, and where we’re headed next."
        tag="Our Story"
        title="Our Story in Motion"
      />
      <div className="lg:mt-10 mt-8 flex justify-between lg:flex-row flex-col items-center gap-7">
        <div
          data-aos="fade-up"
          data-aos-delay={200}
          className="lg:w-1/2 w-full"
        >
          <StorySlider />
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay={300}
          className=" text-[#E4E8F7] flex flex-col gap-4 lg:w-1/2 w-full"
        >
          <Gradientcard
            className="max-w-[582px] min-h-[180px] rounded-[24px] py-6 px-4 "
            borderClassName="max-w-[582px] min-h-[180px] rounded-[24px] p-[1px]"
          >
            <h2 className="text-[20px] md:text-[24px] font-[600] poppins ">
              Where we Began
            </h2>
            <p className="text-[14px] md:text-[16px] font-[400] opensans ">
              Montage Motion started with a passion for storytelling throught
              video. What began as a small editingteam foucsed on helpoing
              creators polish their content quickly became a creative hub where
              ideas turned into impactful visuals.
            </p>
          </Gradientcard>
          <Gradientcard
            className="max-w-[582px] min-h-[180px] rounded-[24px] py-6 px-4 "
            borderClassName="max-w-[582px] min-h-[180px] rounded-[24px] p-[1px]"
          >
            <h2 className="text-[20px] md:text-[24px] font-[600] poppins ">
              How we Began
            </h2>
            <p className="text-[14px] md:text-[16px] font-[400] opensans ">
              As demand grew, so did we. From video editing, we expanded into
              advertising, graphic design, and custom website development. Our
              team grew into a powerhouse of 12+ specialists, delivering
              projects for creators, businesses, and brands across industries.
            </p>
          </Gradientcard>
          <Gradientcard
            className="max-w-[582px] min-h-[180px] rounded-[24px] py-6 px-4 "
            borderClassName="max-w-[582px] min-h-[180px] rounded-[24px] p-[1px]"
          >
            <h2 className="text-[20px] md:text-[24px] font-[600] poppins ">
              Where we're Going
            </h2>
            <p className="text-[14px] md:text-[16px] font-[400] opensans ">
              The future is bold. Montage Motion is on a mission to become a
              global creative partner for content creators and brands, pushing
              the boundaries of short-form video, marketing visuals, and digital
              storytelling. We’re building towards innovation, scale, and impact
              that inspires millions.
            </p>
          </Gradientcard>
        </div>
      </div>
    </section>
  );
}

export default WhyjoinMontagemotion;
