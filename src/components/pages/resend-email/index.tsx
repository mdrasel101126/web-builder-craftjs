"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Mail } from "lucide-react";
import { resendEmail } from "@/app/actions/auth";

const resendEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ResendEmailForm() {
  const [serverResponse, setServerResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const form = useForm({
    resolver: zodResolver(resendEmailSchema),
    defaultValues: { email: "" },
  });

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const onSubmit = async (data: { email: string }) => {
    setServerResponse(null);
    setLoading(true);
    const formData = new FormData();
    formData.append("email", data.email);
    const result = await resendEmail(formData);

    setLoading(false);
    if (result?.error) {
      setServerResponse(result.error);
    } else if (result?.success) {
      setServerResponse(result.success);
      setCooldown(60); // Start cooldown timer for 60 seconds
    }
  };

  return (
    <Card className="w-full max-w-md p-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-lg flex items-center gap-2">
          <Mail className="h-6 w-6" /> Resend Confirmation Email
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter your email to receive a new confirmation link.
        </p>
        {serverResponse && (
          <p
            className={`text-sm text-center ${
              serverResponse.includes("success")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {serverResponse}
          </p>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email Address</Label>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loading || cooldown > 0}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5 mx-auto" />
              ) : cooldown > 0 ? (
                `Resend in ${cooldown}s`
              ) : (
                "Resend Email"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
