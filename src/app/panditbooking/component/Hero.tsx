
import Image from "next/image";
import { Bolt, CheckCircle2, IndianRupee } from "lucide-react";

export default function Hero(){
    return <div>
            <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
        {/* Background image */}
        <Image
          src="/pandithero.jpg" // <- put your image in /public or replace with your path
          alt="Pandit performing aarti"
          fill
          priority
          className="object-cover object-center md:object-[70%_center]"
        />

        {/* Dark gradient overlay to make left text readable */}
        <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_10%_30%,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.65)_35%,rgba(0,0,0,0.35)_60%,rgba(0,0,0,0)_85%)]" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 sm:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl/tight font-normal tracking-tight font-lora">
              Book Pandit Ji Online for
              <br />
              all kinds of Pooja
            </h1>

            <p className="mt-6 text-base sm:text-lg text-white/85 leading-7">
              managed independently to serve all. Beyond moksha
              <br className="hidden sm:block" />
              assist and guide you during an already difficult time with
              <br className="hidden sm:block" />
              the aim of supporting you before , during and after.
            </p>

            {/* Feature bullets */}
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <li className="flex items-center gap-2 text-sm sm:text-base">
                <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Verified pandits</span>
              </li>
              <li className="flex items-center gap-2 text-sm sm:text-base">
                <IndianRupee className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Affordable prices</span>
              </li>
              <li className="flex items-center gap-2 text-sm sm:text-base">
                <Bolt className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Same day service</span>
              </li>
            </ul>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="#book"
                className="inline-flex items-center gap-2 rounded-full bg-[#FBFBFB] px-5 py-3 text-[#5D2D05] font-medium shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                Book A Pandit Now →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
}