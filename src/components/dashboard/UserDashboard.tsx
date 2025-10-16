"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Users, CheckCircle, Star, TrendingUp } from "lucide-react";

const UserDashboard = () => {
  const { data: session } = useSession();
  const stats = { enrolledCourses: 5, completedCourses: 2, inProgressCourses: 3, totalHoursLearned: 48, certificates: 2, averageProgress: 65 };
  return (<div className="p-6 space-y-6"><div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white"><h1 className="text-3xl font-bold mb-2">Welcome back, {session?.user?.name || "Student"}!</h1><p className="text-blue-100">Continue your learning journey and achieve your goals.</p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle><Book className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.enrolledCourses}</div><p className="text-xs text-muted-foreground">{stats.inProgressCourses} in progress</p></CardContent></Card></div><Card><CardHeader><CardTitle>Continue Learning</CardTitle></CardHeader><CardContent><div className="space-y-4"><p className="text-sm text-muted-foreground">Your courses in progress will appear here.</p><Link href="/courses" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">Browse Courses</Link></div></CardContent></Card></div>);
};
export default UserDashboard;
