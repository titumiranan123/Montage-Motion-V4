import Image from "next/image";
import Link from "next/link";
import Gradientcard from "@/component/share/Gradientcard";

const Blogcard = ({
  image,
  title,
  short_description,
  slug,
}: {
  image: string;
  title: string;
  short_description: string;
  slug: string;
}) => {
  return (
    <Gradientcard
      isHover={true}
      className="max-w-[384px] w-full max-h-[616px] h-full rounded-[17.45px]"
      borderClassName="max-w-[384px] w-full max-h-[616px] h-full rounded-[17.45px] p-[1px]"
    >
      <Link
        href={`/blogs/${slug}`}
        className=" p-4  overflow-hidden block cursor-pointer"
      >
        <div className="max-w-[344px] max-h-[276px] w-full h-full overflow-hidden">
          <Image
            className="max-w-[344px] max-h-[276px] w-full h-full object-cover"
            src={image}
            alt={title}
            width={344}
            height={276}
            priority
          />
        </div>

        <div className="mt-8 text-(--text-primary)">
          <div className="flex justify-between items-center">
            <p className="text-[12px] font-normal opensans">5 Minutes Read</p>
            <p className="text-[12px] font-normal opensans">
              September 25, 2025
            </p>
          </div>
          <h3 className=" md:text-[18px] text-[22px] font-semibold leading-[26px] mt-2 poppins">
            {title.slice(0, 60)} {title.length > 60 ? ". . . . ." : ""}
          </h3>
          <p className="text-[14px] md:text-[16px] opensans font-normal mt-2">
            {" "}
            {short_description.slice(0, 120)}{" "}
            {short_description.length > 120 ? ". . . . ." : ""}
          </p>
          <p className="text-[16px] font-normal opensans max-w-[200px] bg-[#141B34] mt-6 md:mt-8 rounded-[36px] py-2 px-3 md:px-4 flex justify-center items-center">
            Video Editing TIps
          </p>
        </div>
      </Link>
    </Gradientcard>
  );
};
export default Blogcard;
