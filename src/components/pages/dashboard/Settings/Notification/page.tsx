"use client";

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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Mail, Clock } from "lucide-react";
import * as z from "zod";

export const notificationSettingsSchema = z.object({
  emailNotifications: z.object({
    accountActivity: z.boolean(),
    newFeatures: z.boolean(),
    marketingEmails: z.boolean(),
    securityAlerts: z.boolean(),
  }),
  pushNotifications: z.object({
    newMessages: z.boolean(),
    taskUpdates: z.boolean(),
    teamActivity: z.boolean(),
    reminders: z.boolean(),
  }),
  notificationFrequency: z.enum(["immediate", "daily", "weekly", "never"]),
  emailDigest: z.enum(["daily", "weekly", "never"]),
});

export type NotificationSettingsFormData = z.infer<
  typeof notificationSettingsSchema
>;

export function Notification() {
  const form = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      emailNotifications: {
        accountActivity: true,
        newFeatures: true,
        marketingEmails: false,
        securityAlerts: true,
      },
      pushNotifications: {
        newMessages: true,
        taskUpdates: true,
        teamActivity: true,
        reminders: true,
      },
      notificationFrequency: "immediate",
      emailDigest: "daily",
    },
  });

  const onSubmit = (data: NotificationSettingsFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="mx-5 p-6 ">
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-2xl font-semibold">Notification Settings</h1>
          <p className="text-gray-500">Manage how you receive notifications</p>
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
        <form className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Notifications
              </CardTitle>
              <CardDescription>
                Configure your email notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="emailNotifications.accountActivity"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel>Account Activity</FormLabel>
                      <FormDescription>
                        Get notified about your account activity and security
                        updates
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
                name="emailNotifications.newFeatures"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel>New Features</FormLabel>
                      <FormDescription>
                        Receive updates about new features and improvements
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
                name="emailNotifications.marketingEmails"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel>Marketing Emails</FormLabel>
                      <FormDescription>
                        Receive tips, promotions, and other marketing materials
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
                name="emailNotifications.securityAlerts"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel>Security Alerts</FormLabel>
                      <FormDescription>
                        Get important security alerts and notifications
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
                <Bell className="h-5 w-5" />
                Push Notifications
              </CardTitle>
              <CardDescription>
                Manage your push notification settings
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="pushNotifications.newMessages"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel>New Messages</FormLabel>
                      <FormDescription>
                        Get notified when you receive new messages
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
                name="pushNotifications.taskUpdates"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel>Task Updates</FormLabel>
                      <FormDescription>
                        Receive notifications about task assignments and updates
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
                name="pushNotifications.teamActivity"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel>Team Activity</FormLabel>
                      <FormDescription>
                        Stay updated with your team's activities
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
                name="pushNotifications.reminders"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel>Reminders</FormLabel>
                      <FormDescription>
                        Get reminders about important events and deadlines
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
                <Clock className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Set your notification frequency and digest preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="notificationFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notification Frequency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose how often you want to receive notifications
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emailDigest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Digest</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select digest frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="daily">Daily Summary</SelectItem>
                        <SelectItem value="weekly">Weekly Digest</SelectItem>
                        <SelectItem value="never">Don't send</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Receive a summary of your notifications
                    </FormDescription>
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
