"use client";
import Image from "next/image";
import { FacebookShareButton, LinkedinShareButton } from "next-share";
const ShareButtons = ({
  data,
}: {
  data: { title: string; url: string; description: string };
}) => {
  const handleshare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data?.title,
          text: data?.description,
          url: data?.url,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="flex flex-row lg:flex-col items-center lg:items-start justify-center gap-4 lg:gap-3 ">
      <p className="text-(--text-primary)  poppins text-[16px] lg:-mt-2 font-medium text-center">
        Share
      </p>
      <FacebookShareButton
        url={data?.url}
        quote={data?.title}
        hashtag={"#montagemotion"}
      >
        <Image src={"/assets/icon/fb.png"} alt="fb" width={24} height={24} />
      </FacebookShareButton>

      <Image
        onClick={handleshare}
        src={"/assets/icon/insta.png"}
        alt="fb"
        width={24}
        height={24}
      />
      <LinkedinShareButton url={data?.url}>
        <Image src={"/assets/icon/link.png"} alt="fb" width={24} height={24} />
      </LinkedinShareButton>
      <Image
        onClick={handleshare}
        src={"/assets/icon/yt.png"}
        alt="fb"
        width={24}
        height={24}
      />
    </div>
  );
};

export default ShareButtons;
