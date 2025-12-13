/* eslint-disable @typescript-eslint/no-explicit-any */
import Brand from "@/component/about/Brand";
import HeaderService from "@/component/about/Header";
import TestimonialSection from "@/component/share/Testimonial";
import React from "react";
import InsideMontage from "./InsideMontage";
import OurMission from "./OurMission";
import OurTeam from "./OurTeam";
import OurStory from "./OurStory";
import { getPageSEO } from "@/component/share/getPageSEO";
import ContactSection from "@/component/share/ContactSection";
import Navbar from "@/component/share/Navbar";

// Metadata for SEO
export async function generateMetadata() {
  return await getPageSEO("about");
}

const AboutUs = async () => {
  let data: any = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/website/data?type=about&table=brand`,
      { cache: "no-store" } // ensures fresh data on every request
    );

    if (!res.ok) {
      console.error("Failed to fetch About data:", res.statusText);
    } else {
      data = await res.json();
    }
  } catch (error) {
    console.error("Error fetching About data:", error);
  }

  return (
    <div className="">
      <div className="headerbg rounded-[40px] max-w-[1440px] px-[60px] mx-auto pb-[60px]">
        <style>
          {`
            .headerbg {
              background: linear-gradient(180deg, #EAF0F7 30.22%, #69CDE8 100%);

            }
            `}
        </style>
        <Navbar />
        <HeaderService mainIntro={data?.data?.header || null} />
      </div>
      <Brand />
      <OurMission />

      {data?.data?.testimonial?.length > 0 && (
        <TestimonialSection
          title="What Our Clients Say"
          description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
          data={data?.data?.testimonial}
        />
      )}

      <OurStory />
      <OurTeam />
      <InsideMontage />
      <ContactSection />
    </div>
  );
};

export default AboutUs;
