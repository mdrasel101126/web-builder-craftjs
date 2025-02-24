"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";

interface PricingPlanType {
  id: number;
  name: string;
  price: string;
  features: string[];
}

export default function PricingPlan() {
  const [plans, setPlans] = useState<PricingPlanType[]>([
    {
      id: 1,
      name: "Basic",
      price: "Free",
      features: ["Access to limited modules"],
    },
    {
      id: 2,
      name: "Pro",
      price: "$29/month",
      features: ["Access to all modules", "Community support"],
    },
  ]);
  const [newPlan, setNewPlan] = useState<{
    name: string;
    price: string;
    features: string;
  }>({ name: "", price: "", features: "" });

  const addPlan = () => {
    if (!newPlan.name || !newPlan.price) return;
    setPlans([
      ...plans,
      {
        id: plans.length + 1,
        name: newPlan.name,
        price: newPlan.price,
        features: newPlan.features.split(","),
      },
    ]);
    setNewPlan({ name: "", price: "", features: "" });
  };

  const removePlan = (id: number) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Pricing Plan</h1>
      <Input
        placeholder="Plan Name"
        value={newPlan.name}
        onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
      />
      <Input
        placeholder="Price"
        value={newPlan.price}
        onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
      />
      <Input
        placeholder="Features (comma separated)"
        value={newPlan.features}
        onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
      />
      <Button
        onClick={addPlan}
        className="w-full flex items-center gap-2"
      >
        <Plus size={16} /> Add Plan
      </Button>

      <div className="space-y-4">
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg">{plan.name}</h2>
                  <p className="text-gray-600">{plan.price}</p>
                  <ul className="text-sm text-gray-500 list-disc list-inside">
                    {plan.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removePlan(plan.id)}
                >
                  <Trash size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
