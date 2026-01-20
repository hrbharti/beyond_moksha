"use client";
import Image from "next/image";
import { Button } from "./Button";
import { Input } from "./Input";

export default function GetInTouch() {
  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-16 text-black flex flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-3 text-center max-w-3xl mx-auto">
        <div className="text-3xl sm:text-4xl bg-gradient-to-t from-[#1F3A52] to-[#4682B8] bg-clip-text text-transparent">
          Get in touch with us
        </div>
        <div className="mt-4 text-sm sm:text-base">
          We are here to help you through this difficult time. Reach out to us anytime
        </div>
      </div>

      <div className="w-full max-w-6xl mt-8">
        <div className="text-xl px-2 pb-4">Send us an Email</div>

        <div className="w-full border border-[#1F3A52] rounded-md bg-white">
          {/* layout: stack on small screens, two columns on md+ */}
          <div className="flex flex-col md:flex-row items-stretch p-6 md:p-10 gap-6">
            {/* LEFT: form (takes full width on mobile, 2/3 on md+) */}
            <div className="w-full md:w-2/3 flex flex-col gap-4">
              {/* Row 1 */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-2/5">
                  <Input type="text" title="Name" required={true} />
                </div>
                <div className="w-full sm:w-3/5">
                  <Input type="text" title="Email Address" required={true} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-2/5">
                  <Input type="number" title="Phone" required={false} />
                </div>
                <div className="w-full sm:w-3/5">
                  <Input type="text" title="Services" required={true} />
                </div>
              </div>

              {/* Message */}
              <div>
                <Input type="textarea" title="Messages" required={true} />
              </div>

              {/* Button */}
              <div className="pt-2">
                <Button
                  variantType="primary"
                  size="lg"
                  text="Send Message"
                  onClick={() => console.log("message clicked")}
                />
              </div>
            </div>

            {/* RIGHT: image + description (full width on mobile, 1/3 on md+) */}
            <div className="w-full md:w-1/3 flex flex-col items-center justify-between gap-4">
              <div className="w-full flex items-center justify-center bg-white">
                <Image
                  src="/getInTouch.png"
                  alt="message us"
                  width={200}
                  height={200}
                  className="object-contain"
                  priority
                />
              </div>

              <div className="text-center text-sm px-2">
                Effortlessly reach out to us using our contact form. We are committed to
                responding within minutes, ensuring your queries are addressed swiftly and
                efficiently.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
