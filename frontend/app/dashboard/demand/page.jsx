'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDashboard } from '../DashboardContext';

const DemandTrendChart = () => {
  const { selectedIndustriesData } = useDashboard();

  const chartData = selectedIndustriesData.map(industry => ({
    name: `${industry.industry} (${industry.location.city})`,
    current: industry.demand_metrics.current_demand,
    projected: industry.demand_metrics.projected_demand,
    growth: industry.demand_metrics.yoy_growth,
    confidence: industry.market_summary.confidence_score * 10
  }));

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Industry Demand Trends</CardTitle>
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
              dataKey="current" 
              stroke="#8884d8" 
              name="Current Demand" 
            />
            <Line 
              type="monotone" 
              dataKey="projected" 
              stroke="#82ca9d" 
              name="Projected Demand" 
            />
            <Line 
              type="monotone" 
              dataKey="confidence" 
              stroke="#ffc658" 
              name="Confidence Score" 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DemandTrendChart;