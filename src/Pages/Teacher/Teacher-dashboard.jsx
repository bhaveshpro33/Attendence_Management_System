import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BarChart, BookOpen, GraduationCap } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DashboardLayout } from '../Dashboard-layout'

export function TeacherDashboard({ teacher = {}, studentsData = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
  const [attendance, setAttendance] = useState({})

  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendance(prev => ({ ...prev, [studentId]: isPresent }))
  }

  const submitAttendance = () => {
    console.log("Attendance submitted:", attendance)
    // Here you would typically send this data to a server
  }

  const averageAttendance = studentsData.reduce((sum, student) => {
    if (student?.attendance?.length) {
      const presentDays = student.attendance.filter(day => day.status === "Present").length
      return sum + (presentDays / student.attendance.length)
    }
    return sum
  }, 0) / (studentsData.length || 1) * 100
  
  const averageGrade = studentsData.reduce((sum, student) => {
    if (student?.grades?.length) {
      const totalScore = student.grades.reduce((gradeSum, grade) => gradeSum + (grade.score || 0), 0)
      return sum + (totalScore / student.grades.length)
    }
    return sum
  }, 0) / (studentsData.length || 1)

  const renderContent = () => {
    return (
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Mark Attendance</TabsTrigger>
          <TabsTrigger value="grades">Student Grades</TabsTrigger>
          <TabsTrigger value="students">Student List</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentsData.filter(student => student.role === 'student').length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageAttendance.toFixed(2)}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageGrade.toFixed(2)}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Mark Attendance for {currentDate}</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="mb-4" />
              <div className="space-y-2">
                {studentsData.filter(student => student.role === 'student').map((student) => (
                  <div key={student.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`student-${student.id}`}
                      checked={attendance[student.id] || false}
                      onCheckedChange={(checked) => handleAttendanceChange(student.id, checked)} />
                    <Label htmlFor={`student-${student.id}`}>{student.name}</Label>
                  </div>
                ))}
              </div>
              <Button onClick={submitAttendance} className="mt-4">Submit Attendance</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="grades">
          <Card>
            <CardHeader>
              <CardTitle>Student Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {studentsData.flatMap(student => 
                (student.grades || []).map(grade => (
                  <TableRow key={`${student.id}-${grade.subject}`}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{grade.subject}</TableCell>
                    <TableCell>{grade.grade}</TableCell>
                    <TableCell>{grade.score}</TableCell>
                  </TableRow>
                ))
              )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Subjects</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {studentsData.length > 0 ? (
                    studentsData.filter(student => student.role === 'student').map(student => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name || 'N/A'}</TableCell>
                        <TableCell>{student.grade || 'N/A'}</TableCell>
                        <TableCell>{student.age || 'N/A'}</TableCell>
                        <TableCell>{Array.isArray(student.subjects) ? student.subjects.join(", ") : 'N/A'}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">No student data available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    )
  }

  return (
    <DashboardLayout 
      user={{...teacher, role: 'teacher'}} 
      allUsers={studentsData}
    >
      {renderContent()}
    </DashboardLayout>
  )
}