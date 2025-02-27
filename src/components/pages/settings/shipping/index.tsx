"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, Plus, Globe, Scale } from "lucide-react";
import * as z from "zod";

export const shippingZoneSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Zone name is required"),
  countries: z.array(z.string()).min(1, "Select at least one country"),
  rates: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, "Rate name is required"),
      price: z.number().min(0, "Price must be positive"),
      minWeight: z.number().min(0),
      maxWeight: z.number().min(0),
      deliveryTime: z.string(),
    }),
  ),
});

export const shippingSettingsSchema = z.object({
  defaultShippingZone: z.string(),
  enableInternationalShipping: z.boolean(),
  freeShippingThreshold: z.number().min(0),
  calculateTaxes: z.boolean(),
  shippingZones: z.array(shippingZoneSchema),
  weightUnit: z.enum(["kg", "lb"]),
  dimensionUnit: z.enum(["cm", "inch"]),
});

export type ShippingSettingsFormData = z.infer<typeof shippingSettingsSchema>;

export function Shipping() {
  const [showAddZone, setShowAddZone] = useState(false);

  const form = useForm<ShippingSettingsFormData>({
    resolver: zodResolver(shippingSettingsSchema),
    defaultValues: {
      defaultShippingZone: "domestic",
      enableInternationalShipping: true,
      freeShippingThreshold: 100,
      calculateTaxes: true,
      weightUnit: "kg",
      dimensionUnit: "cm",
      shippingZones: [
        {
          id: "domestic",
          name: "Domestic Shipping",
          countries: ["US"],
          rates: [
            {
              id: "standard",
              name: "Standard Shipping",
              price: 5.99,
              minWeight: 0,
              maxWeight: 20,
              deliveryTime: "3-5 business days",
            },
          ],
        },
      ],
    },
  });

  const onSubmit = (data: ShippingSettingsFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="mx-5 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Shipping Settings</h1>
          <p className="text-gray-500">
            Configure your shipping rules and zones
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>Save Changes</Button>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                General Shipping Settings
              </CardTitle>
              <CardDescription>
                Configure your basic shipping preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="enableInternationalShipping"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel>International Shipping</FormLabel>
                      <FormDescription>
                        Enable shipping to international destinations
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="freeShippingThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Free Shipping Threshold</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Minimum order amount for free shipping
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="calculateTaxes"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel>Calculate Taxes</FormLabel>
                      <FormDescription>
                        Automatically calculate and apply taxes to orders
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Shipping Zones
              </CardTitle>
              <CardDescription>
                Manage your shipping zones and rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zone Name</TableHead>
                    <TableHead>Countries</TableHead>
                    <TableHead>Rates</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {form.watch("shippingZones").map((zone) => (
                    <TableRow key={zone.id}>
                      <TableCell>{zone.name}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {zone.countries.map((country) => (
                            <Badge
                              key={country}
                              variant="secondary"
                            >
                              {country}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {zone.rates.map((rate) => (
                          <div
                            key={rate.id}
                            className="text-sm"
                          >
                            {rate.name} - ${rate.price}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => setShowAddZone(true)}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Shipping Zone
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Measurement Units
              </CardTitle>
              <CardDescription>
                Set your preferred measurement units
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="weightUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="lb">Pounds (lb)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dimensionUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dimension Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cm">Centimeters (cm)</SelectItem>
                        <SelectItem value="inch">Inches (inch)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
