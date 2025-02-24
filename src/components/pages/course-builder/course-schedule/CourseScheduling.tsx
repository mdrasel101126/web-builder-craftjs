"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarIcon, Info, Trash, Pencil } from "lucide-react";
import { format } from "date-fns";

type LearningModule = {
  id: number;
  title: string;
  module: string;
  description: string;
  icon: string;
  timeframe: string;
};

const CourseScheduling = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [selectedContent, setSelectedContent] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [modules, setModules] = useState<LearningModule[]>([
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

  const handleDelete = (id: number) => {
    setModules((prev) => prev.filter((module) => module.id !== id));
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-md w-full flex-grow h-fit">
      {/* Header */}
      <h2 className="text-xl font-semibold">Course Schedule</h2>
      <p className="text-gray-600 text-sm">
        Decide on the timeframe covered in the course. Whether it’s a specific
        historical period, from the topics you’ve entered.{" "}
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

      {/* Course Selection */}
      <div className="mt-6 border p-4 rounded-lg">
        <h3 className="font-semibold text-lg flex items-center">
          Learning 3 <Info className="w-4 h-4 ml-2 text-gray-500" />
        </h3>
        <div className="flex gap-4 mt-3">
          <Select onValueChange={(value) => setSelectedContent(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Content" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="content1">Content 1</SelectItem>
              <SelectItem value="content2">Content 2</SelectItem>
              <SelectItem value="content3">Content 3</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex justify-between"
              >
                {selectedDate
                  ? format(selectedDate, "PPP")
                  : "Select time and date"}
                <CalendarIcon className="w-5 h-5 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button className="mt-4">Save Scheduled</Button>
      </div>

      {/* Learning Modules List */}
      {modules.map((module) => (
        <div
          key={module.id}
          className="mt-6 border p-4 rounded-lg"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{module.title}</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
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
        </div>
      ))}
    </div>
  );
};

export default CourseScheduling;
