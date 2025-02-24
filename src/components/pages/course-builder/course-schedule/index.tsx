"use client";
import CourseCard from "./CourseCard";
import CourseScheduling from "./CourseScheduling";

const CourseSchedule = () => {
  return (
    <div className="flex justify-between  gap-5 px-20 py-10">
      <CourseScheduling />
      <CourseCard />
    </div>
  );
};

export default CourseSchedule;
