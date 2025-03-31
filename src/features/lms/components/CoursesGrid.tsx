"use client";

import { useState } from "react";
import { Course } from "../models/types";
import CourseCard from "./CourseCard";
import { useRouter } from "next/navigation";

interface CoursesGridProps {
  courses: Course[];
  emptyMessage?: string;
  className?: string;
}

/**
 * CoursesGrid component displays a grid of course cards
 * 
 * In a production environment, this would include:
 * - Pagination
 * - Filtering
 * - Sorting options
 */
export default function CoursesGrid({ 
  courses, 
  emptyMessage = "No courses found", 
  className 
}: CoursesGridProps) {
  const router = useRouter();

  const handleCourseClick = (courseId: string) => {
    // Navigate to course detail page
    router.push(`/lms/courses/${courseId}`);
  };

  if (!courses || courses.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/30">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className || ''}`}>
      {courses.map(course => (
        <CourseCard 
          key={course.id} 
          course={course} 
          onClick={() => handleCourseClick(course.id)} 
        />
      ))}
    </div>
  );
} 