"use client";
import Image from "next/image";
import { Heading } from "@/component/share/Headering";
import Gradientcard from "@/component/share/Gradientcard";

interface Service {
  service_title: string;
  service_description: string;
  image: string;
  title: string;
}

interface PageServiceSectionProps {
  data: {
    paragraph: string;
    heading_part1: string;
    tag: string;
    services: Service[];
  };
}

const PageServicesection = ({ data }: PageServiceSectionProps) => {
  const { services = [], paragraph, heading_part1, tag } = data || {};
  const length = services.length;

  // Common card component to avoid repetition
  const ServiceCard = ({
    service,
    isSecondRow,
  }: {
    service: Service;
    isSecondRow?: boolean;
  }) => (
    <div className={`group h-[500px] ${isSecondRow ? "col-span-3" : ""}`}>
      <Gradientcard
        isHover={true}
        borderClassName="w-full max-h-[482px] h-full rounded-[24px] p-[1px] animated hover:scale-[102%] overflow-hidden"
        className="w-full max-h-[480px] h-full rounded-3xl text-(--text-primary) flex flex-col p-4 bg-[#F7F7F7]!"
      >
        <div className="flex-1">
          <h2 className="text-[24px] font-semibold">{service.service_title}</h2>
          <p className="text-[16px] font-normal leading-[140%] text-(--text-primary) mt-2">
            {service.service_description}
          </p>
        </div>

        <div className="relative w-full h-[276px] mt-12">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            className="object-cover rounded-[13.5px]"
          />
        </div>
      </Gradientcard>
    </div>
  );

  const renderGrid = () => {
    if (length >= 6) {
      return (
        <div className="lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} data-aos="fade-up" data-aos-delay={200 + idx * 100}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      );
    }

    if (length === 5) {
      return (
        <div className="lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {services.map((service, idx) => {
            const isSecondRow = idx >= 3;
            return (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={200 + idx * 100}
                className={`${isSecondRow ? "col-span-3" : "col-span-2"}`}
              >
                <ServiceCard service={service} isSecondRow={isSecondRow} />
              </div>
            );
          })}
        </div>
      );
    }
    if (length === 4) {
      return (
        <div className="mt-10 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((service, idx) => {
            const isSmallCard = idx === 0 || idx === 2;

            return (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={200 + idx * 100}
                className={isSmallCard ? "col-span-1" : "md:col-span-2"}
              >
                <Gradientcard
                  isHover={true}
                  borderClassName="
                  w-full h-[466px] rounded-[24px] p-[1px]
                  animated hover:scale-[1.02] overflow-hidden
                "
                  className="
                  w-full h-[466px] rounded-3xl
                  bg-[#F7F7F7]! flex flex-col p-4
                  text-(--text-primary)
                "
                >
                  {/* TEXT */}
                  <div className="flex-1">
                    <h2 className="text-[24px] font-semibold">
                      {service.service_title}
                    </h2>
                    <p className="mt-2 text-[16px] leading-[140%]">
                      {service.service_description}
                    </p>
                  </div>

                  {/* IMAGE */}
                  <div className="relative w-full h-[276px] mt-6 overflow-hidden rounded-[13.5px]">
                    <Image
                      src={service.image}
                      alt={service.title || service.service_title}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                </Gradientcard>
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="sectionarea sectionGap">
      <Heading subtitle={paragraph} title={heading_part1} tag={tag} />
      {renderGrid()}
    </div>
  );
};

export default PageServicesection;
