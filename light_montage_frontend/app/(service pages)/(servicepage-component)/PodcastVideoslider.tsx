"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import ReactPlayer from "react-player";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

const VIDEO_DATA = [
  {
    id: 1,
    url: "https://www.youtube.com/watch?v=VAz0GU6B9Yg",
    title: "Video 1",
  },
  {
    id: 2,
    url: "https://www.youtube.com/watch?v=VAz0GU6B9Yg",
    title: "Video 2",
  },
  {
    id: 3,
    url: "https://www.youtube.com/watch?v=VAz0GU6B9Yg",
    title: "Video 3",
  },
  {
    id: 4,
    url: "https://www.youtube.com/watch?v=VAz0GU6B9Yg",
    title: "Video 4",
  },
  {
    id: 5,
    url: "https://www.youtube.com/watch?v=VAz0GU6B9Yg",
    title: "Video 5",
  },
  {
    id: 6,
    url: "https://www.youtube.com/watch?v=VAz0GU6B9Yg",
    title: "Video 6",
  },
];

export default function VideoSwiper() {
  return (
    <div className="video-swiper-container ">
      <Swiper
        // Center the active slide
        centeredSlides={true}
        // Responsive breakpoints
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1.2, // Show partial view of side slides
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 1.5, // Show partial view of side slides
            spaceBetween: 30,
          },
        }}
        // Make center slide larger
        slidesPerView="auto"
        // Scale effect for side slides
        onSlideChange={(swiper) => {
          swiper.slides.forEach((slide) => {
            slide.style.transform = "scale(0.85)";
            slide.style.opacity = "0.6";
            slide.style.transition = "all 0.3s ease";
          });

          if (
            swiper.activeIndex >= 0 &&
            swiper.activeIndex < swiper.slides.length
          ) {
            swiper.slides[swiper.activeIndex].style.transform = "scale(1)";
            swiper.slides[swiper.activeIndex].style.opacity = "1";
          }
        }}
        onSwiper={(swiper) => {
          // Initialize the scaling
          swiper.slides.forEach((slide, index) => {
            slide.style.transform =
              index === swiper.activeIndex ? "scale(1)" : "scale(0.85)";
            slide.style.opacity = index === swiper.activeIndex ? "1" : "0.4";
            slide.style.width =
              index === swiper.activeIndex ? "733px" : "200px";
            slide.style.transition = "all 0.3s ease";
          });
        }}
        // Draggable configuration
        grabCursor={true}
        draggable={true}
        // Autoplay configuration
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        // Speed and interaction
        speed={800}
        loop={true}
        // Disable navigation and pagination
        navigation={false}
        pagination={false}
        // Modules
        modules={[Autoplay]}
        // CSS class
        className="video-swiper"
      >
        <style>{`
          .video-swiper-container {
            width: 100%;
            padding: 40px 0;
            position: relative;
          }
          
          .video-swiper {
            width: 100%;
            height: 100%;
            overflow: visible;
          }
          
          .swiper-slide {
            width: 100%;
            max-width: 733px;
            height: auto;
            transition: all 0.3s ease;
            opacity: 0.6;
            transform: scale(0.85);
          }
          
          .swiper-slide-active {
            opacity: 1;
            transform: scale(1);
            z-index: 10;
          }
          
          .video-slide {
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
            background: #000;
            position: relative;
          }
          
          .swiper-slide-active .video-slide {
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }
          
          .player-wrapper {
            position: relative;
            padding-top: 56.25%; /* 16:9 Aspect Ratio */
            background: #000;
            border-radius: 16px;
            width: 100%;
          }
          
          .react-player {
            position: absolute;
            top: 0;
            left: 0;
            width: 100% !important;
            height: 100% !important;
            border-radius: 16px;
            overflow: hidden;
          }
          
        
          
          /* Customize Swiper grab cursor */
          .swiper-slide {
            cursor: grab;
          }
          
          .swiper-slide:active {
            cursor: grabbing;
          }
          
          /* Add gradient overlay to side slides */
          .swiper-slide:not(.swiper-slide-active) .player-wrapper::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.4);
            border-radius: 16px;
            z-index: 1;
          }
          
          /* Responsive adjustments */
          @media (max-width: 768px) {
            .video-swiper-container {
              padding: 30px 0;
            }
            
            .swiper-slide {
              width: 85%;
            }
            
            .video-slide {
              border-radius: 12px;
            }
            
            .video-title {
              font-size: 16px;
              padding: 20px 15px 10px;
            }
            
            .swiper-slide-active .video-title {
              font-size: 18px;
              padding: 25px 15px 15px;
            }
          }
          
          @media (max-width: 480px) {
            .video-swiper-container {
              padding: 20px 0;
            }
            
            .swiper-slide {
              width: 80%;
            }
            
            .video-title {
              font-size: 14px;
              padding: 15px 10px 8px;
            }
            
            .swiper-slide-active .video-title {
              font-size: 16px;
              padding: 20px 10px 10px;
            }
          }
        `}</style>
        {VIDEO_DATA.map((video) => (
          <SwiperSlide key={video.id} className="video-slide">
            <div className="player-wrapper">
              <ReactPlayer
                src={video.url}
                width="100%"
                height="100%"
                controls={true}
                playing={false}
                light={false}
                className="react-player"
              />
              <div className="video-title">{video.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
