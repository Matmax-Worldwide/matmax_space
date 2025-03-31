/**
 * LMS Module Types
 * These types define the structure of the data in the LMS module
 * 
 * NOTE: This is currently using mock data, but in production, 
 * these would be populated from API responses (REST or GraphQL)
 */

// Course difficulty levels
export enum CourseDifficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  ALL_LEVELS = 'all-levels'
}

// Wellness disciplines (expandable in the future)
export enum DisciplineType {
  YOGA = 'yoga',
  MEDITATION = 'meditation',
  MINDFULNESS = 'mindfulness',
  BREATHING = 'breathing',
  FITNESS = 'fitness'
}

// Course status
export enum CourseStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

// Base user type
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'instructor' | 'student';
}

// Instructor profile
export interface Instructor extends User {
  role: 'instructor';
  bio: string;
  specialties: DisciplineType[];
  rating: number;
  coursesCount: number;
  studentsCount: number;
}

// Student profile
export interface Student extends User {
  role: 'student';
  enrolledCourses: string[]; // Course IDs
  completedCourses: string[]; // Course IDs
  progress: Record<string, number>; // Course ID -> progress percentage
}

// Course module (lesson)
export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  videoUrl?: string;
  resources?: Resource[];
  order: number;
}

// Course resource (attachment)
export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'audio' | 'link';
  url: string;
  size?: number; // in bytes
}

// Course review
export interface CourseReview {
  id: string;
  courseId: string;
  studentId: string;
  studentName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

// Main course interface
export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  instructorId: string;
  instructorName: string;
  price: number;
  discountPrice?: number;
  duration: number; // Total duration in minutes
  modulesCount: number;
  studentsEnrolled: number;
  difficulty: CourseDifficulty;
  discipline: DisciplineType;
  tags: string[];
  rating: number;
  reviewsCount: number;
  status: CourseStatus;
  createdAt: string;
  updatedAt: string;
  modules?: CourseModule[];
  reviews?: CourseReview[];
}

// Course Analytics
export interface CourseAnalytics {
  courseId: string;
  courseTitle: string;
  enrollmentCount: number;
  completionRate: number;
  averageRating: number;
  revenue: number;
  revenueGrowth: number;
}

// LMS Dashboard Analytics
export interface LMSAnalytics {
  totalCourses: number;
  totalStudents: number;
  totalInstructors: number;
  activeCourses: number;
  totalRevenue: number;
  revenueGrowth: number;
  courseCompletionRate: number;
  studentSatisfaction: number;
} 