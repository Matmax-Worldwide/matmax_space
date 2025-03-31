import { 
  Course, 
  CourseAnalytics, 
  CourseDifficulty, 
  CourseModule, 
  CourseReview, 
  CourseStatus, 
  DisciplineType, 
  Instructor, 
  LMSAnalytics, 
  Student 
} from './types';

/**
 * MOCK DATA FOR LMS MODULE
 * 
 * NOTE: In a production environment, this data would be fetched from:
 * - REST API endpoints
 * - GraphQL queries
 * 
 * Example GraphQL query that would replace this mock data:
 * 
 * query GetCourses {
 *   courses(limit: 10) {
 *     id
 *     title
 *     description
 *     instructor {
 *       id
 *       name
 *     }
 *     difficulty
 *     discipline
 *     price
 *   }
 * }
 */

// Mock instructors
export const MOCK_INSTRUCTORS: Instructor[] = [
  {
    id: 'ins-001',
    name: 'Maya Johnson',
    email: 'maya@matmaxwellness.com',
    avatar: '/images/avatars/maya-johnson.jpg',
    role: 'instructor',
    bio: 'Certified yoga instructor with 10+ years of experience in Hatha and Vinyasa yoga.',
    specialties: [DisciplineType.YOGA, DisciplineType.MEDITATION],
    rating: 4.9,
    coursesCount: 5,
    studentsCount: 328
  },
  {
    id: 'ins-002',
    name: 'David Chen',
    email: 'david@matmaxwellness.com',
    avatar: '/images/avatars/david-chen.jpg',
    role: 'instructor',
    bio: 'Mindfulness coach and meditation practitioner with a focus on stress reduction techniques.',
    specialties: [DisciplineType.MEDITATION, DisciplineType.MINDFULNESS],
    rating: 4.8,
    coursesCount: 3,
    studentsCount: 215
  },
  {
    id: 'ins-003',
    name: 'Sarah Williams',
    email: 'sarah@matmaxwellness.com',
    avatar: '/images/avatars/sarah-williams.jpg',
    role: 'instructor',
    bio: 'Wellness expert specializing in breathwork and mindfulness meditation for anxiety relief.',
    specialties: [DisciplineType.BREATHING, DisciplineType.MINDFULNESS],
    rating: 4.7,
    coursesCount: 4,
    studentsCount: 189
  }
];

// Mock course modules
const yogaFoundationModules: CourseModule[] = [
  {
    id: 'mod-001',
    title: 'Introduction to Yoga',
    description: 'Learn the fundamentals and history of yoga practice.',
    duration: 20,
    videoUrl: 'https://example.com/courses/yoga-foundations/intro',
    order: 1
  },
  {
    id: 'mod-002',
    title: 'Basic Poses & Alignment',
    description: 'Master the foundational yoga poses with proper alignment.',
    duration: 45,
    videoUrl: 'https://example.com/courses/yoga-foundations/poses',
    order: 2
  },
  {
    id: 'mod-003',
    title: 'Breathing Techniques',
    description: 'Discover pranayama breathing exercises to enhance your practice.',
    duration: 30,
    videoUrl: 'https://example.com/courses/yoga-foundations/breathing',
    order: 3
  },
  {
    id: 'mod-004',
    title: 'Your First Flow',
    description: 'Put everything together in a beginner-friendly yoga flow.',
    duration: 60,
    videoUrl: 'https://example.com/courses/yoga-foundations/flow',
    order: 4
  }
];

const meditationBasicsModules: CourseModule[] = [
  {
    id: 'mod-101',
    title: 'What is Meditation?',
    description: 'Understand the science and philosophy behind meditation.',
    duration: 15,
    videoUrl: 'https://example.com/courses/meditation-basics/intro',
    order: 1
  },
  {
    id: 'mod-102',
    title: 'Setting Your Space',
    description: 'Create a peaceful environment for your practice.',
    duration: 10,
    videoUrl: 'https://example.com/courses/meditation-basics/space',
    order: 2
  },
  {
    id: 'mod-103',
    title: 'Guided Breath Meditation',
    description: 'Follow along with a simple breath-focused meditation.',
    duration: 20,
    videoUrl: 'https://example.com/courses/meditation-basics/breath',
    order: 3
  }
];

// Mock course reviews
const yogaFoundationReviews: CourseReview[] = [
  {
    id: 'rev-001',
    courseId: 'course-001',
    studentId: 'stu-001',
    studentName: 'Emily Roberts',
    rating: 5,
    comment: 'Perfect introduction for beginners. Maya explains everything clearly and makes it easy to follow along.',
    date: '2023-11-20'
  },
  {
    id: 'rev-002',
    courseId: 'course-001',
    studentId: 'stu-002',
    studentName: 'Michael Torres',
    rating: 4,
    comment: 'Great course! I wish there were more advanced poses included, but overall very helpful.',
    date: '2023-12-03'
  }
];

