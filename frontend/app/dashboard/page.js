'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@clerk/nextjs";
import {redirect} from 'next/navigation';
import { useEffect } from "react";

export default function DashboardPage() {
  const { userId } = useAuth();
 
  
  useEffect(() => {
    if (!userId) {
      setTimeout(() => {
        redirect("/sign-in");
      }, 1000); 
    }
  }, [userId]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Industries</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">10</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Average Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">26%</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Highest Demand</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">AI & ML</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Salary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">₹30L</p>
        </CardContent>
      </Card>
    </div>
  );
}