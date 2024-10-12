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
import { Users, GraduationCap, School, FileText } from "lucide-react"

// Mock data for admin dashboard
const overviewData = {
  totalStudents: 500,
  
  totalTeachers: 50,
  totalDepartments: 5,
  averageAttendance: 92.5
}

const departmentsData = [
  { name: "Science", students: 150, teachers: 15 },
  { name: "Mathematics", students: 120, teachers: 12 },
  { name: "Literature", students: 100, teachers: 10 },
  { name: "History", students: 80, teachers: 8 },
  { name: "Art", students: 50, teachers: 5 }
]

export function AdminDashboard({user={},allUsers=[]}) {
  return (
    (<DashboardLayout user={user} allUsers={allUsers}>
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overviewData.totalStudents}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overviewData.totalTeachers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Departments</CardTitle>
                <School className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overviewData.totalDepartments}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overviewData.averageAttendance}%</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Departments Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Teachers</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentsData.map((dept, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell>{dept.students}</TableCell>
                      <TableCell>{dept.teachers}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Report generation functionality would be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>)
  );
}