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
      className="max-w-[384px] w-full h-146.5 rounded-3xl  bg-[#F7F7F7]!"
      borderClassName="max-w-[384px] group hover:scale-[102%] animated w-full h-[588px]  rounded-3xl p-[1.5px] "
    >
      <Link
        href={`/blogs/${slug}`}
        className=" lg:p-6 p-3  overflow-hidden block cursor-pointer"
      >
        <div className="max-w-86 max-h-69 w-full h-full overflow-hidden rounded-[13px]">
          <Image
            className="max-w-84 w-full h-69 rounded-[13px]  object-cover"
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
          <h3 className=" md:text-[24px] md:leading-8 text-[22px] font-semibold leading-6.5 mt-2 poppins line-clamp-2">
            {title}
          </h3>
          <p className="text-[14px] md:text-[16px] opensans font-normal mt-2 transform-gpu line-clamp-2">
            {" "}
            {short_description}{" "}
          </p>
          <p className="text-[16px] font-normal opensans max-w-50 bg-[#141B3466] mt-6 md:mt-8 rounded-[36px] py-2 px-3 md:px-4 flex justify-center items-center">
            Video Editing TIps
          </p>
        </div>
      </Link>
    </Gradientcard>
  );
};
export default Blogcard;
