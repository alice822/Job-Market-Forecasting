import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Award, AlertTriangle } from 'lucide-react';

const JobMarketDashboard = ({ data }) => {
  // Transform salary data for visualization
  const salaryData = [
    { name: 'Minimum', amount: data.salary_insights.range_low },
    { name: 'Median', amount: data.salary_insights.median },
    { name: 'Maximum', amount: data.salary_insights.range_high },
  ];

  // Transform demand metrics for visualization
  const demandData = [
    { name: 'Current Demand', value: data.demand_metrics.current_demand },
    { name: 'Projected Demand', value: data.demand_metrics.projected_demand },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YoY Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.demand_metrics.yoy_growth}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Openings</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.demand_metrics.job_openings_estimate.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competition Level</CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.demand_metrics.competition_level}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Salary Range Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Salary Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Demand Metrics Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Demand Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={demandData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Required Skills</h3>
              <div className="space-y-2">
                {data.skills_analysis.required_skills.map((skill) => (
                  <div key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Emerging Skills</h3>
              <div className="space-y-2">
                {data.skills_analysis.emerging_skills.map((skill) => (
                  <div key={skill} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Complementary Skills</h3>
              <div className="space-y-2">
                {data.skills_analysis.complementary_skills.map((skill) => (
                  <div key={skill} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Factors Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Positive Drivers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.market_factors.positive_drivers.map((driver) => (
                <li key={driver} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  {driver}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Risk Factors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.market_factors.risk_factors.map((risk) => (
                <li key={risk} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  {risk}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobMarketDashboard;