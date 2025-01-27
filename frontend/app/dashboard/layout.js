'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutDashboard, TrendingUp, LineChart as LineChartIcon, BarChart as BarChartIcon, PieChart, Book } from "lucide-react";
import { DashboardProvider } from './DashboardContext';
import { useDashboard } from './DashboardContext';
import Link from 'next/link';

const IndustrySelect = () => {
  const { 
    forecastData, 
    selectedIndustry1, 
    setSelectedIndustry1,
    selectedIndustry2, 
    setSelectedIndustry2 
  } = useDashboard();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Industry Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select value={selectedIndustry1} onValueChange={setSelectedIndustry1}>
            <SelectTrigger>
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
            <SelectTrigger>
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
      <Card key={`${industry.industry}-${industry.location.city}`}>
        <CardHeader>
          <CardTitle>{`${industry.industry} - ${industry.location.city}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{industry.market_summary.forecast}</p>
          <div className="mt-2">
            <p className="text-sm font-medium">
              Confidence Score: {(industry.market_summary.confidence_score * 100).toFixed(0)}%
            </p>
            <p className="text-sm font-medium">
              Trajectory: {industry.market_summary.growth_trajectory}
            </p>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
  )
}

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
  return (
    <DashboardProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col fixed inset-y-0">
          <div className="flex flex-col flex-grow border-r bg-gray-50">
            <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
              <h1 className="text-xl font-bold">Industry Analytics</h1>
            </div>
            <div className="flex-grow flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="flex-1 px-2 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 md:pl-64">
      <main className="flex-1 bg-gray-50">
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="mb-8">
              <div className="bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                <IndustrySelect />
              </div>
            </section>
            <section className="mb-8">
              <div className="bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                <MarketSummary />
              </div>
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