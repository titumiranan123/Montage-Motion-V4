import Gradientcard from "@/component/share/Gradientcard";
import Heading from "@/component/share/Headering";
import React from "react";

const OurMission = () => {
  return (
    <div>
      <Heading
        subtitle="At Montage Motion, we blend creativity, strategy, and technology to transform ideas into visuals that inspire, engage, and deliver results."
        title="Crafting Stories That "
        extratitle="Connect"
        tag="Our Mission & Vission"
      />
      <div>
        <Gradientcard className="" borderClassName="">
          <h2>Our Mission </h2>
          <p>
            Our mission is to simplify the creative process for brands, creators
            , and bussinesses. We deliver video editing , design , advertising ,
            and digital solutions that not only look stunning but also achieve
            measurable impact. Every project is bilt on clarity, creativity, and
            consistency.
          </p>
        </Gradientcard>
        <Gradientcard className="" borderClassName="">
          <h2>Our Vision </h2>
          <p>
            We see a future where every story—whether from a creator, startup,
            or enterprise—has the power to captivate audiences. By combining
            design, marketing, and storytelling, Montage Motion envisions
            building a global hub of creative excellence that shapes how people
            connect with content.
          </p>
        </Gradientcard>
      </div>
    </div>
  );
};

export default OurMission;
