import Heading from "@/component/share/Headering";
import Image from "next/image";
import React from "react";

const InsideMontage = () => {
  return (
    <div className="sectionGap container">
      <Heading
        subtitle="Take a peek at where creativity comes to life - our vibrant workspace, collaborative areas, and behind-the-scenes moments"
        title="Inside Montage Motion"
        tag="Our Location"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-4 max-w-[1200px] mx-auto lg:mt-20 mt-10">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <Image
            src="/assets/gallary/image-1.png"
            alt="Creative workspace view"
            width={389}
            height={593}
            className="rounded-lg object-cover w-full h-auto"
            priority
            data-aos="fade-up"
            data-aos-delay={400}
          />
          <Image
            src="/assets/gallary/image-4.png"
            alt="Behind the scenes"
            width={389}
            height={375}
            className="rounded-lg object-cover w-full h-auto"
            data-aos="fade-up"
            data-aos-delay={450}
          />
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          <Image
            src="/assets/gallary/image-2.png"
            alt="Collaborative area"
            width={389}
            height={265}
            className="rounded-lg object-cover w-full h-auto"
            data-aos="fade-up"
            data-aos-delay={500}
          />
          <Image
            src="/assets/gallary/image-5.png"
            alt="Editing desk setup"
            width={389}
            height={265}
            className="rounded-lg object-cover w-full h-auto"
            data-aos="fade-up"
            data-aos-delay={550}
          />
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4">
          <Image
            src="/assets/gallary/image-3.png"
            alt="Brainstorming session room"
            width={389}
            height={410}
            className="rounded-lg object-cover w-full h-auto"
            data-aos="fade-up"
            data-aos-delay={550}
          />
          <Image
            src="/assets/gallary/image-6.png"
            alt="Team working together"
            width={389}
            height={513}
            className="rounded-lg object-cover w-full h-auto"
            data-aos="fade-up"
            data-aos-delay={600}
          />
        </div>
      </div>
    </div>
  );
};

export default InsideMontage;