const meditationBasicsReviews: CourseReview[] = [
  {
    id: 'rev-101',
    courseId: 'course-002',
    studentId: 'stu-003',
    studentName: 'Jessica Kim',
    rating: 5,
    comment: 'David is an excellent instructor. This course helped me establish a daily meditation practice.',
    date: '2023-10-15'
  },
  {
    id: 'rev-102',
    courseId: 'course-002',
    studentId: 'stu-004',
    studentName: 'Thomas Wilson',
    rating: 5,
    comment: 'Transformed how I approach stress in my daily life. Highly recommended!',
    date: '2023-11-02'
  }
];

// Mock courses
export const MOCK_COURSES: Course[] = [
  {
    id: 'course-001',
    title: 'Yoga Foundations for Beginners',
    description: 'A comprehensive introduction to yoga for complete beginners. Learn the fundamental poses, breathing techniques, and principles of yoga in a supportive environment. This course will help you build strength, flexibility, and mindfulness with step-by-step guidance.',
    shortDescription: 'Master the fundamentals of yoga with this beginner-friendly course.',
    thumbnail: '/images/courses/yoga-foundations.jpg',
    instructorId: 'ins-001',
    instructorName: 'Maya Johnson',
    price: 49.99,
    discountPrice: 39.99,
    duration: 155, // minutes
    modulesCount: 4,
    studentsEnrolled: 145,
    difficulty: CourseDifficulty.BEGINNER,
    discipline: DisciplineType.YOGA,
    tags: ['beginner', 'yoga', 'wellness', 'flexibility'],
    rating: 4.8,
    reviewsCount: 32,
    status: CourseStatus.PUBLISHED,
    createdAt: '2023-09-15',
    updatedAt: '2023-11-20',
    modules: yogaFoundationModules,
    reviews: yogaFoundationReviews
  },
  {
    id: 'course-002',
    title: 'Meditation Basics: Finding Inner Calm',
    description: 'Learn the essential meditation techniques to reduce stress and increase mindfulness in your daily life. This course guides you through simple practices that can be incorporated into your routine for greater peace and clarity.',
    shortDescription: 'Discover the power of meditation to reduce stress and find calm.',
    thumbnail: '/images/courses/meditation-basics.jpg',
    instructorId: 'ins-002',
    instructorName: 'David Chen',
    price: 39.99,
    duration: 45, // minutes
    modulesCount: 3,
    studentsEnrolled: 98,
    difficulty: CourseDifficulty.ALL_LEVELS,
    discipline: DisciplineType.MEDITATION,
    tags: ['meditation', 'mindfulness', 'stress reduction', 'beginner'],
    rating: 4.9,
    reviewsCount: 24,
    status: CourseStatus.PUBLISHED,
    createdAt: '2023-10-01',
    updatedAt: '2023-12-05',
    modules: meditationBasicsModules,
    reviews: meditationBasicsReviews
  },
  {
    id: 'course-003',
    title: 'Mindful Breathing Techniques',
    description: 'Master various breathing exercises that promote relaxation, focus, and vitality. Learn how to use your breath to manage anxiety, improve concentration, and enhance overall wellbeing.',
    shortDescription: 'Transform your wellbeing through the power of conscious breathing.',
    thumbnail: '/images/courses/breathing-techniques.jpg',
    instructorId: 'ins-003',
    instructorName: 'Sarah Williams',
    price: 34.99,
    duration: 75, // minutes
    modulesCount: 5,
    studentsEnrolled: 67,
    difficulty: CourseDifficulty.BEGINNER,
    discipline: DisciplineType.BREATHING,
    tags: ['breathing', 'anxiety relief', 'focus', 'wellness'],
    rating: 4.7,
    reviewsCount: 18,
    status: CourseStatus.PUBLISHED,
    createdAt: '2023-11-10',
    updatedAt: '2024-01-05'
  },
  {
    id: 'course-004',
    title: 'Vinyasa Flow: Intermediate Practice',
    description: 'Take your yoga practice to the next level with this dynamic vinyasa flow series. Build strength, flexibility and mindfulness through sequenced movements synchronized with breath.',
    shortDescription: 'Elevate your yoga practice with dynamic vinyasa flows.',
    thumbnail: '/images/courses/vinyasa-flow.jpg',
    instructorId: 'ins-001',
    instructorName: 'Maya Johnson',
    price: 59.99,
    duration: 180, // minutes
    modulesCount: 6,
    studentsEnrolled: 83,
    difficulty: CourseDifficulty.INTERMEDIATE,
    discipline: DisciplineType.YOGA,
    tags: ['vinyasa', 'flow', 'intermediate', 'strength'],
    rating: 4.9,
    reviewsCount: 22,
    status: CourseStatus.PUBLISHED,
    createdAt: '2023-10-20',
    updatedAt: '2024-01-10'
  },
  {
    id: 'course-005',
    title: 'Mindfulness for Daily Life',
    description: 'Learn practical mindfulness techniques that you can integrate into your everyday routines. Discover how to bring awareness to ordinary activities and transform your relationship with stress.',
    shortDescription: 'Bring the power of mindfulness into every moment of your day.',
    thumbnail: '/images/courses/daily-mindfulness.jpg',
    instructorId: 'ins-002',
    instructorName: 'David Chen',
    price: 45.99,
    duration: 90, // minutes
    modulesCount: 4,
    studentsEnrolled: 117,
    difficulty: CourseDifficulty.ALL_LEVELS,
    discipline: DisciplineType.MINDFULNESS,
    tags: ['mindfulness', 'daily practice', 'stress reduction', 'awareness'],
    rating: 4.6,
    reviewsCount: 31,
    status: CourseStatus.PUBLISHED,
    createdAt: '2023-09-05',
    updatedAt: '2023-12-15'
  },
  {
    id: 'course-006',
    title: 'Advanced Meditation Retreat',
    description: 'This virtual retreat offers advanced meditation practices for experienced practitioners. Explore deep states of consciousness and refine your meditation technique with expert guidance.',
    shortDescription: 'Deepen your meditation practice with advanced techniques.',
    thumbnail: '/images/courses/advanced-meditation.jpg',
    instructorId: 'ins-002',
    instructorName: 'David Chen',
    price: 89.99,
    duration: 240, // minutes
    modulesCount: 8,
    studentsEnrolled: 42,
    difficulty: CourseDifficulty.ADVANCED,
    discipline: DisciplineType.MEDITATION,
    tags: ['advanced', 'meditation', 'consciousness', 'retreat'],
    rating: 4.9,
    reviewsCount: 14,
    status: CourseStatus.PUBLISHED,
    createdAt: '2023-11-15',
    updatedAt: '2024-02-01'
  }
];

