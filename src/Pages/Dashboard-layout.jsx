import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Menu, X, Users, BarChart2, BookOpen, LogOut, Calendar, GraduationCap } from "lucide-react"
import AttendanceSystem from './Login/Login_Page'

// Helper components
const SidebarItem = ({ icon: Icon, label, href, onClick }) => (
  <motion.a
    href={href}
    className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900 rounded-lg p-2 transition-colors duration-200"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </motion.a>
);


const AttendanceCard = ({ attendance }) => (
  <Card>
    <CardHeader>
      <CardTitle>Attendance</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[200px]">
        {attendance.map((day, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>{day.date}</span>
            <span className={day.status === "Present" ? "text-green-500" : "text-red-500"}>{day.status}</span>
          </div>
        ))}
      </ScrollArea>
    </CardContent>
  </Card>
);

const GradesCard = ({ grades }) => (
  <Card>
    <CardHeader>
      <CardTitle>Grades</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[200px]">
        {grades.map((grade, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>{grade.subject}</span>
            <span className="font-bold">{grade.grade}</span>
          </div>
        ))}
      </ScrollArea>
    </CardContent>
  </Card>
);

const StudentList = ({ students }) => (
  <Card>
    <CardHeader>
      <CardTitle>Students</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[300px]">
        {students
          .filter(student => student.role === 'student')
          .map((student) => (
            <div key={student.id} className="flex justify-between items-center mb-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <span>{student.name}</span>
              <span>{student.grade}</span>
            </div>
          ))
        }
      </ScrollArea>
    </CardContent>
  </Card>
);
export function DashboardLayout({ user, allUsers ,children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const sidebarItems = {
    student: [
      { icon: Users, label: 'Overview', view: 'overview' },
      { icon: Calendar, label: 'Attendance', view: 'attendance' },
      { icon: GraduationCap, label: 'Grades', view: 'grades' },
    ],
    teacher: [
      { icon: Users, label: 'Overview', view: 'overview' },
      { icon: BookOpen, label: 'Students', view: 'students' },
    ],
    admin: [
      { icon: Users, label: 'Overview', view: 'overview' },
      { icon: BookOpen, label: 'All Users', view: 'allUsers' },
    ],
  };

  const sidebarVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      }
    },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.3
      }
    }
  };

  const renderContent = () => {
    if (activeView === 'overview') {
      return children;
    }

    switch (user.role) {
      case 'student':
        return renderStudentContent();
      case 'teacher':
        return renderTeacherContent();
      case 'admin':
        return renderAdminContent();
      default:
        return <div>Unknown user role</div>;
    }
  };

  const renderStudentContent = () => {
    switch (activeView) {
    
      case 'attendance':
        return <AttendanceCard attendance={user.attendance} />;
      case 'grades':
        return <GradesCard grades={user.grades} />;
      default:
        return <div>Select a view</div>;
    }
  };

  const renderTeacherContent = () => {
    const students = allUsers.filter(u => u.role === 'student' );
    // console.log(allUsers);
    
    switch (activeView) {
     
      case 'students':
        return <StudentList students={students} />;
      default:
        return <div>Select a view</div>;
    }
  };

  const renderAdminContent = () => {
    switch (activeView) {
    
     
      case 'allUsers':
        return (
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {allUsers.map((u) => (
                  <div key={u.id} className="flex justify-between items-center mb-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                    <span>{u.name}</span>
                    <span>{u.role}</span>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        );
      default:
        return <div>Select a view</div>;
    }
  };

  const handleLogout = () => {
    location.reload()
  }

  
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="bg-white dark:bg-gray-800 w-64 flex flex-col shadow-lg absolute md:relative z-10"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300">{user.name}'s Dashboard</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <ScrollArea className="flex-grow">
              <nav className="p-4 space-y-2">
                {sidebarItems[user.role].map((item, index) => (
                  <SidebarItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    href="#"
                    onClick={() => setActiveView(item.view)}
                  />
                ))}
              </nav>
            </ScrollArea>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                className="w-full justify-start text-gray-700 dark:text-gray-300"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-1 flex flex-col overflow-hidden">
        <motion.header 
          className="bg-white dark:bg-gray-800 shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <motion.div
                animate={{ rotate: isSidebarOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </Button>
            <h1 className="text-2xl font-bold text-purple-700 dark:text-purple-300">{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard</h1>
            <div className="w-8" />
          </div>
        </motion.header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}