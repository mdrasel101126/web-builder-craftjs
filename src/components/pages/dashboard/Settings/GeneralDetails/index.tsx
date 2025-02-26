"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";

export const generalDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  bio: z.string().max(500, "Bio must not exceed 500 characters"),
  timezone: z.string(),
  avatar: z.string().optional(),
});

export type GeneralDetailsFormData = z.infer<typeof generalDetailsSchema>;

export function GeneralDetails() {
  const [avatar, setAvatar] = useState<string | null>(null);

  const form = useForm<GeneralDetailsFormData>({
    resolver: zodResolver(generalDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      bio: "",
      timezone: "UTC-08:00",
    },
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: GeneralDetailsFormData) => {
    console.log({ ...data, avatar });
    // Handle form submission
  };

  return (
    <div className=" m-5 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">General Details</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Form {...form}>
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Personal Information</h2>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter first name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                            workstation.com/
                          </span>
                          <Input
                            className="rounded-l-none"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a short introduction..."
                          className="h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timezone</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="UTC-08:00">
                            Pacific Standard Time (PST)
                          </SelectItem>
                          <SelectItem value="UTC-05:00">
                            Eastern Time (ET)
                          </SelectItem>
                          <SelectItem value="UTC+00:00">
                            Coordinated Universal Time (UTC)
                          </SelectItem>
                          <SelectItem value="UTC+07:00">
                            Western Indonesian Time (WIB)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <h2 className="text-lg font-medium mb-6">Your Photo</h2>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32">
                    <Image
                      src={avatar || "/images/user.jpg"}
                      alt="Profile"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <label className="cursor-pointer">
                      <Input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                      <span className="text-blue-500 hover:text-blue-600">
                        Edit your photo
                      </span>
                    </label>
                    {avatar && (
                      <Button
                        variant="ghost"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => setAvatar(null)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    SVG, PNG, JPG or GIF
                    <br />
                    (max. 800x800px)
                  </p>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
