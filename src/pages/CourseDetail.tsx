import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Check, Clock, Users, Star, Heart, Share2, BookOpen } from 'lucide-react';
import { useLearning } from '../context/LearningContext';

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCourseById, toggleWishlist, enrollInCourse, updateProgress } = useLearning();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  
  const course = getCourseById(id!);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
          <Link to="/courses" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  const completedLessons = course.lessons.filter(lesson => lesson.completed).length;

  const handleLessonComplete = (lessonId: string) => {
    updateProgress(course.id, lessonId);
    
    // Auto-select next lesson
    const currentIndex = course.lessons.findIndex(lesson => lesson.id === lessonId);
    if (currentIndex < course.lessons.length - 1) {
      setSelectedLesson(course.lessons[currentIndex + 1].id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/courses"
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to courses
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="bg-black rounded-xl overflow-hidden mb-6 aspect-video relative">
            {selectedLesson === null ? (
              <div className="flex items-center justify-center h-full">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setSelectedLesson(course.lessons[0]?.id)}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-6 transition-colors"
                  >
                    <Play className="h-12 w-12 text-white" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <video
                  controls
                  className="w-full h-full"
                  src={course.lessons.find(l => l.id === selectedLesson)?.videoUrl}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          {/* Course Info */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
                <p className="text-lg text-gray-600">by {course.instructor}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleWishlist(course.id)}
                  className={`p-2 rounded-full transition-colors ${
                    course.inWishlist ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${course.inWishlist ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="font-medium">{course.rating}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{course.lessons.length} lessons</span>
              </div>
            </div>

            {course.enrolled && course.progress !== undefined && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Your Progress</span>
                  <span>{course.progress}% complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {completedLessons} of {course.lessons.length} lessons completed
                </p>
              </div>
            )}

            <p className="text-gray-700 leading-relaxed">{course.description}</p>
          </div>

          {/* Course Content */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Course Content</h2>
            <div className="space-y-2">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedLesson === lesson.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedLesson(lesson.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        lesson.completed 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {lesson.completed ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {index + 1}. {lesson.title}
                        </h3>
                        <p className="text-sm text-gray-600">{lesson.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{lesson.duration}</span>
                      {course.enrolled && !lesson.completed && selectedLesson === lesson.id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLessonComplete(lesson.id);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-3xl font-bold text-gray-900">₹{course.price.toLocaleString()}</span>
                {course.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">₹{course.originalPrice.toLocaleString()}</span>
                )}
              </div>
              {course.originalPrice && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                  {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                </span>
              )}
            </div>

            {!course.enrolled ? (
              <button
                onClick={() => enrollInCourse(course.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors mb-4"
              >
                Enroll Now
              </button>
            ) : (
              <div className="mb-4">
                <div className="bg-green-100 text-green-800 p-3 rounded-lg text-center font-medium mb-3">
                  ✓ You're enrolled!
                </div>
                {selectedLesson === null && course.lessons.length > 0 && (
                  <button
                    onClick={() => setSelectedLesson(course.lessons[0].id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    Start Learning
                  </button>
                )}
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Level</span>
                <span className="font-medium">{course.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lessons</span>
                <span className="font-medium">{course.lessons.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium">{course.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Students</span>
                <span className="font-medium">{course.students.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};