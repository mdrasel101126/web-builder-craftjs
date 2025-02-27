"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Filter, Plus } from "lucide-react";
import * as z from "zod";

export const paymentMethodSchema = z.object({
  contactEmail: z.enum(["account", "alternative"]),
  alternativeEmail: z.string().email().optional(),
  defaultCard: z.string(),
});

export const billingHistorySchema = z.object({
  invoiceId: z.string(),
  planName: z.string(),
  amount: z.number(),
  date: z.date(),
  status: z.enum(["Paid", "Pending", "Failed"]),
  planType: z.string(),
});

export type PaymentMethodFormData = z.infer<typeof paymentMethodSchema>;
export type BillingHistory = z.infer<typeof billingHistorySchema>;

export function Payments() {
  const [cards] = useState([
    {
      id: "visa-4543",
      type: "Visa",
      last4: "4543",
      isDefault: true,
      description: "Up to 50 users and 100GB team data",
    },
    {
      id: "mc-3278",
      type: "Mastercard",
      last4: "3278",
      isDefault: false,
      description: "Up to 50 users and 100GB team data",
    },
  ]);

  const [billingHistory] = useState([
    {
      invoiceId: "INV-2022-06",
      planName: "Basic Plan - June 2022",
      amount: 144.0,
      date: new Date("2022-06-10"),
      status: "Paid",
      planType: "Basic Plan",
    },
    {
      invoiceId: "INV-2022-05",
      planName: "Professional Plan - May 2022",
      amount: 1440.0,
      date: new Date("2022-05-10"),
      status: "Paid",
      planType: "Professional Plan",
    },
    // Add more billing history as needed
  ]);

  const form = useForm<PaymentMethodFormData>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      contactEmail: "account",
      alternativeEmail: "",
      defaultCard: "visa-4543",
    },
  });

  const onSubmit = (data: PaymentMethodFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="mx-5 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Payment Method</h1>
          <p className="text-gray-500">
            Update your billing details and address.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
        </div>
      </div>

      <div className="space-y-6">
        <Form {...form}>
          <form className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Contact Email</h2>
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="account"
                            id="account"
                          />
                          <FormLabel htmlFor="account">
                            Send to my account email
                            <p className="text-sm text-gray-500">
                              berlyvallendito@gmail.com
                            </p>
                          </FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="alternative"
                            id="alternative"
                          />
                          <FormLabel htmlFor="alternative">
                            Send to an alternative email
                            <Input
                              placeholder="Enter alternative email"
                              className="mt-2"
                              disabled={field.value !== "alternative"}
                              {...form.register("alternativeEmail")}
                            />
                          </FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Card Details</h2>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Payment
                </Button>
              </div>

              <div className="space-y-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className={`p-4 border rounded-lg flex items-center justify-between ${
                      card.isDefault ? "border-blue-500 bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12">
                        {card.type === "Visa" ? (
                          <img
                            src="/icons/visa-card.png"
                            alt="Visa"
                          />
                        ) : (
                          <img
                            src="/icons/master-card.png"
                            alt="Mastercard"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {card.type} **** {card.last4}
                        </p>
                        <p className="text-sm text-gray-500">
                          {card.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {card.isDefault && (
                        <Badge
                          variant="outline"
                          className="bg-blue-100"
                        >
                          Default
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </Form>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Billing History</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" /> Add Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
              >
                Download all
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoices</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map((invoice) => (
                <TableRow key={invoice.invoiceId}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      {invoice.planName}
                    </div>
                  </TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>{format(invoice.date, "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invoice?.status === "Paid" ? "default" : "destructive"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.planType}</TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      className="text-blue-500"
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
