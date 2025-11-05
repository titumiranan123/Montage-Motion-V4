"use client";

import React, { useState } from "react";

export interface FormDataType {
  fullName: string;
  email: string;
  interestedIn: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    email: "",
    interestedIn: "talking-head",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset form if needed
    setFormData({
      fullName: "",
      email: "",
      interestedIn: "talking-head",
      message: "",
    });
  };

  return (
    <form
      className="w-full flex flex-col gap-4 justify-center items-center md:p-6 p-4 "
      onSubmit={handleSubmit}
    >
      <div className="text-white w-full flex flex-col gap-2 translate-all duration-300 ease-in-out hover:scale-[103%]">
        <label htmlFor="fullName">Full Name</label>
        <input
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          className="max-w-[542px] w-full h-[56px] rounded-[16px] md:p-4 p-3 border border-white/20 focus:outline-none"
        />
      </div>

      <div className="text-white w-full flex flex-col gap-2 translate-all duration-300 ease-in-out hover:scale-[103%]">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john48@gmail.com"
          className="max-w-[542px] w-full h-[56px] rounded-[16px] md:p-4 p-3 border border-white/20 focus:outline-none"
        />
      </div>

      <div className="text-white w-full flex flex-col gap-2 translate-all duration-300 ease-in-out hover:scale-[103%]">
        <label htmlFor="interestedIn">Interested In</label>
        <select
          name="interestedIn"
          value={formData.interestedIn}
          onChange={handleChange}
          className="max-w-[542px] w-full h-[56px] rounded-[16px] border border-white/20  p-3 text-white focus:outline-none"
        >
          <option className="bg-[#1E497A] text-white" value="talking-head">
            Talking Head Video Editing
          </option>
          <option className="bg-[#1E497A] text-white" value="podcast">
            Podcast Video Editing
          </option>
          <option className="bg-[#1E497A] text-white" value="shorts">
            Shorts/Reel Video Editing
          </option>
        </select>
      </div>

      <div className="text-white w-full flex flex-col gap-2 translate-all duration-300 ease-in-out hover:scale-[103%]">
        <label htmlFor="message">Your Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="I would like to know more about your service"
          className="max-w-[542px] w-full h-[120px] md:p-4 p-3 rounded-[16px] border border-white/20 focus:outline-none"
        />
      </div>

      <button
        style={{
          boxShadow: "0px 0px 12px 0px #FFFFFF99 inset",
        }}
        type="submit"
        className="bg-[#2B6AB2] max-w-[100%] w-full h-[56px] rounded-[16px] py-4 px-4 font-[500] translate-all duration-300 ease-in-out hover:scale-105"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