// Mock students
export const MOCK_STUDENTS: Student[] = [
  {
    id: 'stu-001',
    name: 'Emily Roberts',
    email: 'emily@example.com',
    avatar: '/images/avatars/emily-roberts.jpg',
    role: 'student',
    enrolledCourses: ['course-001', 'course-003'],
    completedCourses: ['course-001'],
    progress: {
      'course-001': 100,
      'course-003': 45
    }
  },
  {
    id: 'stu-002',
    name: 'Michael Torres',
    email: 'michael@example.com',
    avatar: '/images/avatars/michael-torres.jpg',
    role: 'student',
    enrolledCourses: ['course-001', 'course-002', 'course-004'],
    completedCourses: ['course-001', 'course-002'],
    progress: {
      'course-001': 100,
      'course-002': 100,
      'course-004': 60
    }
  },
  {
    id: 'stu-003',
    name: 'Jessica Kim',
    email: 'jessica@example.com',
    avatar: '/images/avatars/jessica-kim.jpg',
    role: 'student',
    enrolledCourses: ['course-002', 'course-005'],
    completedCourses: ['course-002'],
    progress: {
      'course-002': 100,
      'course-005': 75
    }
  }
];

// Mock analytics data
export const MOCK_COURSE_ANALYTICS: CourseAnalytics[] = [
  {
    courseId: 'course-001',
    courseTitle: 'Yoga Foundations for Beginners',
    enrollmentCount: 145,
    completionRate: 78,
    averageRating: 4.8,
    revenue: 5890.25,
    revenueGrowth: 12.5
  },
  {
    courseId: 'course-002',
    courseTitle: 'Meditation Basics: Finding Inner Calm',
    enrollmentCount: 98,
    completionRate: 82,
    averageRating: 4.9,
    revenue: 3640.10,
    revenueGrowth: 8.3
  },
  {
    courseId: 'course-003',
    courseTitle: 'Mindful Breathing Techniques',
    enrollmentCount: 67,
    completionRate: 65,
    averageRating: 4.7,
    revenue: 2297.30,
    revenueGrowth: 5.2
  }
];

// Mock dashboard analytics
export const MOCK_LMS_ANALYTICS: LMSAnalytics = {
  totalCourses: 6,
  totalStudents: 247,
  totalInstructors: 3,
  activeCourses: 6,
  totalRevenue: 15432.65,
  revenueGrowth: 18.5,
  courseCompletionRate: 76,
  studentSatisfaction: 92
}; 