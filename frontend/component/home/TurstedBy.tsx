import Image from "next/image";

const TurstedBy = ({ isCenter }: { isCenter?: boolean }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={100}
      className={`flex items-center justify-center ${
        isCenter ? "justify-center " : "justify-center md:justify-start"
      }  w-full  text-(--text-primary)  gap-5  bg-white/20  glassShadow backdrop-blur-lg py-4 px-3 rounded-full md:max-w-75 max-w-65`}
    >
      <div className="flex w-17.5 h-5 items-center  -space-x-1.5">
        <Image
          src={"/assets/hero_client-1.png"}
          alt="image-1"
          className="w-6 h-6"
          width={24}
          height={24}
        />
        <Image
          src={"/assets/hero_client-2.png"}
          alt="image-1"
          className="w-6 h-6"
          width={24}
          height={24}
        />
        <Image
          src={"/assets/hero_client-3.png"}
          alt="image-1"
          className="w-6 h-6"
          width={24}
          height={24}
        />
        <Image
          src={"/assets/hero_client-4.png"}
          alt="image-1"
          className="w-6 h-6"
          width={24}
          height={24}
        />
      </div>
      <p className="poppins text-[12px] font-normal leading-[140%]">
        Trusted by 1000+ clients
      </p>
    </div>
  );
};

export default TurstedBy;
