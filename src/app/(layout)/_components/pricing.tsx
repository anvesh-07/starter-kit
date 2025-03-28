"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import usePaddle from "@/hooks/use-paddle";
import { landingPageContent } from "@/lib/constants/hero.constants";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export const PricingSection = () => {
  const { paddle } = usePaddle();

  const {
    data: price,
    error,
    isError,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["subs-price"],
    queryFn: async () => {
      const priceDetails = await paddle?.PricePreview({
        items: [
          {
            priceId: landingPageContent.pricingSection.plansList[0].priceId,
            quantity: 1,
          },
        ],
      });

      return priceDetails?.data.details.lineItems[0].formattedUnitTotals
        .subtotal;
    },
    enabled: !!paddle,
  });

  if (isError) {
    toast(error.name, {
      description: error.message,
    });
  }

  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Pricing
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        {landingPageContent.pricingSection.title}
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
        {landingPageContent.pricingSection.description}
      </h3>

      <div className="flex justify-center items-center w-full h-fit">
        {landingPageContent.pricingSection.plansList.map(
          ({ title, popular, description, buttonText, benefitList }) => (
            <Card
              key={title}
              className={
                popular === 1
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="pb-2">{title}</CardTitle>

                <CardDescription className="pb-4">
                  {description}
                </CardDescription>

                <div>
                  <span className="text-3xl font-bold">
                    {!isLoading && !isPending ? (
                      price
                    ) : (
                      <Skeleton className="w-28 h-12 inline-block" />
                    )}
                  </span>
                  <span className="text-muted-foreground"> /month</span>
                </div>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check className="text-primary mr-2" />
                      <h3>{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Link
                  href="/sign-in"
                  className={cn(
                    "w-full",
                    buttonVariants({
                      variant: popular === 1 ? "default" : "secondary",
                    })
                  )}
                >
                  {buttonText}
                </Link>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
