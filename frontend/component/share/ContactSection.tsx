import Image from "next/image";
import React from "react";

const ContactSection = () => {
  return (
    <div className="container sectionGap grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="text-white">
        <div>
          <h2 className="text-[56px] leading-[120%] font-[600]">
            Have a Project ?
          </h2>
          <h2 className="text-[56px] leading-[120%] font-[600]">Let's Talk</h2>
          <p className="text-[16px] font-[400] leading-[140%]">
            See how design meets
          </p>
          <p className="text-[16px] font-[400] leading-[140%]">
            Real results, clean code, and user-first experiences
          </p>
        </div>
        <div className="mt-10 flex gap-4 flex-col">
          <div className="contact-info flex justify-between  items-center rounded-[24px] py-4 px-4">
            <div>
              <h3>Email Us </h3>
              <p>Hello@montagemotion.com</p>
            </div>
            <Image
              src={"/assets/icon/gmail.png"}
              alt="gmail"
              className="w-[56px] h-[56px] bg-white rounded-[12px] p-[10px]"
              width={36}
              height={36}
            />
          </div>
          <div className="contact-info flex justify-between items-center rounded-[24px] py-4 px-4">
            <div>
              <h3>Chat on WhatsApp </h3>
              <p>+8801862938306</p>
            </div>
            <Image
              src={"/assets/icon/whatsapp.png"}
              alt="gmail"
              className="w-[56px] h-[56px] bg-white rounded-[12px] p-[10px]"
              width={36}
              height={36}
            />
          </div>
        </div>
      </div>

      <form className="contact-form max-w-[582px] w-full h-[604px] rounded-[24px] flex flex-col gap-2 justify-center items-center p-6 ">
        <div className="text-white w-full flex flex-col gap-3 h-full">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="max-w-[542px] w-full max-h-[56px] h-full rounded-[16px] p-4 border border-white/20 focus:outline-none"
          />
        </div>
        <div className="text-white w-full flex flex-col gap-3 h-full">
          <label htmlFor="name">Email</label>
          <input
            type="email"
            placeholder="jhon48@gmail.com"
            className="max-w-[542px] w-full max-h-[56px] h-full rounded-[16px] p-4 border border-white/20 focus:outline-none"
          />
        </div>
        <div className="text-white w-full flex flex-col gap-3 h-full">
          <label htmlFor="name">Interested In</label>
          <select className="max-w-[542px] w-full max-h-[56px] h-full rounded-[16px] border border-white/20  p-3 focus:outline-none">
            <option className="text-black" value="talking-head">
              Talking Head Video Editing
            </option>
            <option className="text-black" value="podcast">
              Podcast Video Editing
            </option>
            <option className="text-black" value="shorts">
              Shorts/Reel Video Editing
            </option>
          </select>
        </div>
        <div className="text-white w-full flex flex-col gap-3 h-full">
          <label htmlFor="name">Your Message</label>
          <textarea
            placeholder="I would like to know more about your service"
            className="max-w-[542px] w-full h-[120px]  p-4 rounded-[16px] focus:outline-none border border-white/20"
          />
        </div>
        <button
          type="submit"
          className="btn-color   max-w-[100%] w-full h-[56px] rounded-[16px] py-[16px] px-[16px] font-[500] "
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactSection;
