"use client";

import { useState } from "react";
import { BarChart3, BookOpen, Search, Filter, Users, GraduationCap, PlusCircle } from "lucide-react";
import { Course, LMSAnalytics } from "../models/types";
import CoursesGrid from "./CoursesGrid";

interface LMSDashboardProps {
  courses: Course[];
  analytics: LMSAnalytics;
}

/**
 * LMSDashboard component displays the main LMS dashboard
 * 
 * NOTE: In a production environment, data would be fetched from an API
 * Example GraphQL query:
 * 
 * query GetLMSDashboard {
 *   lmsAnalytics {
 *     totalCourses
 *     totalStudents
 *     totalInstructors
 *     activeCourses
 *     totalRevenue
 *     revenueGrowth
 *     courseCompletionRate
 *     studentSatisfaction
 *   }
 *   courses(limit: 6, sort: "newest") {
 *     id
 *     title
 *     description
 *     thumbnail
 *     price
 *     instructor {
 *       name
 *     }
 *     # ... other fields
 *   }
 * }
 */
export default function LMSDashboard({ courses, analytics }: LMSDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses);

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredCourses(courses);
      return;
    }
    
    const filtered = courses.filter(course => 
      course.title.toLowerCase().includes(term.toLowerCase()) ||
      course.discipline.toLowerCase().includes(term.toLowerCase()) ||
      course.instructorName.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredCourses(filtered);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg p-4 shadow-sm">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Courses</p>
              <h3 className="text-2xl font-bold">{analytics.totalCourses}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg p-4 shadow-sm">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Students</p>
              <h3 className="text-2xl font-bold">{analytics.totalStudents}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg p-4 shadow-sm">
          <div className="flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
              <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Instructors</p>
              <h3 className="text-2xl font-bold">{analytics.totalInstructors}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg p-4 shadow-sm">
          <div className="flex items-center">
            <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-full">
              <BarChart3 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
              <h3 className="text-2xl font-bold">{analytics.courseCompletionRate}%</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Course Performance</h2>
          <p className="mb-4 text-muted-foreground">Metrics on student engagement and course completions.</p>
          <div className="border-t border-border pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Course Completion Rate</span>
              <span className="text-sm text-green-600">{analytics.courseCompletionRate}%</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mb-4">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${analytics.courseCompletionRate}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Student Satisfaction</span>
              <span className="text-sm text-green-600">{analytics.studentSatisfaction}%</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mb-4">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${analytics.studentSatisfaction}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Revenue Analytics</h2>
          <p className="mb-4 text-muted-foreground">Financial performance of the learning platform.</p>
          <div className="border-t border-border pt-4">
            <div className="flex justify-between mb-4">
              <span className="text-sm font-medium">Total Revenue</span>
              <span className="text-lg font-semibold text-blue-600">${analytics.totalRevenue.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Growth</span>
              <div className="flex items-center bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                  <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm">{analytics.revenueGrowth}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Management Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Manage Courses</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <PlusCircle size={16} />
            <span>Add Course</span>
          </button>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-800"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>
        
        {/* Courses Grid */}
        <CoursesGrid 
          courses={filteredCourses} 
          emptyMessage={searchTerm ? "No courses match your search" : "No courses available"} 
        />
      </div>
    </div>
  );
} 