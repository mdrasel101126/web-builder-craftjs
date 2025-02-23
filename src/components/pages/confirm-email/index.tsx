"use client";

import { useState } from "react";
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
import { Loader2 } from "lucide-react";
import { confirmEmail } from "@/app/actions/auth";
import Link from "next/link";

const confirmEmailSchema = z.object({
  code: z.string().min(6, "Code must be at least 6 characters"),
});

export default function ConfirmEmailForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(confirmEmailSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (data: { code: string }) => {
    setServerError(null);
    setLoading(true);
    const result = await confirmEmail(data);

    setLoading(false);

    if (result?.error) {
      setServerError(result.error);
    }
  };

  return (
    <Card className="w-full max-w-md p-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-lg">
          Confirm Your Email
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter the confirmation code sent to your email.
        </p>
        {serverError && (
          <p className="text-red-500 text-sm text-center">{serverError}</p>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="code">Confirmation Code</Label>
                  <FormControl>
                    <Input
                      id="code"
                      placeholder="Enter code"
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
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5 mx-auto" />
              ) : (
                "Confirm"
              )}
            </Button>
          </form>
          <div className="text-center mt-4">
            <Link
              href="/resend-email"
              className="underline underline-offset-4"
            >
              Resend Code
            </Link>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
