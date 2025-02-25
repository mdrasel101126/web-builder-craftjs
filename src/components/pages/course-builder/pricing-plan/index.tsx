"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Gift,
  Infinity,
  LayoutGrid,
  Repeat,
  Split,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type PricingPlan, pricingPlanSchema } from "@/lib/validations/course";

const PLAN_TYPES = [
  {
    id: "ONE_TIME_STANDARD",
    name: "One-time Plan (Standard)",
    icon: CreditCard,
  },
  {
    id: "SPLIT_PAYMENT",
    name: "Split Payment Plan",
    icon: Split,
  },
  {
    id: "SUBSCRIPTION_STANDARD",
    name: "Subscription Plan (Standard)",
    icon: Repeat,
  },
  {
    id: "ONE_TIME_TIERED",
    name: "One-time Plan (Tiered)",
    icon: LayoutGrid,
  },
  {
    id: "SUBSCRIPTION_TIERED",
    name: "Subscription Plan (Tiered)",
    icon: LayoutGrid,
  },
  {
    id: "DONATION",
    name: "Donation Plan",
    icon: Gift,
  },
] as const;

export default function PricingPlanForm() {
  const [selectedPlanType, setSelectedPlanType] =
    useState<PricingPlan["type"]>("ONE_TIME_STANDARD");

  const form = useForm<PricingPlan>({
    resolver: zodResolver(pricingPlanSchema),
    defaultValues: {
      type: "ONE_TIME_STANDARD",
      price: 0,
      strikeThroughPrice: undefined,
      expiry: "LIFETIME",
    },
  });

  function onSubmit(data: PricingPlan) {
    console.log(data);
  }

  return (
    <div className="m-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="grid grid-cols-3 gap-5">
            <div className="space-y-3">
              {PLAN_TYPES.map((plan) => (
                <Card
                  key={plan.id}
                  className={cn(
                    "cursor-pointer hover:bg-accent",
                    selectedPlanType === plan.id && "border-primary",
                  )}
                  onClick={() => {
                    setSelectedPlanType(plan.id as PricingPlan["type"]);
                    form.setValue("type", plan.id as PricingPlan["type"]);
                  }}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <plan.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{plan.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="col-span-2">
              {selectedPlanType === "ONE_TIME_STANDARD" && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="strikeThroughPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Strike Through Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number.parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number.parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expiry"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Course Expiry</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="LIFETIME" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                <div className="flex items-center gap-2">
                                  <Infinity className="h-4 w-4" />
                                  Lifetime
                                </div>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="LIMITED" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                <div className="flex items-center gap-2">
                                  <Timer className="h-4 w-4" />
                                  Limited
                                </div>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("expiry") === "LIMITED" && (
                    <FormField
                      control={form.control}
                      name="expiryDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Days</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Number of days"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number.parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}
              {/* Add other plan type forms here */}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit">Create Plan</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
