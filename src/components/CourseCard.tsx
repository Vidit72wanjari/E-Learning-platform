import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Clock, Heart, Play } from 'lucide-react';
import { useLearning } from '../context/LearningContext';

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
  progress?: number;
  enrolled?: boolean;
  inWishlist?: boolean;
}

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, showProgress = false }) => {
  const { toggleWishlist, enrollInCourse } = useLearning();

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(course.id);
  };

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    enrollInCourse(course.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <Link to={`/course/${course.id}`}>
        <div className="relative">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              course.inWishlist
                ? 'bg-red-100 text-red-600'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${course.inWishlist ? 'fill-current' : ''}`} />
          </button>
          {course.enrolled && (
            <div className="absolute top-3 left-3 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              Enrolled
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Play className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
              {course.category}
            </span>
            <span className="text-xs text-gray-500 font-medium">{course.level}</span>
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm leading-5">
            {course.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
          
          <div className="flex items-center space-x-4 mb-3 text-xs text-gray-500">
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{course.duration}</span>
            </div>
          </div>
          
          {showProgress && course.progress !== undefined && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">₹{course.price.toLocaleString()}</span>
              {course.originalPrice && (
                <span className="text-sm text-gray-500 line-through">₹{course.originalPrice.toLocaleString()}</span>
              )}
            </div>
            
            {!course.enrolled && (
              <button
                onClick={handleEnrollClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors"
              >
                Enroll Now
              </button>
            )}
            
            {course.enrolled && (
              <Link
                to={`/course/${course.id}`}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors"
              >
                Continue
              </Link>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};