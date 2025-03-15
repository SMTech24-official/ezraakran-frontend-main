import Image from "next/image";
import { Button } from "@/components/ui/button";
import conferenceBanner from "@/assets/conference Banner/banner.jpg";

export default function Lottery() {
  return (
    <div className="container my-8">
      {" "}
      <section className="w-4/5 sm:w-full  border rounded-3xl mx-auto px-4 md:px-12 lg:px-16 py-4 md:py-16 lg:py-20">
        <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="flex-1 space-y-2 px-2">
            <div className="text-red text-base sm:text-2xl font-bold">
              Feb 27 – Mar 2, 2023
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Join our next
              Lotcom
            </h1>
          
            <Button className="hover:bg-red bg-darkBlue duration-300  transition-all font-bold text-white px-6 py-4  rounded-md">
              Buy a Ticket
            </Button>
          </div>

          {/* Right Column with Image */}
          <div className="flex-1 w-full">
            <div className="relative aspect-[4/3] w-full max-w-md sm:max-w-lg md:max-w-full">
              <Image
                src={conferenceBanner}
                alt="Conference presentation on laptop"
                fill
                className="object-cover rounded-3xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
