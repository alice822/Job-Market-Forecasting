'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, TrendingUp, LineChart as LineChartIcon, BarChart as BarChartIcon, PieChart, Book, Menu, X } from "lucide-react";
import { DashboardProvider } from './DashboardContext';
import { useDashboard } from './DashboardContext';
import Link from 'next/link';
import { useState } from 'react';

const IndustrySelect = () => {
  const { 
    forecastData, 
    selectedIndustry1, 
    setSelectedIndustry1,
    selectedIndustry2, 
    setSelectedIndustry2 
  } = useDashboard();

  if (!forecastData) {
    return(
      <div className="flex items-center justify-center p-4">
        <div className="animate-pulse text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text animate-bounce">
          Loading...
        </div>
      </div>
    )}

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">Industry Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select value={selectedIndustry1} onValueChange={setSelectedIndustry1}>
            <SelectTrigger className="border-gray-200 hover:border-gray-300 transition-colors">
              <SelectValue placeholder="Select Industry 1" />
            </SelectTrigger>
            <SelectContent>
              {forecastData.map((industry) => (
                <SelectItem 
                  key={`${industry.industry}-${industry.location.city}`} 
                  value={industry.industry}
                >
                  {`${industry.industry} (${industry.location.city})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedIndustry2} onValueChange={setSelectedIndustry2}>
            <SelectTrigger className="border-gray-200 hover:border-gray-300 transition-colors">
              <SelectValue placeholder="Select Industry 2" />
            </SelectTrigger>
            <SelectContent>
              {forecastData.map((industry) => (
                <SelectItem 
                  key={`${industry.industry}-${industry.location.city}`} 
                  value={industry.industry}
                >
                  {`${industry.industry} (${industry.location.city})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

const MarketSummary = () => {
  const {selectedIndustriesData} = useDashboard([]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {selectedIndustriesData.map((industry) => (
        <Card key={`${industry.industry}-${industry.location.city}`} className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">{`${industry.industry} - ${industry.location.city}`}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 leading-relaxed">{industry.market_summary.forecast}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Confidence Score</span>
                <span className="text-sm font-bold text-gray-800">{(industry.market_summary.confidence_score * 100).toFixed(0)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Trajectory</span>
                <span className="text-sm font-bold text-gray-800">{industry.market_summary.growth_trajectory}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const navigationItems = [
  {
    title: "Overview",
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: "/dashboard"
  },
  {
    title: "Demand Analysis",
    icon: <TrendingUp className="h-4 w-4" />,
    href: "/dashboard/demand"
  },
  {
    title: "Salary Insights",
    icon: <LineChartIcon className="h-4 w-4" />,
    href: "/dashboard/salary"
  },
  {
    title: "Skills Analysis",
    icon: <BarChartIcon className="h-4 w-4" />,
    href: "/dashboard/skills"
  },
  {
    title: "Market Trends",
    icon: <PieChart className="h-4 w-4" />,
    href: "/dashboard/trends"
  },
  {
    title: "Generate Report",
    icon: <Book className="h-4 w-4" />,
    href: "/dashboard/generate-report"
  }
];

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <DashboardProvider>
      <div className="flex min-h-screen bg-gray-100">
        {/* Mobile menu button */}
       
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden fixed top-0 right-2 z-50 p-2 my-2 rounded-lg bg-white shadow-lg"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Sidebar - Desktop */}
        <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-30 w-64 bg-white border-r border-gray-200 shadow-lg`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
            <Link href="/" className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-800">JobForecast</span>
                <Badge variant="secondary" className="hidden sm:inline-flex">Beta</Badge>
              </Link>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors duration-150 group"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="group-hover:text-purple-600 transition-colors duration-150">
                    {item.icon}
                  </span>
                  <span className="ml-3">{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex flex-col flex-1 md:pl-64">
          <main className="flex-1">
            <div className="py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="mb-8">
                  <IndustrySelect />
                </section>
                <section className="mb-8">
                  <MarketSummary />
                </section>
                {/* Dynamic Content Section */}
                <section className="space-y-8">
                  {children}
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}