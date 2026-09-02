"use client";

import { CategorySelectComponent } from "@/app/utils/CategorySelectComponent";
import { api_url } from "@/hook/Apiurl";
import { isAxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export interface FormDataType {
  name: string;
  email: string;
  interestIn: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormDataType, string>>;

const validateForm = (values: FormDataType): FormErrors => {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 3) errors.name = "Name must be at least 3 characters.";
  else if (name.length > 50) errors.name = "Name must be 50 characters or less.";
  else if (!/^[a-zA-Z\s]+$/.test(name)) {
    errors.name = "Name can contain letters and spaces only.";
  }

  if (!email) errors.email = "Please enter your email.";
  else if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 100) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message) errors.message = "Please enter a message.";
  else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (message.length > 500) {
    errors.message = "Message must be 500 characters or less.";
  } else if (!/^[a-zA-Z0-9\s.,!?/]+$/.test(message)) {
    errors.message = "Message contains unsupported characters.";
  }

  return errors;
};

const getSubmitError = (error: unknown): string => {
  if (isAxiosError(error)) {
    const responseData = error.response?.data as
      | {
          message?: string;
          errorDetails?: Array<{ message?: string }>;
        }
      | undefined;
    const validationMessage = responseData?.errorDetails
      ?.map((detail) => detail.message)
      .filter(Boolean)
      .join(" ");

    return (
      validationMessage ||
      responseData?.message ||
      "Unable to send your message right now. Please try again."
    );
  }

  return error instanceof Error
    ? error.message
    : "Unable to send your message right now. Please try again.";
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    interestIn: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await api_url.post("/api/contacts", {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        interestIn: formData.interestIn.trim() || undefined,
        message: formData.message.trim(),
      });

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", interestIn: "", message: "" });
    } catch (error: unknown) {
      toast.error(getSubmitError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="w-full  flex flex-col gap-4 justify-center items-center md:p-6  p-1 "
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
          id="name"
          type="text"
          required
          minLength={3}
          maxLength={50}
          value={formData.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          placeholder="John Doe"
          className="max-w-[542px] w-full h-14 rounded-2xl md:p-4 p-3 border border-[#B9BEBF] animated hover:scale-[103%] focus:outline-none text-[16px] leading-[100%] font-normal"
        />
        {errors.name && <p id="name-error" className="text-sm text-red-600" role="alert">{errors.name}</p>}
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
          id="email"
          type="email"
          required
          maxLength={100}
          value={formData.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          placeholder="john48@gmail.com"
          className="max-w-[542px] w-full h-14 rounded-2xl md:p-4 p-3 border border-[#B9BEBF] animated hover:scale-[103%] focus:outline-none text-[16px] leading-[100%] font-normal"
        />
        {errors.email && <p id="email-error" className="text-sm text-red-600" role="alert">{errors.email}</p>}
      </div>

      <div className=" text-(--text-primary)  w-full flex flex-col gap-2 ">
        <label
          className="text-[16px] leading-[140%] font-medium  "
          htmlFor="interestIn"
        >
          Interested In
        </label>
        <CategorySelectComponent
          onChange={(interestIn) => {
            setFormData((prev) => ({ ...prev, interestIn }));
            setErrors((prev) => ({ ...prev, interestIn: undefined }));
          }}
          value={formData.interestIn}
        />
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
          id="message"
          required
          minLength={10}
          maxLength={500}
          value={formData.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="I would like to know more about your service"
          className="max-w-[542px] w-full h-[120px] md:p-4 p-3 rounded-2xl border border-[#B9BEBF] animated hover:scale-[103%] focus:outline-none text-[16px] leading-[100%] font-normal"
        />
        {errors.message && <p id="message-error" className="text-sm text-red-600" role="alert">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="btn-color max-w-full w-full h-14 rounded-2xl py-4 px-4 font-medium translate-all duration-300 ease-in-out hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
