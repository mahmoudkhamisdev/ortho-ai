"use client";

import type React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export interface ChromaCarouselProps {
  items?: ChromaItem[];
  className?: string;
}

type SetterFn = (v: number | string) => void;

const ChromaCarousel: React.FC<ChromaCarouselProps> = ({
  items,
}) => {
  const demo: ChromaItem[] = [
    {
      image: "https://i.pravatar.cc/300?img=8",
      title: "Alex Rivera",
      subtitle: "Full Stack Developer",
      handle: "@alexrivera",
      borderColor: "#4F46E5",
      gradient: "linear-gradient(145deg,#4F46E5,#000)",
      url: "https://github.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=11",
      title: "Jordan Chen",
      subtitle: "DevOps Engineer",
      handle: "@jordanchen",
      borderColor: "#10B981",
      gradient: "linear-gradient(210deg,#10B981,#000)",
      url: "https://linkedin.com/in/",
    },
    {
      image: "https://i.pravatar.cc/300?img=3",
      title: "Morgan Blake",
      subtitle: "UI/UX Designer",
      handle: "@morganblake",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(165deg,#F59E0B,#000)",
      url: "https://dribbble.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=16",
      title: "Casey Park",
      subtitle: "Data Scientist",
      handle: "@caseypark",
      borderColor: "#EF4444",
      gradient: "linear-gradient(195deg,#EF4444,#000)",
      url: "https://kaggle.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=25",
      title: "Sam Kim",
      subtitle: "Mobile Developer",
      handle: "@thesamkim",
      borderColor: "#8B5CF6",
      gradient: "linear-gradient(225deg,#8B5CF6,#000)",
      url: "https://github.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=60",
      title: "Tyler Rodriguez",
      subtitle: "Cloud Architect",
      handle: "@tylerrod",
      borderColor: "#06B6D4",
      gradient: "linear-gradient(135deg,#06B6D4,#000)",
      url: "https://aws.amazon.com/",
    },
  ];

  const data = items?.length ? items : demo;

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = (e) => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    c.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <Carousel
      className="w-full"
      opts={{
        skipSnaps: true,
        align: "center",
        loop: true,
      }}
      plugins={[Autoplay({ stopOnInteraction: false })]}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {data.map((c, i) => (
          <CarouselItem
            key={i}
            className="pl-2 md:pl-4 basis-[300] md:basis-1/2 lg:basis-1/4"
          >
            <article
              onMouseMove={handleCardMove}
              onClick={() => handleCardClick(c.url)}
              className="group relative flex flex-col w-full h-[400px] rounded-[20px] p-3 overflow-hidden transition-all duration-300 cursor-pointer grayscale hover:grayscale-0 bstartness-50 hover:bstartness-100"
              style={
                {
                  "--card-border": c.borderColor || "transparent",
                  background: c.gradient,
                  "--spotlight-color": "rgba(255,255,255,0.3)",
                } as React.CSSProperties
              }
            >
              {/* Overlay effect on hover */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20 opacity-0 group-hover:opacity-100"
                style={{
                  background: "rgba(0,0,0,0.1)",
                }}
              />
              {/* Spotlight effect on hover */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
                }}
              />
              {/* Image section */}
              <div className="relative z-10 flex-1 p-[10px] box-border">
                <Image
                  src={c.image || "/placeholder.svg"}
                  alt={c.title}
                  fill
                  className="w-full h-full object-cover rounded-[10px] object-top"
                />
              </div>
              {/* Footer with text */}
              <footer className="relative z-10 p-3 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
                <h3 className="m-0 text-[1.05rem] font-semibold">{c.title}</h3>
                {c.handle && (
                  <span className="text-[0.95rem] opacity-80 text-start">
                    {c.handle}
                  </span>
                )}
                <p className="m-0 text-[0.85rem] opacity-85 col-span-2">{c.subtitle}</p>
                {c.location && (
                  <span className="text-[0.85rem] opacity-85 text-start">
                    {c.location}
                  </span>
                )}
              </footer>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" /> */}
    </Carousel>
  );
};

export default ChromaCarousel;


