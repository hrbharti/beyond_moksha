"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "@/lib/api/api";
import { Button } from "./Button";
import { Input } from "./Input";

interface Inputs {
  name: string;
  email: string;
  phone: string;
  services: string;
  message: string;
}

export default function GetInTouch() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      await api.post("/contact", data);
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-16 text-black flex flex-col items-center">
      <div className="text-3xl sm:text-4xl bg-gradient-to-t from-[#1F3A52] to-[#4682B8] bg-clip-text text-transparent">
        Get in touch with us
      </div>
      <div className="mt-4 text-sm sm:text-base">
        We are here to help you through this difficult time. Reach out to us
        anytime
      </div>

      <div className="w-full max-w-6xl mt-5">
        <div className="w-full border border-[#1F3A52] rounded-md bg-white">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row items-stretch p-6 md:p-10 gap-6"
          >
            <div className="w-full md:w-2/3 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-2/5">
                  <Input
                    type="text"
                    title="Name"
                    required={true}
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="w-full sm:w-3/5">
                  <Input
                    type="email"
                    title="Email Address"
                    required={true}
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-2/5">
                  <Input
                    type="text"
                    title="Phone"
                    required={true}
                    {...register("phone", { required: true })}
                  />
                </div>
                <div className="w-full sm:w-3/5">
                  <Input
                    type="text"
                    title="Services"
                    required={true}
                    {...register("services", { required: true })}
                  />
                  {errors.services && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div>
                <Input
                  type="textarea"
                  title="Messages"
                  required={true}
                  {...register("message", { required: true })}
                />
                {errors.message && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
              <div className="pt-2">
                <Button
                  variantType="primary"
                  size="lg"
                  text={loading ? "Sending..." : "Send Message"}
                  onClick={() => handleSubmit(onSubmit)()}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="w-full md:w-1/3 flex flex-col items-center justify-between gap-4">
              <div className="w-full flex items-center justify-center bg-white">
                <Image
                  src="/images/getInTouch.png"
                  alt="message us"
                  width={200}
                  height={200}
                  className="object-contain"
                  priority
                />
              </div>

              <div className="text-center text-sm px-2">
                Effortlessly reach out to us using our contact form. We are
                committed to responding within minutes, ensuring your queries
                are addressed swiftly and efficiently.
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
