import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LineChart, BarChart, FileText,  } from 'lucide-react';
import Footer from '@/components/Footer';
import Link from 'next/link'

const  Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col"> 
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Predict Your Career's Future
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Leverage AI-powered insights to stay ahead in the evolving job market. Get real-time forecasts and skill demand analysis.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/dashboard" size="lg" className="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Get Started
                </Link>
                <Link href='#' size="lg" variant="outline" className="text-lg bg-transparent hover:bg-blue-500 text-blue-700 font-bold py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Watch Demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
              <p className="mt-4 text-xl text-gray-600">Powerful tools to guide your career decisions</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <LineChart className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Real-Time Forecasting</CardTitle>
                  <CardDescription>
                    Get up-to-date predictions on job market trends using advanced AI analytics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Stay ahead of market changes with our AI-powered predictive analytics that forecast industry trends and job demand.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <BarChart className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Skill Demand Analysis</CardTitle>
                  <CardDescription>
                    Identify high-demand skills in your industry
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Make informed decisions about your skill development with real-time insights into market demands.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Customized Reports</CardTitle>
                  <CardDescription>
                    Generate tailored reports for your specific needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Get detailed analysis reports customized to your industry, role, or geographic region.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Shape Your Future?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of professionals making data-driven career decisions.
            </p>
            <Link href='/dashboard' size="lg" className="text-lg bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded">
              Get Started
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;