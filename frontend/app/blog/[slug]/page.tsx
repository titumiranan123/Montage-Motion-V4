import { fetchSingleBlog } from "@/hook/functions/fetchsingleBlog";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

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
  // const data = {
  //   title: "Cut the Fluff: Make Your Videos Shine",
  //   slug: "cut-the-fluff-make-your-videos-shine",
  //   meta: {
  //     description:
  //       "Learn how to make engaging videos by improving pacing, jump cuts, and captions.",
  //     tags: ["video editing", "capcut", "youtube growth", "content creation"],
  //     author: "ICT Bangla Team",
  //     date: "2025-10-11",
  //   },
  //   hero: {
  //     headline: "Cut the Fluff and Keep Viewers Hooked!",
  //     subheadline:
  //       "Discover how to hook viewers within the first 3 seconds and make them stay till the end.",
  //     coverImage: "/images/video-editing-tips.webp",
  //   },
  //   outline: {
  //     title: "In This Article, You'll Learn",
  //     points: [
  //       "How to use jump cuts wisely",
  //       "Why captions increase retention",
  //       "Balancing pacing and pauses effectively",
  //       "How to make your videos shine",
  //     ],
  //   },
  //   sections: [
  //     {
  //       id: "cut-the-fluff",
  //       title: "Cut the Fluff",
  //       content:
  //         "One of the most important aspects of editing is pacing. Long pauses, repeated lines, or unnecessary details can make your audience lose interest.",
  //       tip: "Pro Tip: Review your video with fresh eyes and ask yourself, 'Would I stay if I saw this as a viewer?'",
  //       image: "https://pub-6a9bd81559354e09b0ca799ba12301c8.r2.dev/montagemotion-content.png",
  //     },
  //     {
  //       id: "use-jump-cuts",
  //       title: "Use Jump Cuts Wisely",
  //       content:
  //         "Jump cuts can make your video more dynamic and fast-paced. But overusing them can make it feel unnatural.",
  //       tip: "Pro Tip: Only use jump cuts when they improve flow or humor.",
  //       image:
  //         "https://pub-6a9bd81559354e09b0ca799ba12301c8.r2.dev/montagemotion-content.png",
  //     },
  //     {
  //       id: "add-text-captions",
  //       title: "Add Text & Captions",
  //       content:
  //         "Captions not only make your videos accessible but also help with retention, especially when viewers are watching on mute.",
  //       tip: "Pro Tip: Highlight key phrases with colors that contrast your background.",
  //     },
  //   ],
  //   cta: {
  //     headline: "Let’s Make Your Videos Shine",
  //     subtext: "Get started shaping stories that engage and convert.",
  //     buttonText: "Book a Call",
  //     buttonLink: "/contact",
  //   },
  // };

  const data = await fetchSingleBlog(slug);
  return (
    <div className="max-w-[964px] min-h-screen mx-auto flex flex-col pagelogo  mt-16 lg:mt-30 px-2">
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
        <h3 className="text-white">{data?.title}</h3>
        <div
          className="text-white mt-10"
          dangerouslySetInnerHTML={{ __html: data?.description }}
        ></div>
      </div>
    </div>
  );
};

export default SingleBlog;
