"use client";

import {
  ArrowRight,
  ArrowRightCircle,
  ArrowUpRight,
  Bubbles,
  ChevronDown,
  Menu,
  Stars,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LiquidEther from "./../components/LiquidEther";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ChromaGrid from "./../components/ChromaGrid";
import HoverFadeGroup from "./../components/common/hover-fade-group";
import { Card } from "@/components/ui/card";
import CountUp from "../components/common/count-up";
import { ThemeSwitcher } from "../components/common/theme-switcher";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const howItWork = [
    {
      title: "Upload Patient Data",
      subTitle:
        "Start by uploading the 3D files (STL/OBJ) of your patient. Our system automatically detects teeth positions.",
      btnTitle: "Upload Now",
      image: "/images/how1.svg",
    },
    {
      title: " Automatic Tooth Detection",
      subTitle:
        "Our AI analyzes the 3D scan, identifies individual teeth, and prepares movement data for each stage.",
      btnTitle: "See AI in Action",
      image: "/images/how2.svg",
    },
    {
      title: "Visualize the Full Treatment",
      subTitle:
        "Receive a step-by-step orthodontic plan, including detailed movements in all 6 directions for every tooth.",
      btnTitle: "Upload Now",
      image: "/images/how3.svg",
    },
  ];

  const items = [
    {
      image: "/images/team/ME.jfif",
      title: "Mahmoud Khamis",
      subtitle: "Full Stack Developer",
      handle: "@mahmoudkhamis",
      borderColor: "#4F46E5",
      gradient: "linear-gradient(145deg,#4F46E5,#000)",
      url: "https://www.figma.com/file/xxx/mahmoud-khamis",
    },
    {
      image: "/images/team/anwer.jpg",
      title: "Anwer Hosny",
      subtitle: "Machine Learning and AI Engineer",
      handle: "@anwerhosny",
      borderColor: "#10B981",
      gradient: "linear-gradient(210deg,#10B981,#000)",
      url: "https://www.figma.com/file/xxx/anwer-hosny",
    },
    {
      image: "/images/team/eslam.jpg",
      title: "Eslam Ayman",
      subtitle: "Machine Learning and AI Engineer",
      handle: "@eslamayman",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(165deg,#F59E0B,#000)",
      url: "https://www.figma.com/file/xxx/eslam-ayman",
    },
    {
      image: "/images/team/kareem.jpg",
      title: "Kareem Ramzy",
      subtitle: "Machine Learning and AI Engineer",
      handle: "@kareemramzy",
      borderColor: "#EF4444",
      gradient: "linear-gradient(195deg,#EF4444,#000)",
      url: "https://www.figma.com/file/xxx/kareem-ramzy",
    },
    {
      image: "/images/team/mohamed.jpg",
      title: "Mohamed Deshish",
      subtitle: "Machine Learning and AI Engineer",
      handle: "@mohameddeshish",
      borderColor: "#8B5CF6",
      gradient: "linear-gradient(225deg,#8B5CF6,#000)",
      url: "https://www.figma.com/file/xxx/mohamed-deshish",
    },
    {
      image: "/images/team/mohamed2.jpg",
      title: "Mohamed Al Arabi",
      subtitle: "Machine Learning and AI Engineer",
      handle: "@mohamedalarabi",
      borderColor: "#06B6D4",
      gradient: "linear-gradient(135deg,#06B6D4,#000)",
      url: "https://www.figma.com/file/xxx/mohamed-al-arabi",
    },
    {
      image: "/images/team/osama.jpg",
      title: "Osama Gamal",
      subtitle: "Machine Learning and AI Engineer",
      handle: "@osamagamal",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(180deg, #3B82F6, #000)",
      url: "https://www.figma.com/file/xxx/osama-gamal",
    },
    {
      image: "/images/team/omar.jpg",
      title: "Omar Hamdy",
      subtitle: "Web Developer",
      handle: "@omarhamdy",
      borderColor: "#1E293B",
      gradient: "linear-gradient(150deg, #1E293B, #000)",
      url: "https://www.figma.com/file/xxx/omar-hamdy",
    },
  ];

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "how", label: "How it work" },
    { id: "price", label: "Pricing" },
    { id: "team", label: "Our Team" },
  ];

  const pricingTiers = [
    {
      tier: "Basic",
      cases: "50",
      description:
        "For businesses seeking a solid logo with room for refinement and custom branding.",
      features: [
        "Initial consultation",
        "Brasse fitting",
        "Adjustment sessions",
      ],
      isHighlighted: false,
    },
    {
      tier: "STANDARD",
      cases: "100",
      description:
        "For businesses seeking a solid logo with room for refinement and custom branding.",
      features: [
        "Initial consultation",
        "Brasse fitting",
        "Adjustment sessions",
        "Final check-up",
        "Analytics Report",
      ],
      isHighlighted: true,
    },
    {
      tier: "PREMIUM",
      cases: "50",
      description:
        "For businesses seeking a solid logo with room for refinement and custom branding.",
      features: [
        "Initial consultation",
        "Brasse fitting",
        "Adjustment sessions",
      ],
      isHighlighted: false,
    },
  ];

  return (
    <div className="space-y-32 relative">
      {/* Fixed Header */}
      <div
        className={`fixed top-0 left-4 right-4 mx-auto px-4 flex items-center gap-4 justify-between z-50 transition-all duration-500 ${
          scrolled
            ? "m-4 rounded-full max-w-5xl backdrop-blur shadow-sm bg-white/30"
            : "m-0 rounded-none max-w-7xl"
        }`}
      >
        <div className="flex items-center justify-between w-full gap-6">
          <div className="flex items-center gap-4">
            <div className="size-20 relative -m-2">
              <Image
                fill
                src={"/images/logo.svg"}
                alt="logo"
                className="object-contain"
              />
            </div>

            <HoverFadeGroup
              className={"!gap-6 font-semibold"}
              data={navLinks}
              renderItem={({ id, label }, idx) => (
                <button
                  key={idx}
                  href={id}
                  onClick={() => handleScroll(id)}
                  target="_blank"
                  className="transition-colors hover:text-main cursor-pointer hidden lg:block"
                >
                  {label}
                </button>
              )}
            />
          </div>

          <div className="items-center gap-6 hidden lg:flex">
            <Link
              href={"/login"}
              className="text-lg cursor-pointer text-main font-medium"
            >
              Login
            </Link>

            <Link
              href={"/register"}
              className="flex items-center gap-2 text-white bg-gradient-to-r from-main to-[#2A7FBA] px-5 py-2 rounded-full cursor-pointer relative shadow-lg"
            >
              <Stars className="size-5" /> Try For Free
              <div className="absolute inset-0 flex items-center justify-center hover:animate-pulse">
                <Image
                  fill
                  src={"/images/button-stars.svg"}
                  alt="button-stars"
                  className="cover"
                />
              </div>
            </Link>
          </div>
        </div>

        <div className="block lg:hidden">
          <button className="cursor-pointer" onClick={() => setShow(!show)}>
            <Menu className="size-8" />
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div
        className={cn(
          "fixed inset-0 w-full h-full bg-background z-50 flex items-center justify-center transition-transform duration-300 origin-bottom",
          show ? "scale-100" : "scale-0"
        )}
      >
        <HoverFadeGroup
          className={
            "flex flex-col items-center !gap-6 font-semibold scale-150"
          }
          data={navLinks}
          renderItem={({ id, label }, idx) => (
            <button
              key={idx}
              href={id}
              onClick={() => {
                handleScroll(id);
                setShow(false);
              }}
              target="_blank"
              className="transition-colors hover:text-main cursor-pointer text-xl md:text-3xl"
            >
              {label}
            </button>
          )}
        />

        <button
          className="absolute top-5 end-5 md:top-10 md:end-10 cursor-pointer hover:rotate-90 transition-transform"
          onClick={() => setShow(false)}
        >
          <XIcon className="size-8 md:size-10" />
        </button>
      </div>

      <Image
        width={"150"}
        height={"100"}
        src={"/images/Tooth.png"}
        alt="logo"
        className="object-contain absolute -left-12 top-1/5 z-10 rotate-[70deg] hidden lg:block"
      />

      <Image
        width={"150"}
        height={"100"}
        src={"/images/Decore1.svg"}
        alt="logo"
        className="object-contain absolute right-0 top-1/3 z-10 hidden lg:block"
      />

      <Image
        width={"150"}
        height={"100"}
        src={"/images/Decore2.svg"}
        alt="logo"
        className="object-contain absolute left-0 top-1/2 z-10 hidden lg:block"
      />

      {/* Hero */}
      <div
        className="relative inset-0 overflow-hidden h-screen scroll-mt-24"
        id="home"
      >
        {/* Background Live */}
        <LiquidEther
          colors={["#042e82", "#2A7FBA", "#1DFFFF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={1000}
          autoRampDuration={0.6}
        />

        <div className="bg-gradient-to-t from-background absolute h-1/3 pointer-events-none bottom-0 left-0 right-0 z-10">
          <div className="flex items-end justify-center w-full h-full">
            <ChevronDown className="size-12 animate-bounce text-main" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center gap-4 absolute inset-0 pointer-events-none px-4">
          {/* Tooth */}
          <div className="size-1/3 lg:size-1/2  absolute bottom-0 end-0 pointer-events-none">
            <Image
              fill
              src={"/images/Tooth.png"}
              alt="Tooth"
              className="object-contain"
            />
          </div>
          {/* Badge */}
          <div className="border border-[#1DFFFF8C] p-1 px-1 bg-primary/45 rounded-full">
            <div className="flex items-center gap-2 text-white pe-2">
              <div className="px-3 bg-primary/20 rounded-full bg-gradient-to-r from-main to-[#2A7FBA] text-sm lg:text-lg line-clamp-1">
                New feature
              </div>
              <p className="text-sm lg:text-lg line-clamp-1">
                Check out the team dashboard
              </p>
              <ArrowRight className="size-4" />
            </div>
          </div>
          {/* Title */}
          <p className="max-w-3xl text-center bg-clip-text text-transparent text-5xl lg:text-7xl font-bold font-aerospace-outline bg-gradient-to-r from-main to-[#2A7FBA]">
            Get ready for the new era of AI
          </p>
          {/* Sub Title */}
          <p className="text-main font-bold text-lg lg:text-xl text-center">
            Upload, Analyze, and Monitor Your Patients Smiles!
          </p>
          {/* Button */}
          <button className="pointer-events-auto flex items-center gap-2 text-white bg-gradient-to-r from-main to-[#2A7FBA] px-5 py-3 rounded-full cursor-pointer relative shadow-lg">
            <Stars className="size-5" /> Try For Free
            <div className="absolute inset-0 flex items-center justify-center hover:animate-pulse">
              <Image fill src={"/images/button-stars.svg"} alt="button-stars" />
            </div>
          </button>
        </div>
      </div>

      {/* How it work */}
      <div
        className="flex items-center flex-col gap-10 scroll-mt-24 px-4"
        id="how"
      >
        <div className="text-center">
          <p className="text-4xl md:text-5xl font-semibold capitalize mb-2">
            How it work
          </p>
          <p className="text-sm md:text-lg font-medium capitalize text-muted-foreground">
            Our AI handle everything with precision and speed
          </p>
          <p className="text-sm md:text-lg font-medium capitalize text-muted-foreground -mt-1">
            From scan to plan
          </p>
        </div>

        {howItWork.map(({ title, subTitle, btnTitle, image }, i) => (
          <div
            className={cn(
              "flex items-center max-w-5xl md:flex-row flex-col gap-4 md:gap-0",
              i % 2 !== 0 && "md:flex-row-reverse"
            )}
            key={i}
          >
            <div className={cn("w-full flex", i % 2 !== 0 && "md:justify-end")}>
              <div className="md:w-[350px] w-full h-[350px] relative">
                <Image
                  fill
                  src={image}
                  alt="how1"
                  className="object-cover rounded-4xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-2xl font-bold">{title}</p>
              <p className="text-base lg:text-lg font-medium capitalize text-muted-foreground">
                {subTitle}
              </p>
              <Button size={"lg"}>
                {btnTitle}
                <ArrowRight />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div
        className="flex items-center flex-col gap-10 max-w-7xl mx-auto px-4 scroll-mt-24"
        id="price"
      >
        <div className="text-center">
          <p className="text-4xl md:text-5xl font-semibold capitalize mb-2">
            Pricing Plans
          </p>
          <p className="text-lg font-medium capitalize text-muted-foreground">
            For Dental Orthodontics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:-gap-1.5 items-center w-full lg:px-10">
          {pricingTiers.map((tier, index) => (
            <PricingCard
              key={index}
              tier={tier.tier}
              cases={tier.cases}
              description={tier.description}
              features={tier.features}
              isHighlighted={tier.isHighlighted}
            />
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="flex flex-col gap-10 scroll-mt-24" id="team">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <p className="text-4xl lg:text-6xl max-w-3xl font-medium">
            Meet the talented team who make all this happen
          </p>
        </div>

        <div className="relative">
          <ChromaGrid items={items} />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background lg:from-5%" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background lg:from-5%" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="border-t py-20">
      <div className="max-w-7xl mx-auto px-4 space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Link href={"#"} className="flex items-center w-fit">
              <div className="size-20 relative -m-3">
                <Image
                  fill
                  src={"/images/logo.svg"}
                  alt="logo"
                  className="object-contain"
                />
              </div>
              <p className="text-2xl font-semibold">Ortho AI Pro</p>
            </Link>

            <p className="ms-3 text-muted-foreground">
              © {new Date().getFullYear()} Copyright Ortho AI. All rights
              reserved.
            </p>

            <ThemeSwitcher className={"my-4 ms-3"} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
            <div className="flex flex-col gap-3">
              <p className="text-base font-semibold">Service</p>
              <HoverFadeGroup
                className={"flex-col !gap-3 text-muted-foreground"}
                data={[
                  { href: "#", title: "Terms of service" },
                  { href: "#", title: "Privacy policy" },
                  { href: "#", title: "Contact" },
                ]}
                renderItem={({ href, title }, idx) => (
                  <Link
                    key={idx}
                    href={href}
                    target="_blank"
                    className="transition-colors hover:text-primary"
                  >
                    {title}
                  </Link>
                )}
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-base font-semibold">Follow us on</p>
              <HoverFadeGroup
                className={"flex-col !gap-3 text-muted-foreground"}
                data={[
                  { href: "#price", title: "X (formely Twitter)" },
                  { href: "#", title: "Github" },
                  { href: "#", title: "LinkedIn" },
                ]}
                renderItem={({ href, title }, idx) => (
                  <Link
                    key={idx}
                    href={href}
                    // target="_blank"
                    className="transition-colors hover:text-primary flex items-center gap-1 text-nowrap"
                  >
                    {title} <ArrowUpRight className="size-4" />
                  </Link>
                )}
              />
            </div>
          </div>
        </div>

        <p className="text-center mt-20 text-5xl md:text-8xl lg:text-[12rem] xl:text-[13rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800 inset-x-0">
          Ortho AI Pro
        </p>
      </div>
    </footer>
  );
};

const PricingCard = ({
  tier,
  cases,
  description,
  features,
  isHighlighted = false,
}) => {
  const handleCardMove = (e) => {
    const c = e.currentTarget;
    const rect = c.getBoundingClientRect();
    c.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    c.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <Card
      onMouseMove={handleCardMove}
      className={`h-fit rounded-2xl border-2 px-8 transition-all duration-300 overflow-hidden group relative ${
        isHighlighted ? "bg-black !text-white lg:scale-105 z-10" : ""
      }`}
      style={{
        "--spotlight-color": "rgba(255,255,255,0.3)",
      }}
    >
      {/* Header */}
      <div className="space-y-3">
        <div className="size-14 bg-accent rounded-full flex items-center justify-center">
          <Bubbles className="text-primary" />
        </div>
        <Badge
          className={cn(
            "rounded-full uppercase",
            isHighlighted ? "bg-white text-black" : "bg-black text-white"
          )}
        >
          {tier}
        </Badge>
        <div className="flex items-start gap-1 font-semibold">
          <p className="mt-1 text-lg">$</p>
          <p className="text-5xl">
            <CountUp to={cases} />
          </p>
        </div>
        <p
          className={cn(isHighlighted ? "text-white" : "text-muted-foreground")}
        >
          {description}
        </p>
      </div>

      {/* Features */}
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <span className={`flex items-center gap-1`}>
              <ArrowRightCircle
                className={cn(
                  "size-5.5 stroke-2",
                  isHighlighted
                    ? "fill-background text-primary"
                    : "fill-primary text-background"
                )}
              />
              {feature}
            </span>
          </div>
        ))}
      </div>

      <Button
        variant={cn(isHighlighted ? "" : "outline")}
        size="lg"
        className={cn(
          "w-full rounded-full group",
          isHighlighted &&
            "bg-white text-black  hover:bg-white/90 hover:text-black"
        )}
      >
        Get Started{" "}
        <ArrowRight className="group-hover:translate-x-1 transition-all" />
      </Button>

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
    </Card>
  );
};
