import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Users, 
  TrendingUp, 
  Shield, 
  Globe,
  CheckCircle2
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <BarChart className="w-6 h-6 text-blue-600" />,
      title: "Advanced Analytics",
      description: "Leverage cutting-edge machine learning models for accurate job market predictions"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Industry Insights",
      description: "Access detailed analysis across multiple sectors and regions"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      title: "Trend Tracking",
      description: "Monitor emerging job trends and skill requirements in real-time"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Data Security",
      description: "Enterprise-grade security protecting your sensitive workforce data"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <Badge className="mb-4 mx-auto" variant="secondary">Version 0.0</Badge>
          <CardTitle className="text-3xl font-bold text-gray-900">Job Forecast Manager</CardTitle>
          <p className="mt-2 text-gray-600">Transforming Workforce Planning with AI-Powered Insights</p>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-7">
              Job Forecast Manager is a state-of-the-art platform designed to revolutionize how businesses 
              and individuals approach workforce planning. By combining advanced analytics with intuitive 
              interfaces, we provide unprecedented insight into job market trends and future opportunities.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Features Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {feature.icon}
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <Card className="mt-12 max-w-4xl mx-auto">
        <CardContent className="pt-6">
          <Tabs defaultValue="mission" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mission">Our Mission</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
            </TabsList>
            <TabsContent value="mission">
              <Card>
                <CardHeader>
                  <CardTitle>Empowering Better Decisions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-7">
                    Our mission is to democratize access to job market intelligence. We believe that 
                    better data leads to better decisions, and better decisions lead to more 
                    prosperous communities. By providing accurate, actionable insights, we help 
                    organizations and individuals navigate the rapidly evolving employment landscape.
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Key Objectives:</h4>
                    <ul className="space-y-2">
                      {['Enhance workforce planning accuracy', 'Reduce hiring uncertainties', 'Promote skill development'].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="technology">
              <Card>
                <CardHeader>
                  <CardTitle>Cutting-Edge Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-7">
                    Our platform leverages the latest advancements in artificial intelligence and 
                    machine learning to process vast amounts of employment data. We use sophisticated 
                    algorithms to identify patterns, predict trends, and generate actionable insights.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Data Processing</h4>
                      <p className="text-sm text-gray-600">Real-time analysis of millions of data points</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Prediction Models</h4>
                      <p className="text-sm text-gray-600">Advanced ML models with 95% accuracy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="impact">
              <Card>
                <CardHeader>
                  <CardTitle>Making a Difference</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-7">
                    Our platform has helped thousands of organizations optimize their workforce 
                    planning and individuals make informed career decisions. We're proud to be 
                    part of building a more efficient and equitable job market.
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">10+</div>
                      <div className="text-sm text-gray-600">Organizations Served</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">1000+</div>
                      <div className="text-sm text-gray-600">Predictions Generated</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">95%</div>
                      <div className="text-sm text-gray-600">Accuracy Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="mt-12 max-w-4xl mx-auto bg-blue-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900">
              Ready to Transform Your Workforce Planning?
            </h3>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Join thousands of organizations already benefiting from our AI-powered insights
              and predictive analytics.
            </p>
            <div className="mt-6 space-x-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
               Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
                Watch Demo
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-center text-sm text-gray-500">
          <Globe className="w-4 h-4 mr-2" /> Available worldwide | <Shield className="w-4 h-4 mx-2" /> Enterprise-grade security
        </CardFooter>
      </Card>
    </div>
  );
}