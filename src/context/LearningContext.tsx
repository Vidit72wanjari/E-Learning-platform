import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  category: string;
  description: string;
  lessons: Lesson[];
  progress?: number;
  enrolled?: boolean;
  inWishlist?: boolean;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed?: boolean;
  description: string;
}

interface User {
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  coursesCompleted: number;
  totalHours: number;
  currentStreak: number;
}

interface LearningContextType {
  user: User;
  courses: Course[];
  enrolledCourses: Course[];
  wishlistCourses: Course[];
  toggleWishlist: (courseId: string) => void;
  enrollInCourse: (courseId: string) => void;
  updateProgress: (courseId: string, lessonId: string) => void;
  getCourseById: (id: string) => Course | undefined;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};

export const LearningProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user] = useState<User>({
    name: 'Vidit Wanjari',
    email: 'viditwanjari@gmail.com',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
    joinDate: 'January 2024',
    coursesCompleted: 12,
    totalHours: 156,
    currentStreak: 7
  });

  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Complete React Development Bootcamp',
      instructor: 'Arjun Sharma',
      price: 2999,
      originalPrice: 5999,
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
      students: 15420,
      duration: '42 hours',
      level: 'Intermediate',
      category: 'Web Development',
      description: 'Master React.js from basics to advanced concepts including hooks, context, and state management.',
      progress: 65,
      enrolled: true,
      lessons: [
        {
          id: '1-1',
          title: 'Introduction to React',
          duration: '45 min',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          completed: true,
          description: 'Learn the basics of React and why it\'s popular'
        },
        {
          id: '1-2',
          title: 'Components and JSX',
          duration: '52 min',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          completed: true,
          description: 'Understanding React components and JSX syntax'
        },
        {
          id: '1-3',
          title: 'State and Props',
          duration: '38 min',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          completed: false,
          description: 'Managing component state and passing data with props'
        }
      ]
    },
    {
      id: '2',
      title: 'Python for Data Science',
      instructor: 'Priya Patel',
      price: 3499,
      originalPrice: 6999,
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.9,
      students: 23100,
      duration: '38 hours',
      level: 'Beginner',
      category: 'Data Science',
      description: 'Learn Python programming specifically for data analysis, visualization, and machine learning.',
      progress: 0,
      enrolled: false,
      inWishlist: true,
      lessons: [
        {
          id: '2-1',
          title: 'Python Basics',
          duration: '60 min',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          description: 'Introduction to Python programming language'
        }
      ]
    },
    {
      id: '3',
      title: 'Digital Marketing Mastery',
      instructor: 'Rajesh Kumar',
      price: 1999,
      originalPrice: 3999,
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.6,
      students: 8750,
      duration: '25 hours',
      level: 'Beginner',
      category: 'Marketing',
      description: 'Complete guide to digital marketing including SEO, social media, and paid advertising.',
      progress: 30,
      enrolled: true,
      lessons: [
        {
          id: '3-1',
          title: 'Digital Marketing Fundamentals',
          duration: '35 min',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          completed: true,
          description: 'Understanding the digital marketing landscape'
        }
      ]
    },
    {
      id: '4',
      title: 'Machine Learning with TensorFlow',
      instructor: 'Ankit Agarwal',
      price: 4499,
      originalPrice: 8999,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.7,
      students: 12300,
      duration: '55 hours',
      level: 'Advanced',
      category: 'Machine Learning',
      description: 'Deep dive into machine learning using TensorFlow and Python.',
      progress: 0,
      enrolled: false,
      lessons: []
    },
    {
      id: '5',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Sneha Reddy',
      price: 2499,
      originalPrice: 4999,
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
      students: 18900,
      duration: '32 hours',
      level: 'Beginner',
      category: 'Design',
      description: 'Learn the principles of user interface and user experience design.',
      progress: 0,
      enrolled: false,
      lessons: []
    },
    {
      id: '6',
      title: 'Financial Planning & Investment',
      instructor: 'Vikram Singh',
      price: 1799,
      originalPrice: 3599,
      image: 'https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.5,
      students: 9500,
      duration: '20 hours',
      level: 'Beginner',
      category: 'Finance',
      description: 'Master personal finance, investment strategies, and wealth building.',
      progress: 0,
      enrolled: false,
      inWishlist: true,
      lessons: []
    }
  ]);

  const enrolledCourses = courses.filter(course => course.enrolled);
  const wishlistCourses = courses.filter(course => course.inWishlist);

  const toggleWishlist = (courseId: string) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, inWishlist: !course.inWishlist }
        : course
    ));
  };

  const enrollInCourse = (courseId: string) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, enrolled: true, progress: 0, inWishlist: false }
        : course
    ));
  };

  const updateProgress = (courseId: string, lessonId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        const updatedLessons = course.lessons.map(lesson =>
          lesson.id === lessonId ? { ...lesson, completed: true } : lesson
        );
        const completedLessons = updatedLessons.filter(lesson => lesson.completed).length;
        const progress = Math.round((completedLessons / updatedLessons.length) * 100);
        
        return { ...course, lessons: updatedLessons, progress };
      }
      return course;
    }));
  };

  const getCourseById = (id: string) => {
    return courses.find(course => course.id === id);
  };

  return (
    <LearningContext.Provider value={{
      user,
      courses,
      enrolledCourses,
      wishlistCourses,
      toggleWishlist,
      enrollInCourse,
      updateProgress,
      getCourseById
    }}>
      {children}
    </LearningContext.Provider>
  );
};