"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CourseBuilderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <CourseHeader />
      <CourseProgressNav />
      {children}
    </div>
  );
}

const CourseHeader = () => {
  return (
    <div className="flex items-center justify-between border-b px-6 py-4 bg-white">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/my-course">
          <ChevronLeft className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
        </Link>
        <h1 className="text-lg font-semibold flex items-center gap-2">
          Create Course <Badge variant="outline">Draft</Badge>
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline">Save Update</Button>
        <Button>Publish Course</Button>
      </div>
    </div>
  );
};

import { cn } from "@/lib/utils";
import { CheckCircle, Globe, List, Calendar, FileText } from "lucide-react";
import { usePathname } from "next/navigation";

const steps = [
  { label: "Plan Course", icon: List, path: "/course-builder/course-plan" },
  {
    label: "Create Your Content",
    icon: FileText,
    path: "/course-builder/create-course-content",
  },
  {
    label: "Course Schedule",
    icon: Calendar,
    path: "/course-builder/course-schedule",
  },
  {
    label: "Pricing Plan",
    icon: CheckCircle,
    path: "/course-builder/pricing-plan",
  },
  {
    label: "Course Website",
    icon: Globe,
    path: "/course-builder/course-website",
  },
  { label: "Create Quiz", icon: FileText, path: "/course-builder/create-quiz" },
];

const CourseProgressNav = () => {
  const pathName = usePathname();
  return (
    <div className="flex items-center justify-between border-b px-6 py-4 bg-white">
      <div className="flex items-center gap-6">
        {steps.map((step, index) => {
          return (
            <Link
              href={step.path}
              key={index}
              className={cn(
                "flex items-center gap-2 text-gray-500 cursor-pointer",
                pathName === step.path && "text-blue-600 font-semibold",
              )}
            >
              <step.icon
                className={cn(
                  "w-4 h-4",
                  pathName === step.path ? "text-blue-600" : "text-gray-400",
                )}
              />
              <span>{step.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="text-sm font-medium text-gray-600">
        <span className="text-black">{24}</span> / 100%
      </div>
    </div>
  );
};
