"use client";

import { DashboardLayout } from '@/src/core/ui/layouts/templates/DashboardLayout';
import { BarChart3, BookOpen, GraduationCap, LayoutGrid, Users, Info } from 'lucide-react';

export default function LMSPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Learning Management System</h1>
      
      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6 flex gap-3 items-start">
        <Info className="text-amber-500 mt-0.5" size={18} />
        <div>
          <h3 className="font-medium text-amber-800">LMS Module</h3>
          <p className="text-amber-700">This is the Learning Management System section of MatMax Wellness Studio.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Course Management</h2>
          <p className="mb-2 text-muted-foreground">Manage your courses, students, and instructors.</p>
          <div className="space-y-2">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
              <h3 className="font-medium text-green-700 dark:text-green-400">Active Courses</h3>
              <p className="text-green-600 dark:text-green-500 text-sm">12 courses currently active</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
              <h3 className="font-medium text-green-700 dark:text-green-400">Enrolled Students</h3>
              <p className="text-green-600 dark:text-green-500 text-sm">247 students enrolled</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Learning Analytics</h2>
          <p className="mb-4 text-muted-foreground">Track student progress and engagement.</p>
          <div className="border-t border-border pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Course Completion Rate</span>
              <span className="text-sm text-green-600">78%</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mb-4">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Student Satisfaction</span>
              <span className="text-sm text-green-600">92%</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mb-4">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 