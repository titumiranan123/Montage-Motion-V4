import Heading from "@/component/share/Headering";
import Image from "next/image";
import React from "react";
import ReactPlayer from "react-player";
const OurWork = () => {
  const data = [
    {
      image: "/assets/podcast/header-1.png",
      title: "Tech Talk",
      link: "https://youtu.be/RfO0RvZgzfc?si=XmMBkM50G0z0-oPN",
      alt: "work",
    },
    {
      image: "/assets/podcast/header-2.png",
      title: "Business Insights",
      link: "https://youtu.be/RfO0RvZgzfc?si=XmMBkM50G0z0-oPN",
      alt: "work",
    },
    {
      image: "/assets/podcast/header-3.png",
      title: "Creative Minds",
      link: "https://youtu.be/RfO0RvZgzfc?si=XmMBkM50G0z0-oPN",
      alt: "work",
    },
    {
      image: "/assets/podcast/header-4.png",
      title: "Future Vision",
      link: "https://youtu.be/RfO0RvZgzfc?si=XmMBkM50G0z0-oPN",
      alt: "work",
    },
    {
      image: "/assets/podcast/header-1.png",
      title: "Tech Talk",
      link: "https://youtu.be/RfO0RvZgzfc?si=XmMBkM50G0z0-oPN",
      alt: "work",
    },
    {
      image: "/assets/podcast/header-2.png",
      title: "Business Insights",
      link: "https://youtu.be/RfO0RvZgzfc?si=XmMBkM50G0z0-oPN",
      alt: "work",
    },
  ];
  return (
    <div className="container sectionGap">
      <Heading
        tag="Our Works"
        title="Our Works"
        subtitle="From podcasts with intimate conversations to shows with high-energy stroytelling, we've hellped creators and brands produce episodes that sound professional, engaging , and ready for any platform."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 lg:mt-16 ">
        {data?.map((item, idx) => (
          <div
            key={idx}
            className="max-w-[316px] mx-auto w-full h-[216px] rounded-[13px]"
          >
            <ReactPlayer
              src={item.link}
              light={
                <Image
                  src={item.image}
                  alt=""
                  width={384}
                  height={216}
                  className="rounded-[13px]"
                />
              }
              playing={false}
              controls={true}
              width="100%"
              height="100%"
              //   onEnded={handleVideoEnd}
              //   onPause={() => {
              //     setIsPlaying(false);
              //     startAutoplay();
              //   }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurWork;
