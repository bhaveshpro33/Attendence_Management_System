import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DashboardLayout } from '../Dashboard-layout'
import { BarChart, Calendar, BookOpen, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

export function StudentDashboard({ student={} ,studentsData = []  }) {
  const attendanceRate = student.attendance
    ? (student.attendance.filter(day => day.status === "Present").length / student.attendance.length) * 100
    : 0

  const averageGrade = student.grades
    ? student.grades.reduce((sum, grade) => sum + grade.score, 0) / student.grades.length
    : 0

  return (
    <DashboardLayout user={student} allUsers={studentsData}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card className="bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Attendance Rate</CardTitle>
            <BarChart className="h-6 w-6 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{attendanceRate.toFixed(2)}%</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Average Grade</CardTitle>
            <GraduationCap className="h-6 w-6 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageGrade.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500 to-yellow-400 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Subjects</CardTitle>
            <BookOpen className="h-6 w-6 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{student.subjects?.length || 0}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-indigo-400 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Grade</CardTitle>
            <Calendar className="h-6 w-6 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{student.grade}</div>
          </CardContent>
        </Card>
      </motion.div>
      <Tabs defaultValue="info" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 shadow-md">
          <TabsTrigger value="info" className="text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white">Student Info</TabsTrigger>
          <TabsTrigger value="attendance" className="text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white">Attendance Record</TabsTrigger>
          <TabsTrigger value="grades" className="text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white">Grades</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Card className="shadow-lg border border-gray-200">
            <CardHeader className="bg-blue-500 text-white">
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-gray-700">Name</TableCell>
                    <TableCell>{student.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-gray-700">Grade</TableCell>
                    <TableCell>{student.grade}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-gray-700">Age</TableCell>
                    <TableCell>{student.age}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-gray-700">Subjects</TableCell>
                    <TableCell>{student.subjects?.join(", ")}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="attendance">
          <Card className="shadow-lg border border-gray-200">
            <CardHeader className="bg-blue-500 text-white">
              <CardTitle>Attendance Record</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-700">Date</TableHead>
                    <TableHead className="text-gray-700">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.attendance?.map((day, index) => (
                    <TableRow key={index}>
                      <TableCell>{day.date}</TableCell>
                      <TableCell className={day.status === "Present" ? "text-emerald-600 font-semibold" : "text-red-600 font-semibold"}>
                        {day.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="grades">
          <Card className="shadow-lg border border-gray-200">
            <CardHeader className="bg-blue-500 text-white">
              <CardTitle>Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-700">Subject</TableHead>
                    <TableHead className="text-gray-700">Grade</TableHead>
                    <TableHead className="text-gray-700">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.grades?.map((grade, index) => (
                    <TableRow key={index}>
                      <TableCell>{grade.subject}</TableCell>
                      <TableCell className="font-semibold">{grade.grade}</TableCell>
                      <TableCell>{grade.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}