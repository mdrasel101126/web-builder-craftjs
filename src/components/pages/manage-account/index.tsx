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
import { Loader2, Settings } from "lucide-react";
import { updateAccount } from "@/app/actions/auth";

const manageAccountSchema = z.object({
  newEmail: z.string().email("Invalid email address").optional(),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters")
    .optional(),
  oldPassword: z.string().min(6, "Old password is required"),
});

export default function ManageAccountForm() {
  const [serverResponse, setServerResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(manageAccountSchema),
    defaultValues: { newEmail: "", newPassword: "", oldPassword: "" },
  });

  const onSubmit = async (data: z.infer<typeof manageAccountSchema>) => {
    setServerResponse(null);
    setLoading(true);

    const result: any = await updateAccount(data);

    setLoading(false);
    if (result?.error) {
      setServerResponse(result.error);
    } else if (result?.success) {
      setServerResponse(result.success);
    }
  };

  return (
    <Card className="w-full max-w-md p-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-lg flex items-center gap-2">
          <Settings className="h-6 w-6" /> Manage Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 text-center mb-4">
          Update your email or password.
        </p>
        {/*  {serverResponse && (
          <p
            className={`text-sm text-center ${
              serverResponse?.includes("success")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {serverResponse}
          </p>
        )} */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="newEmail">New Email</Label>
                  <FormControl>
                    <Input
                      id="newEmail"
                      placeholder="Enter new email (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="newPassword">New Password</Label>
                  <FormControl>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="oldPassword">Old Password</Label>
                  <FormControl>
                    <Input
                      id="oldPassword"
                      type="password"
                      placeholder="Enter old password"
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
                "Update Account"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
