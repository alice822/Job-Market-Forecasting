'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDashboard } from '../DashboardContext';

const Page = () => {
    const { selectedIndustriesData } = useDashboard();
  
    const chartData = selectedIndustriesData.map(industry => ({
      name: `${industry.industry} (${industry.location.city})`,
      median: industry.salary_insights.median / 100000,
      low: industry.salary_insights.range_low / 100000,
      high: industry.salary_insights.range_high / 100000
    }));
  
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Salary Comparison (Lakhs INR)</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="median" 
                stroke="#8884d8" 
                name="Median Salary" 
              />
              <Line 
                type="monotone" 
                dataKey="high" 
                stroke="#82ca9d" 
                name="High Range" 
              />
              <Line 
                type="monotone" 
                dataKey="low" 
                stroke="#ff7300" 
                name="Low Range" 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };

export default Page;