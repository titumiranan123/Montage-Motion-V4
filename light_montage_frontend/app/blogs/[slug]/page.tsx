import Gradientcard from "@/component/share/Gradientcard";
import { fetchSingleBlog } from "@/hook/functions/fetchsingleBlog";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import ShareButtons from "./ShareButtons";
import BlogHeader from "./BlogHeader";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchSingleBlog(slug);

  const title = blog?.title || "Blog Title";
  const description =
    blog?.short_description || "Read the latest blog on MontageMotion.";
  const image = blog?.image; // fallback image
  const url = `https://montagemotion.com/blog/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "MontageMotion",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SingleBlog = async ({ params }: { params: any }) => {
  const { slug } = await params;
  const whatWill = {
    article_topics: [
      "How to cut fluff and keep your video tight and engaging",
      "The smart way to use jump cuts without overwhelming viewers",
      "Why captions and on-screen text boost watch time and accessibility",
      "Simple audio tricks to balance music, voice, and effects",
      "How color grading adds mood and polish to your video",
      "The importance of consistent branding across all your content",
      "Best export practices for YouTube, Instagram, TikTok, and more",
    ],
  };
  const data = await fetchSingleBlog(slug);
  return (
    <div className=" max-w-[1200px] mx-auto  flex flex-col   mt-36 lg:mt-40 px-2">
      <div className="w-full">
        <h3 className="text-(--text-primary) lg:text-[56px] md:text-[48px] text-[30px] md:leading-16 leading-[46px] poppins font-medium">
          {data?.title}
        </h3>
        <BlogHeader />
      </div>
      <div className="flex justify-between lg:flex-row flex-col gap-16 lg:mt-16 mt-10">
        <div className="lg:max-w-[89px] lg:max-h-[210px] max-h-[87px] max-w-[280px] w-full">
          <Gradientcard
            className="lg:max-w-[87px] lg:max-h-52 max-h-[85px] max-w-[278px] w-full h-full py-6 px-5 rounded-3xl"
            borderClassName="lg:max-w-[89px] lg:max-h-[210px] max-h-[87px] max-w-[280px] w-full h-full rounded-[24px] p-[2px]"
          >
            <ShareButtons
              data={{
                title: data?.title,
                url: `https://montagemotion.com/blogs/${slug}`, // current page url,
                description: data?.description,
              }}
            />
          </Gradientcard>
        </div>
        <div className="">
          <Image
            src={data?.image}
            alt={data?.title}
            width={900}
            height={500}
            priority
          />

          <div className="mt-5 max-w-[764px]  mx-auto ">
            <div
              className="text-(--text-primary) mt-10"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></div>
          </div>
          <div className="flex justify-center items-center  mt-10">
            <Gradientcard
              isHover={false}
              borderClassName="max-w-[666px] h-[290px] p-[1.2px] rounded-3xl  "
              className="max-w-[666px] h-[290px] rounded-3xl relative"
            >
              <div className="flex flex-col gap-4 p-6 justify-center items-center">
                <h2 className="text-[36px] leading-10 font-semibold">
                  Let’s Make Your Videos Shine
                </h2>
                <p className="text-[16px] leading-5.5 font-medium">
                  Get scroll-stopping edits that engage and convert.
                </p>
                <button className="py-2 px-3 rounded-lg btn-color">
                  Book a Call
                </button>
              </div>
              <Image
                src={"/assets/icon/blogline.png"}
                width={666}
                height={230}
                alt=""
                className="absolute bottom-0"
              />
            </Gradientcard>
          </div>
        </div>
        {/* what you will learn  */}

        <Gradientcard
          className="max-w-[319px] w-full max-h-[580px] h-full rounded-3xl p-6 flex justify-center items-center flex-col gap-2 bgperfect"
          borderClassName="max-w-[319px] w-full max-h-[580px] h-full rounded-[24px] p-[2px] lg:block hidden"
        >
          <h2 className="text-[24px] leading-[30px] poppins font-medium text-(--text-primary)">
            In This Article, You’ll Learn
          </h2>

          <div className="flex flex-wrap gap-3">
            {whatWill.article_topics?.map((article, idx) => (
              <div
                key={idx}
                className="border border-transparent hover:border-[#3357A3] max-w-[299px] w-full max-h-[57px] h-full rounded-[12px] py-2 px-4  hover:scale-[102%] animated overflow-hidden"
              >
                <p className=" text-[#49565A] text-[14px] poppins text-left">
                  {article}
                </p>
              </div>
            ))}
          </div>
        </Gradientcard>
      </div>
    </div>
  );
};

export default SingleBlog;
