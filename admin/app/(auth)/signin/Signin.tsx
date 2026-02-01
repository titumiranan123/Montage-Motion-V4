"use client";
import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginPage = ({ message }: { message: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);

    const res: any = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/",
      Login: true,
    });
    if (res?.ok) {
      toast.success("Login successful!");
      setLoading(false);
      redirect("/");
    } else {
      toast.error("Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1FB5DD]/10 via-black/80 to-black/90 animate-pulse"></div>

        {/* Card with glass morphism effect */}
        <div className="relative  backdrop-blur-xl border border-[#1FB5DD]/20  rounded-xl overflow-hidden p-[1px] bg-gradient-to-r from-[#1FB5DD] to-transparent">
          <div className="bg-black/90 border border-[#1FB5DD]/10 rounded-xl p-8 relative">
            <p className="text-red-500">{message}</p>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1FB5DD]/10 rounded-full mb-6">
                <FiMail className="h-8 w-8 text-[#1FB5DD]" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Welcome back
              </h1>
              <p className="text-gray-400 mt-2">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-white mb-2"
                >
                  Email address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <FiMail className="h-5 w-5 text-[#1FB5DD]/70 group-focus-within:text-[#1FB5DD] transition-colors" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="relative z-0 block w-full pl-12 pr-4 py-4 bg-black/50 border border-[#1FB5DD]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1FB5DD] focus:border-[#1FB5DD]/50 transition-all duration-300 shadow-lg hover:shadow-[#1FB5DD]/20"
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-400 mt-2 flex items-center">
                    <span className="w-4 h-4 bg-red-400/20 rounded-full flex items-center justify-center mr-2">
                      <svg
                        className="w-2 h-2 text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-white mb-2"
                >
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <FiLock className="h-5 w-5 text-[#1FB5DD]/70 group-focus-within:text-[#1FB5DD] transition-colors" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="relative z-0 block w-full pl-12 pr-12 py-4 bg-black/50 border border-[#1FB5DD]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1FB5DD]  focus:border-none transition-all duration-300 shadow-lg hover:shadow-[#1FB5DD]/20"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 hover:text-[#1FB5DD] transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-400 mt-2 flex items-center">
                    <span className="w-4 h-4 bg-red-400/20 rounded-full flex items-center justify-center mr-2">
                      <svg
                        className="w-2 h-2 text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center items-center py-4 px-6 border-0 rounded-xl shadow-lg text-base font-semibold text-black bg-gradient-to-r from-[#1FB5DD] to-[#1FB5DD]/80 hover:from-[#1FB5DD]/90 hover:to-[#1FB5DD] focus:outline-none focus:ring-4 focus:ring-[#1FB5DD]/30 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative flex items-center">
                    {isLoading ? (
                      <>
                        <FiLoader className="animate-spin mr-3 h-5 w-5" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
