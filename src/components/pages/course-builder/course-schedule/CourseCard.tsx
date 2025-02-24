import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Pencil } from "lucide-react";
import { useState } from "react";

const CourseCard = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(2024, 2, 12),
    new Date(2024, 2, 13),
  ]); // March 12 & 13, 2024

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm w-80 shrink-0 h-fit">
      {/* Course Labels */}
      <div className="flex gap-2 mb-2">
        <Badge variant="outline">Course</Badge>
        <Badge className="bg-green-100 text-green-700">Digital</Badge>
      </div>

      {/* Course Title */}
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">
          Create Compelling Course Content
        </h2>
        <Pencil className="w-4 h-4 text-gray-400 cursor-pointer" />
      </div>

      {/* Course Details */}
      <div className="text-sm text-gray-600 mt-2">
        <p>
          <span className="font-medium">Level</span> : Beginner to Intermediate
        </p>
        <p>
          <span className="font-medium">Format</span> : Online
        </p>
      </div>

      {/* Calendar */}
      <div className="mt-4">
        <Calendar
          mode="multiple"
          selected={selectedDates}
          onSelect={(dates) => setSelectedDates(dates || [])} // Ensure it always sets an array
          className="rounded-md border"
        />
      </div>

      <p className="text-xs text-gray-500 mt-2">
        *Calendar view with scheduled dates
      </p>
    </div>
  );
};

export default CourseCard;
