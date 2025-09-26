// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import mySwiper from "./styles.module.css";
// import { Pagination, Autoplay, Navigation } from "swiper/modules";
// import TestimonialCard from "../../utilities/Card/TestimonialCard";
// // import grau from "../../assets/testimonial/gaurav.png";
// // import anita from "../../assets/testimonial/anita.png";
// // import pawet from "../../assets/testimonial/pawet.png";
// // import butch from "../../assets/testimonial/butch.png";
// import useTestimonial from "../../Admin/Customhook/useTestimonial";
// const Testimonila = () => {
//   const { data: testimonial } = useTestimonial();

//   return (
//     <div className="md:mt-[140px] md:ms-[100px] lg:ms-0 -ms-6 relative mt-[78px] text-[#E4E8F7] ">
//       <div className=" mb-[86px]">
//         <div className="lg:h-[110px] flex justify-center items-center relative md:h-[220px] h-[100px]">
//           <div className="serviceBg lg:w-[90%] w-[90%] md:h-[180px] h-[200px] absolute md:top-[20%] top-[38%] left-[0%] z-10 translate-x-[5%] translate-y-[-55%] blur-[95px]"></div>
//           <div className="flex gap-4 z-20 md:-mt-20 lg:ms-0 md:-ms-24 ms-4 items-center flex-col lg:flex-row lg:gap-28">
//             <div className="lg:w-[388px] z-20  ">
//               <p className="font-bold boldText uppercase  md:text-[48px] text-[24px] md:leading-[56px] tracking-[0.8px] text-white lg:text-left text-center">
//                 WHAT ARE <br /> THEY SAYING ?
//               </p>
//             </div>
//             <div className="lg:w-[770px]  z-20   ">
//               <p className="md:p md:text-[20px] text-center lg:text-left openSans text-[12px] md:px-0 px-4">
//                 It has been proven that thousands of users are satisfied with
//                 the features we provide, here are some words from them
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="lg:ms-0 md:-ms-24 -mt-6 ms-7">
//         <Swiper
//           spaceBetween={10}
//           pagination={{
//             clickable: true,
//           }}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           navigation={true}
//           modules={[Pagination, Autoplay, Navigation]}
//           className={mySwiper.mySwiper}
//           breakpoints={{
//             640: {
//               slidesPerView: 1, // 1 slide for mobile devices
//             },
//             768: {
//               slidesPerView: 1, // 2 slides for tablets and larger devices
//             },
//             1024: {
//               slidesPerView: 1, // 2 slides for desktops and larger devices
//             },
//           }}
//         >
//           {testimonial?.map((p) => (
//             <SwiperSlide key={p._id}>
//               <TestimonialCard testimonial={p} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//       <div className="lg:w-[380px] lg:h-[380px] md:h-[220px] md:w-[200px] w-[180px] h-[180px] absolute lg:top-48 lg:left-[0%] md:top-64 top-44 left-0 z-0  serviceBg blur-[40px] md:blur-[85px] rounded-full"></div>
//     </div>
//   );
// };

// export default Testimonila;

// // const testimonialData = [
// //   {
// //     id: 1,
// //     img: grau,
// //     name: "Gaurav Valani",
// //     title: "Founder at CareerSprout",
// //     description:
// //       "I cannot say enough about Samiul's professionalism, timeliness, and his desire/interest in going above and beyond for his clients. newline  I have worked with many editors in the past and not always had the best experience. From the first call that I had with Samiul, it was all positive and it hasn't been any other way since then. newline If you're in need than his own, I'd recommend working with Samiul. newline I expect us to be working with him for a very long time!",
// //   },
// //   {
// //     id: 2,
// //     img: anita,
// //     name: "Anita Sharifi",
// //     title: "Co-Founder at DONO",
// //     description:
// //       "I wholeheartedly endorse Samiul Arafat for extraordinary video editing skills. His blend of creativity, technical fitness, and commitment to delivering high-quality work is truly impressive. newline For top-notch video editing, Samiul is highly recommended! Feel free to connect for more details.",
// //   },
// //   {
// //     id: 3,
// //     img: butch,
// //     name: "Butch Zemar",
// //     title: "Podcast Host at The Zemar Podcast",
// //     description:
// //       "Samiul produces great video content for businesses. Turnaround time is quick and very responsive to any corrections/adds that may be needed. If you are looking for quality videos for your business content marketing, Samiul does great work.",
// //   },
// //   {
// //     id: 4,
// //     img: pawet,
// //     name: "Pawet Huryn",
// //     title: "Author, Product Coach",
// //     description:
// //       "Samiul went above and beyond in elevating the quality of my video podcast. Not only did he expertly edit the footage, but he also incorporated an engaging intro, outro, dynamic animations, and eye-catching graphics. To top it off, he fine-tuned the audio to perfection.newline His work exceeded my expectations, transforming my raw footage into a polished, professional product. I can confidently recommend Samiul as an exceptionally skilled, responsive, and dependable collaborator. newline I highly recommend him for any video editing needs",
// //   },
// // ];
