"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarIcon, Info, Trash, Pencil } from "lucide-react";
import { format, parse, set } from "date-fns";
import {
  type ModuleFormData,
  type ModuleData,
  moduleFormSchema,
} from "@/lib/validations/course";

const CourseScheduling = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [editingModuleId, setEditingModuleId] = useState<number | null>(null);
  const [modules, setModules] = useState<ModuleData[]>([
    {
      id: 1,
      title: "Identifying Your Niche",
      module: "Module 1",
      description:
        "We'll delve into finding your area of expertise and how to translate it into a teachable course.",
      icon: "💡",
      timeframe: "March 12, 09:40 - 11:30am",
    },
    {
      id: 2,
      title: "Defining Your Target Learner",
      module: "Module 1",
      description:
        "Who are you creating this course for? Understanding their needs and learning styles is crucial.",
      icon: "🌍",
      timeframe: "March 13, 13:00 - 15:30am",
    },
  ]);

  const form = useForm<ModuleFormData>({
    resolver: zodResolver(moduleFormSchema),
    defaultValues: {
      title: "",
      module: "",
      description: "",
      icon: "📚",
      timeframe: "",
    },
  });

  const handleDelete = (id: number) => {
    setModules((prev) => prev.filter((module) => module.id !== id));
  };

  const handleEdit = (module: ModuleData) => {
    setEditingModuleId(module.id);
    form.reset({
      title: module.title,
      module: module.module,
      description: module.description,
      icon: module.icon,
      timeframe: module.timeframe,
    });
  };

  const handleCancel = () => {
    setEditingModuleId(null);
    form.reset();
  };

  const onSubmit = (data: ModuleFormData) => {
    if (editingModuleId) {
      // Update existing module
      setModules((prev) =>
        prev.map((module) =>
          module.id === editingModuleId ? { ...data, id: module.id } : module,
        ),
      );
      setEditingModuleId(null);
    } else {
      // Create new module
      const newModule: ModuleData = {
        ...data,
        id: Date.now(),
      };
      setModules((prev) => [...prev, newModule]);
    }
    form.reset();
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-md w-full flex-grow h-fit">
      {/* Header */}
      <h2 className="text-xl font-semibold">Course Schedule</h2>
      <p className="text-gray-600 text-sm">
        Decide on the timeframe covered in the course. Whether it's a specific
        historical period, from the topics you've entered.{" "}
        <span className="text-blue-500 cursor-pointer">Like this Example</span>
      </p>

      {/* Alert Message */}
      {showAlert && (
        <Alert className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
          <div className="flex justify-between items-center">
            <div>
              <AlertTitle>⚠️ Important!</AlertTitle>
              <AlertDescription>
                Here's where you add course content like lectures, course
                sections, assignments, and more. Click + icon to get started.
              </AlertDescription>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="text-gray-500 text-xl"
            >
              &times;
            </button>
          </div>
        </Alert>
      )}

      {/* Learning Modules List */}
      {modules.map((module) => (
        <div
          key={module.id}
          className="mt-6 border p-4 rounded-lg"
        >
          {editingModuleId === module.id ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="timeframe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timeframe</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          onChange={(e) => {
                            const date = new Date(e.target.value);
                            field.onChange(format(date, "MMMM d, HH:mm'am'"));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button type="submit">Save Changes</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{module.title}</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(module)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(module.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-500 text-sm">{module.module}</p>
              <p className="text-gray-600 mt-2">{module.description}</p>
              <div className="flex items-center mt-2 text-blue-600 text-sm">
                📅 Timeframe: {module.timeframe}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseScheduling;
