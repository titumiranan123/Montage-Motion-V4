"use client";

import { api_url } from "@/hook/Apiurl";
import React, { useState } from "react";
import toast from "react-hot-toast";

export interface FormDataType {
  name: string;
  email: string;
  interestedIn: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api_url.post("/api/contacts", formData);
      if (res.status === 201 || res.status === 200) {
        toast.success("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          interestedIn: "talking-head",
          message: "",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Failed to sent message !");
      console.log(error.responsce);
    }
    // Reset form if needed
  };

  return (
    <form
      className="w-full  flex flex-col gap-4 justify-center items-center md:p-6  "
      onSubmit={handleSubmit}
    >
      <div className=" text-(--text-primary)  w-full flex flex-col gap-2 ">
        <label
          className="text-[16px] leading-[140%] font-medium  "
          htmlFor="name"
        >
          Full Name
        </label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="max-w-[542px] w-full h-14 rounded-2xl md:p-4 p-3 border border-[#B9BEBF] animated hover:scale-[103%] focus:outline-none"
        />
      </div>

      <div className=" text-(--text-primary)  w-full flex flex-col gap-2 ">
        <label
          className="text-[16px] leading-[140%] font-medium  "
          htmlFor="email"
        >
          Email
        </label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john48@gmail.com"
          className="max-w-[542px] w-full h-14 rounded-2xl md:p-4 p-3 border border-[#B9BEBF] animated hover:scale-[103%] focus:outline-none"
        />
      </div>

      <div className=" text-(--text-primary)  w-full flex flex-col gap-2 ">
        <label
          className="text-[16px] leading-[140%] font-medium  "
          htmlFor="interestedIn"
        >
          Interested In
        </label>
        <select
          name="interestedIn"
          value={formData.interestedIn}
          onChange={handleChange}
          className="max-w-[542px] w-full h-14 rounded-2xl border border-[#B9BEBF] animated hover:scale-[103%]  p-3  text-(--text-primary)  focus:outline-none backdrop-blur-2xl "
        >
          <option className="  text-(--text-primary) " value="talking-head">
            Talking Head Video Editing
          </option>
          <option className="  text-(--text-primary) " value="podcast">
            Podcast Video Editing
          </option>
          <option className="  text-(--text-primary) " value="shorts">
            Shorts/Reel Video Editing
          </option>
        </select>
      </div>

      <div className=" text-(--text-primary)  w-full flex flex-col gap-2 ">
        <label
          className="text-[16px] leading-[140%] font-medium  "
          htmlFor="message"
        >
          Your Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="I would like to know more about your service"
          className="max-w-[542px] w-full h-[120px] md:p-4 p-3 rounded-2xl border border-[#B9BEBF] animated hover:scale-[103%] focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="btn-color max-w-full w-full h-14 rounded-2xl py-4 px-4 font-medium translate-all duration-300 ease-in-out hover:scale-105"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
