"use client";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { landingPageContent } from "@/lib/constants/hero.constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const placeholder =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  const src = !mounted
    ? placeholder
    : resolvedTheme === "light"
      ? "/smooth-mac-light.png"
      : "/smooth-mac-dark.png";
  return (
    <>
      <section className="container w-full">
        <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
          <div className="text-center space-y-8">
            <Badge variant="outline" className="text-sm py-2 rounded-lg">
              <span> {landingPageContent.heroSection.trialText} </span>
            </Badge>

            <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
              <h1>{landingPageContent.heroSection.title}</h1>
            </div>

            <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
              {landingPageContent.heroSection.subtitle}
            </p>

            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({
                    className: "w-5/6 md:w-1/4 font-bold group/arrow",
                  })
                )}
              >
                {landingPageContent.heroSection.ctaButton}
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="relative group mt-14">
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
            <Image
              width={1300}
              height={656}
              className="w-full md:w-[1200px] mx-auto rounded-lg relative leading-none flex items-center border border-t-2 border-secondary border-t-primary/30"
              src={src}
              alt="dashboard"
              priority
            />

            <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
          </div>
        </div>
      </section>
    </>
  );
};
