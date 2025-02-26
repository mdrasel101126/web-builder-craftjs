"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";

export const planSchema = z.object({
  planType: z.enum(["Basic Plan", "Professional Plan", "Enterprise Plan"]),
  cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
  expiryDate: z.string(),
  paymentMethod: z.string(),
});

export type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  isActive?: boolean;
};

export type PlanFormData = z.infer<typeof planSchema>;

export function Plans() {
  const [selectedPlan, setSelectedPlan] = useState<string>("Professional Plan");

  const plans: Plan[] = [
    {
      id: "basic",
      name: "Basic Plan",
      description: "Perfect plan for Starters",
      price: 144,
      features: [
        "Unlimited products",
        "Customer segmentation",
        "2.0% Transaction fees",
      ],
    },
    {
      id: "professional",
      name: "Professional Plan",
      description: "Perfect plan for Professional",
      price: 1440,
      features: [
        "Get a Basic Plan",
        "Ecommerce automation",
        "1.0% Transaction fees",
      ],
      isActive: true,
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      description: "Perfect plan for Experts",
      price: 2481,
      features: [
        "Access to all features",
        "Duties and import taxes",
        "0.5% Transaction fees",
      ],
    },
  ];

  const form = useForm<PlanFormData>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      planType: "Professional Plan",
      cardNumber: "",
      expiryDate: "",
      paymentMethod: "visa",
    },
  });

  const onSubmit = (data: PlanFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="mx-5 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Account Plan</h1>
          <p className="text-gray-500">
            Pick an account plan that fits your market
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`cursor-pointer ${
              plan.isActive ? "border-blue-500" : ""
            }`}
            onClick={() => setSelectedPlan(plan.name)}
          >
            <CardHeader>
              <CardTitle>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-gray-500 ml-1">/year</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center"
                  >
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full mt-4"
                variant={plan.isActive ? "secondary" : "default"}
              >
                {plan.isActive ? "Current Plan" : "Choose Plan"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-4">Latest Payment</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Payment date</p>
              <p>Feb 23, 2022</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Type of Plan</p>
              <p>Professional Plan</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Card used to pay</p>
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                <span>Visa ****4563</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Payment</p>
              <p>$1,440.00</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Next Payment</h2>
            <Button
              variant="link"
              className="text-blue-500"
            >
              See Details
            </Button>
          </div>
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Due date</p>
              <p>on February 30, 2023</p>
            </div>
            <Button>Manage Payment</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
