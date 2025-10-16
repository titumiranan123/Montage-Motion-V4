import VideoPlayer from "@/component/home/PrettyPlayer";
import Heading from "@/component/share/Headering";
import React from "react";

const SaasWork = () => {
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
        subtitle="A quick look at how we've helped SaaS brands explain, engage, and expand their audience."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 lg:mt-16">
        {data?.map((item, idx) => (
          <div
            key={idx}
            className="max-w-[316px] w-full h-[216px] mx-auto rounded-[13px]"
          >
            <VideoPlayer youtubeUrl="" thumbnail={item?.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaasWork;
