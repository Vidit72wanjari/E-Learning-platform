import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Award, Play, ChevronRight, BookOpen } from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { CourseCard } from '../components/CourseCard';
import { ProgressCard } from '../components/ProgressCard';

export const Dashboard: React.FC = () => {
  const { user, enrolledCourses, courses } = useLearning();
  
  const recentCourses = enrolledCourses.slice(0, 3);
  const recommendedCourses = courses.filter(course => !course.enrolled).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-gray-600 mt-2">Continue your learning journey and track your progress.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <ProgressCard
          title="Courses Completed"
          value={user.coursesCompleted}
          subtitle="Total courses"
          icon={Award}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <ProgressCard
          title="Learning Hours"
          value={user.totalHours}
          subtitle="Total hours"
          icon={Clock}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <ProgressCard
          title="Current Streak"
          value={`${user.currentStreak} days`}
          subtitle="Keep it up!"
          icon={TrendingUp}
          color="text-orange-600"
          bgColor="bg-orange-100"
        />
        <ProgressCard
          title="Active Courses"
          value={enrolledCourses.length}
          subtitle="In progress"
          icon={BookOpen}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />
      </div>

      {/* Continue Learning */}
      {recentCourses.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
            <Link
              to="/courses"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              View all courses
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentCourses.map(course => (
              <CourseCard key={course.id} course={course} showProgress={true} />
            ))}
          </div>
        </div>
      )}

      {/* Learning Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                <div className="bg-green-100 p-2 rounded-full">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Course Completed!</p>
                  <p className="text-sm text-gray-600">You completed "Digital Marketing Basics"</p>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Play className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">New Lesson Started</p>
                  <p className="text-sm text-gray-600">Started "State and Props" in React Development</p>
                </div>
                <span className="text-sm text-gray-500">Today</span>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
                <div className="bg-orange-100 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Streak Extended!</p>
                  <p className="text-sm text-gray-600">You've maintained your 7-day learning streak</p>
                </div>
                <span className="text-sm text-gray-500">Today</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">This Week's Goal</h3>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">5 Hours Learning</h4>
              <p className="text-sm text-gray-600 mb-4">Complete 5 hours of course content this week</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>3.2 / 5 hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500">1.8 hours remaining</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
          <Link
            to="/courses"
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Explore all courses
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};