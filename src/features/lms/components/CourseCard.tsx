"use client";

import { Course } from "../models/types";
import { Star, Users, Clock } from "lucide-react";
import Image from "next/image";
import { cn } from "@/src/core/utils/styling";

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
  className?: string;
}

/**
 * CourseCard component displays a course in a card format
 */
export default function CourseCard({ course, onClick, className }: CourseCardProps) {
  // Format duration from minutes to hours and minutes
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Format price with currency
  const formatPrice = (price: number, discountPrice?: number): JSX.Element => {
    if (discountPrice) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-semibold">${discountPrice.toFixed(2)}</span>
          <span className="text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
        </div>
      );
    }
    return <span className="text-green-600 font-semibold">${price.toFixed(2)}</span>;
  };

  // Get discipline color class
  const getDisciplineColor = (discipline: string): string => {
    switch (discipline) {
      case 'yoga':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400';
      case 'meditation':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'mindfulness':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'breathing':
        return 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div 
      className={cn(
        "bg-white dark:bg-zinc-800 border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col", 
        className
      )}
      onClick={onClick}
    >
      {/* Course thumbnail */}
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={course.thumbnail || '/images/course-placeholder.jpg'}
          alt={course.title}
          className="object-cover transition-transform duration-300 hover:scale-105"
          fill
        />
        <div className="absolute bottom-0 left-0 p-2">
          <span className={cn("px-2 py-1 rounded-md text-xs font-medium", getDisciplineColor(course.discipline))}>
            {course.discipline.charAt(0).toUpperCase() + course.discipline.slice(1)}
          </span>
        </div>
      </div>

      {/* Course content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center text-xs text-muted-foreground mb-1">
          <Clock size={14} className="mr-1" />
          <span>{formatDuration(course.duration)}</span>
          <span className="mx-2">•</span>
          <span className={cn(
            "px-1.5 py-0.5 rounded-sm text-xs font-medium",
            course.difficulty === 'beginner' ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400" :
            course.difficulty === 'intermediate' ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400" :
            course.difficulty === 'advanced' ? "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400" :
            "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
          )}>
            {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1).replace('-', ' ')}
          </span>
        </div>

        <h3 className="text-base font-semibold mb-1 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.shortDescription}</p>

        <div className="mt-auto pt-3 border-t border-border">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm">
              <Users size={14} className="mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">{course.studentsEnrolled}</span>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Star size={14} className="mr-1 text-amber-500" />
                <span>{course.rating}</span>
              </div>
            </div>
            <div>
              {formatPrice(course.price, course.discountPrice)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 