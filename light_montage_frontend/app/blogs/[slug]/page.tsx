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
    <div className=" container  flex flex-col   mt-16 lg:mt-30 px-2">
      <div className="w-full">
        <h3 className="text-white lg:text-[56px] md:text-[48px] text-[30px] md:leading-[64px] leading-[46px] poppins font-[500]">
          {data?.title}
        </h3>
        <BlogHeader />
      </div>
      <div className="flex justify-between lg:flex-row flex-col gap-16 lg:mt-16 mt-10">
        <div className="lg:max-w-[89px] lg:max-h-[210px] max-h-[87px] max-w-[280px] w-full">
          <Gradientcard
            className="lg:max-w-[87px] lg:max-h-[208px] max-h-[85px] max-w-[278px] w-full h-full py-6 px-5 rounded-[24px]"
            borderClassName="lg:max-w-[89px] lg:max-h-[210px] max-h-[87px] max-w-[280px] w-full h-full rounded-[24px] p-[1px]"
          >
            <ShareButtons
              data={{
                title: data?.title,
                url: `https://montagemotion.com/blog/${slug}`, // current page url,
                description: data?.description,
              }}
            />
          </Gradientcard>
        </div>
        <div className="">
          <div>
            <Image
              src={data?.image}
              alt={data?.title}
              width={900}
              height={500}
              priority
            />
          </div>
          <div className="mt-5 max-w-[764px]  mx-auto ">
            <div
              className="text-white mt-10"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></div>
          </div>
        </div>
        {/* what you will learn  */}

        <Gradientcard
          className="max-w-[319px] w-full max-h-[580px] h-full rounded-[24px] py-5 px-4 flex justify-center items-center flex-col gap-2 bgperfect"
          borderClassName="max-w-[319px] w-full max-h-[580px] h-full rounded-[24px] p-[1px]"
        >
          <h2 className="text-[24px] poppins font-[500] text-white">
            In This Article, You’ll Learn
          </h2>
          <style>
            {`
    
    .willCard {

      border-radius: 8px;
      transition: all 0.3s ease-in-out;
    }

    .willCard:hover {
      background: linear-gradient(
        258.1deg,
        rgba(51, 87, 163, 0.6) 17.41%,
        #3357A3 50%,
        rgba(51, 87, 163, 0.6) 82.59%
      );
      transform: translateY(-2px);
      box-shadow: 0 0 10px rgba(51, 87, 163, 0.4);
    }
  `}
          </style>

          <div className="flex flex-wrap gap-3">
            {whatWill.article_topics?.map((article, idx) => (
              <div
                key={idx}
                className="willCard max-w-[299px] w-full max-h-[59px] h-full p-[1px] flex justify-center items-center"
              >
                <div className="hover:bg-black max-w-[299px] w-full max-h-[59px] h-full rounded-[8px] py-2 px-4   overflow-hidden">
                  <p className="text-white text-[14px] poppins text-center">
                    {article}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Gradientcard>
      </div>
    </div>
  );
};

export default SingleBlog;
