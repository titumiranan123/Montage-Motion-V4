import Image from "next/image";
import Link from "next/link";
import Gradientcard from "@/component/share/Gradientcard";

const Blogcard = ({
  image,
  title,
  short_description,
  slug,
  createdAt,
}: {
  image: string;
  title: string;
  short_description: string;
  slug: string;
  createdAt: string;
}) => {
  return (
    <Gradientcard
      isHover={true}
      className="max-w-[384px] w-full h-[586px] rounded-3xl"
      borderClassName="max-w-[384px] group hover:scale-[102%] animated w-full h-[588px]  rounded-3xl p-[1.5px]"
    >
      <Link
        href={`/blogs/${slug}`}
        className=" p-6  overflow-hidden block cursor-pointer"
      >
        <div className="max-w-[344px] max-h-[276px] w-full h-full overflow-hidden rounded-[13px]">
          <Image
            className="max-w-[336px] w-full h-[276px] rounded-[13px]  object-cover"
            src={image}
            alt={title}
            width={336}
            height={276}
            priority
          />
        </div>

        <div className="mt-8 text-(--text-primary)">
          <div className="flex justify-between items-center">
            <p className="text-[12px] font-normal opensans">5 Minutes Read</p>
            <p className="text-[12px] font-normal opensans">
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <h3 className=" md:text-[24px] md:leading-8 text-[22px] font-semibold leading-[26px] mt-2 poppins">
            {title.slice(0, 60)} {title.length > 60 ? ". . . . ." : ""}
          </h3>
          <p className="text-[14px] md:text-[16px] opensans font-normal mt-2 transform-gpu">
            {" "}
            {short_description}{" "}
          </p>
          <p className="text-[16px] font-normal opensans max-w-[200px] bg-[#141B3466] mt-6 md:mt-8 rounded-[36px] py-2 px-3 md:px-4 flex justify-center items-center">
            Video Editing TIps
          </p>
        </div>
      </Link>
    </Gradientcard>
  );
};
export default Blogcard;
