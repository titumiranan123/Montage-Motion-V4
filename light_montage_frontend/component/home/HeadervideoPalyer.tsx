import React from "react";
import ReactPlayer from "react-player";
const HeadervideoPalyer = ({
  thumbnail,
  video_url,
}: {
  thumbnail: string;
  video_url: string;
}) => {
  return (
    <div className="w-7xl h-[720px] mx-auto rounded-[40px] overflow-hidden">
      <ReactPlayer
        light={thumbnail}
        src={video_url}
        playing
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default HeadervideoPalyer;
