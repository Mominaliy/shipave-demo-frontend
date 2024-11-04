"use client";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
// import { useState, useEffect, useCallback } from "react";

import one from "../../../public/images/1.jpg";
import two from "../../../public/images/2.jpg";
import three from "../../../public/images/3.jpg";
import four from "../../../public/images/4.jpg";
import five from "../../../public/images/5.jpg";
import six from "../../../public/images/6.jpg";
import Autoplay from "embla-carousel-autoplay";

// const useCarouselProgress = (api: any) => {
//     const [progress, setProgress] = useState(0);

//     const onScroll = useCallback(() => {
//         if (!api) return;
//         const progress = Math.max(0, Math.min(1, api.scrollProgress()));
//         setProgress(progress * 100);
//     }, [api]);

//     useEffect(() => {
//         if (!api) return;
//         onScroll();
//         api.on("scroll", onScroll);
//         return () => api.off("scroll", onScroll);
//     }, [api, onScroll]);

//     return progress;
// };

export default function Banner() {
  // const [api, setApi] = useState<any>();
  // const progress = useCarouselProgress(api);

  const images = [one, two, three, four, five, six];

  return (
    <div className="w-full pl-0 md:pl-0 py-12 bg-red-800">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        // setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          dragFree: false,
        }}
        className="w-full mt-4 cursor-grab active:cursor-grabbing pointer-events-none"
      >
        <CarouselContent className="-ml-1 md:-ml-4">
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-[35%] md:basis-[22%] lg:basis-[23%]"
            >
              <Card
                className={`overflow-hidden border border-transparent bg-transparent shadow-none transition-transform duration-300 ease-in-out my-10 ${index % 2 === 0 ? "translate-y-5" : "-translate-y-5"}`}
                // className={`overflow-hidden border-none transition-transform duration-300 ease-in-out my-10 ${index % 2 === 0 ? "translate-y-5" : "-translate-y-5"}`}
              >
                <div className="aspect-[3/4] relative border-none">
                  <Image
                    src={image}
                    alt={`Concert photo ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index < 5}
                  />
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* <div className="w-full bg-secondary h-1 mt-8 rounded-full overflow-hidden">
                    <div
                        className="bg-primary h-full transition-all duration-300 ease-in-out"
                        style={{ width: `${progress}%` }}
                    />
            </div> */}
    </div>
  );
}
