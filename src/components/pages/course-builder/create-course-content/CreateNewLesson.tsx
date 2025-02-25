"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Video, FileText } from "lucide-react";
import { LessonFormData, lessonSchema } from "@/lib/validations/course";

export default function CreateNewLesson({
  onLessonSubmit,
  lessonForm,
}: {
  onLessonSubmit: (data: LessonFormData) => void;
  lessonForm: ReturnType<typeof useForm<LessonFormData>>;
}) {
  const [activeTab, setActiveTab] = useState<LessonFormData["type"]>("VIDEO");

  return (
    <Form {...lessonForm}>
      <form
        onSubmit={lessonForm.handleSubmit(onLessonSubmit)}
        className="m-5 space-y-3"
      >
        <div className="grid grid-cols-3 gap-5">
          <Card className="col-span-2 ">
            <CardContent className="p-6">
              <FormField
                control={lessonForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter lesson name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Tabs
                value={activeTab}
                onValueChange={(value) => {
                  setActiveTab(value as LessonFormData["type"]);
                  lessonForm.setValue("type", value as LessonFormData["type"]);
                }}
                className="w-full mt-6"
              >
                <TabsList className="grid grid-cols-6 lg:grid-cols-12 h-auto gap-2">
                  <TabsTrigger
                    value="VIDEO"
                    className="flex flex-col py-2 h-auto"
                  >
                    <Video className="h-4 w-4 mb-1" />
                    <span className="text-xs">VIDEO</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="TEXT"
                    className="flex flex-col py-2 h-auto"
                  >
                    <FileText className="h-4 w-4 mb-1" />
                    <span className="text-xs">TEXT</span>
                  </TabsTrigger>
                  {/* Add other content type tabs here */}
                </TabsList>

                <TabsContent
                  value="VIDEO"
                  className="mt-4"
                >
                  <FormField
                    control={lessonForm.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter video URL"
                            onChange={(e) =>
                              field.onChange({
                                type: "VIDEO",
                                url: e.target.value,
                              })
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent
                  value="TEXT"
                  className="mt-4"
                >
                  <FormField
                    control={lessonForm.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Text Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter text content"
                            className="min-h-[200px]"
                            onChange={(e) =>
                              field.onChange({
                                type: "TEXT",
                                text: e.target.value,
                              })
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* Add other content type fields here */}
              </Tabs>

              <FormField
                control={lessonForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter lesson description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="col-span-1 h-fit">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Lesson Settings</h3>
              <div className="space-y-4">
                <FormField
                  control={lessonForm.control}
                  name="settings.isDraft"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Draft</FormLabel>
                        <FormDescription>Save as a draft</FormDescription>
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
                  control={lessonForm.control}
                  name="settings.isFreePreview"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Free Preview
                        </FormLabel>
                        <FormDescription>
                          Make this a free preview lesson
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
                {/* Add other settings fields here */}
              </div>
            </CardContent>
          </Card>
        </div>

        <Button type="submit">Save Lesson</Button>
      </form>
    </Form>
  );
}
