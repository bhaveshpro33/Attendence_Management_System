"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AdminDashboard } from '../Admin/admin-dashboard'
import { TeacherDashboard } from '../Teacher/Teacher-dashboard'
import { StudentDashboard } from '../Student/Student-dashboard'
import { motion, AnimatePresence } from "framer-motion"


// Mock data


const Data = [
  {
    id: 1,
    name: "Alice_Johnson",
    password:"Alice123",
    role:"student",
    grade: "10th",
    age: 16,
    subjects: ["Mathematics", "Science", "English", "History"],
    attendance: [
      { date: "2023-05-01", status: "Present" },
      { date: "2023-05-02", status: "Present" },
      { date: "2023-05-03", status: "Absent" },
      { date: "2023-05-04", status: "Present" },
      { date: "2023-05-05", status: "Present" },
    ],
    grades: [
      { subject: "Mathematics", grade: "A",score:94},
      { subject: "Science", grade: "B+",score:85 },
      { subject: "English", grade: "A-",score:90 },
      { subject: "History", grade: "B" ,score:81},
    ]
  },
  {
    id: 2,
    name: "Bob_Smith",
    password:"Bob123",
    role:"student",
    grade: "10th",
    age: 15,
    subjects: ["Mathematics", "Science", "English", "Art"],
    attendance: [
      { date: "2023-05-01", status: "Present" },
      { date: "2023-05-02", status: "Absent" },
      { date: "2023-05-03", status: "Present" },
      { date: "2023-05-04", status: "Present" },
      { date: "2023-05-05", status: "Present" },
    ],
    grades: [
      { subject: "Mathematics", grade: "B",score:70 },
      { subject: "Science", grade: "A-" ,score:85},
      { subject: "English", grade: "B+",score:75 },
      { subject: "Art", grade: "A",score:94 },
    ]
  },
  {
    id: 3,
    name: "Charlie_Brown",
    password:"Charlie123",
    role:"student",
    grade: "10th",
    age: 16,
    subjects: ["Mathematics", "Science", "English", "Physical Education"],
    attendance: [
      { date: "2023-05-01", status: "Absent" },
      { date: "2023-05-02", status: "Present" },
      { date: "2023-05-03", status: "Present" },
      { date: "2023-05-04", status: "Present" },
      { date: "2023-05-05", status: "Absent" },
    ],
    grades: [
      { subject: "Mathematics", grade: "C+",score:45},
      { subject: "Science", grade: "B",score:62 },
      { subject: "English", grade: "B-",score:57 },
      { subject: "Physical Education", grade: "A+",score:97 },
    ]
  },
  {
    id: 4,
    name: "Diana_Ross",
    password:"Diana123",
    role:"student",
    grade: "10th",
    age: 15,
    subjects: ["Mathematics", "Science", "English", "Music"],
    attendance: [
      { date: "2023-05-01", status: "Present" },
      { date: "2023-05-02", status: "Present" },
      { date: "2023-05-03", status: "Present" },
      { date: "2023-05-04", status: "Absent" },
      { date: "2023-05-05", status: "Present" },
    ],
    grades: [
      { subject: "Mathematics", grade: "B+",score:86 },
      { subject: "Science", grade: "A" ,score:91},
      { subject: "English", grade: "A",score:93 },
      { subject: "Music", grade: "A+" ,score:96},
    ]
  },
  {
    id:5,
    name:"Om_Patel",
    password:"Om123",
    role:"teacher",
    grade:"11th",
    age:35,
    subjects: ["Mathematics", "Science", "English"]
  },
  {
    id:6,
    name:"Admin",
    password:"Admin123",
    role:"admin",
    age:35,
   
  }
]
// Mock data remains unchanged

const backgroundVariants = {
  light: {
    background: "linear-gradient(135deg, #6EE7B7 0%, #3B82F6 100%)",
  },
  dark: {
    background: "linear-gradient(135deg, #3B82F6 0%, #9333EA 100%)",
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setrole] = useState('student')
  const [loginError,setLoginError]=useState('')
  const handleLogin = () => {
   const error= onLogin(role, username,password)
   setLoginError(error)
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex items-center justify-center min-h-screen w-full p-4"
    >
      <Card className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 p-6">
          <CardTitle className="text-4xl font-bold text-white">Login</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="username" className="text-lg font-semibold text-gray-700 dark:text-gray-300">Username</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} 
                   className="bg-gray-100 dark:bg-gray-700 border-2 border-purple-300 dark:border-purple-600 focus:border-pink-500 dark:focus:border-pink-400 rounded-lg" />
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="password" className="text-lg font-semibold text-gray-700 dark:text-gray-300">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                   className="bg-gray-100 dark:bg-gray-700 border-2 border-purple-300 dark:border-purple-600 focus:border-pink-500 dark:focus:border-pink-400 rounded-lg" />
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-center space-x-4">
            <Label htmlFor="userType" className="text-lg font-semibold text-gray-700 dark:text-gray-300">I am a:</Label>
            <select
              id="role"
              value={role}
              onChange={(e) => setrole(e.target.value)}
              className="flex-grow p-2 bg-gray-100 dark:bg-gray-700 border-2 border-purple-300 dark:border-purple-600 rounded-lg text-gray-800 dark:text-gray-200"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button onClick={handleLogin} 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
              Login
            </Button>

          </motion.div>
          {loginError && <p className="text-red-500 text-sm mt-4">{loginError}</p>}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function AttendanceSystem() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [role, setrole] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [theme, setTheme] = useState('dark')
  const [Auth,setAuth]=useState(false)
  useEffect(() => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(isDarkMode ? 'dark' : 'light')
  }, [])

  const handleLogin = (role, username,password) => {
    console.log(role,username,password);
    
    setrole(role)
    const user =  Data.find(s => s.name === username && s.password ===password && s.role === role) 
    if (user) {
      setLoggedIn(true)
      setCurrentUser(user)
      setAuth(true)
    } else {
      return('Invalid username, password, or role')
    }
    console.log(user);
  }
    
  

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <motion.div
      className={`min-h-screen w-full ${theme === 'dark' ? 'dark' : ''}`}
      initial="light"
      animate={theme}
      variants={backgroundVariants}
    >
      <div className="min-h-screen w-full transition-all duration-500 ease-in-out">
        <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="self-end mb-8"
          >
            <Button onClick={toggleTheme} 
                    className="bg-white dark:bg-gray-800 text-purple-600 dark:text-pink-400 font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
          </motion.div>
          <AnimatePresence mode="wait">
            {!loggedIn ? (
              <LoginScreen key="login" onLogin={handleLogin} />
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="flex-grow bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-4"
              >
                {Auth && role === 'admin' && <AdminDashboard user={currentUser} allUsers={Data}/>}
                {Auth && role === 'teacher' && <TeacherDashboard teacher={currentUser} studentsData={Data} />}
                {Auth && role === 'student' && <StudentDashboard student={currentUser} studentsData={Data} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}