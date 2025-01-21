'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small teams",
      price: isAnnual ? "₹999" : "₹99",
      period: isAnnual ? "/year" : "/month",
      features: [
        "Basic job market analytics",
        "Single industry tracking",
        "Monthly trend reports",
        "Email support",
        "1 user account"
      ],
      popular: false,
      buttonText: "Start Free Trial"
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses",
      price: isAnnual ? "₹4,999" : "₹499",
      period: isAnnual ? "/year" : "/month",
      features: [
        "Advanced analytics dashboard",
        "Multi-industry tracking",
        "Weekly trend reports",
        "Priority email support",
        "Custom alerts",
        "Up to 5 user accounts",
        "API access"
      ],
      popular: true,
      buttonText: "Get Started"
    },
    {
      name: "Enterprise",
      description: "For large organizations and corporations",
      price: "Custom",
      period: "",
      features: [
        "Full analytics suite",
        "Unlimited industry tracking",
        "Real-time reports",
        "24/7 priority support",
        "Custom integrations",
        "Unlimited user accounts",
        "Dedicated account manager",
        "Custom ML models"
      ],
      popular: false,
      buttonText: "Contact Sales"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Transparent Pricing for Every Need
        </h1>
        <p className="text-gray-600 mb-8">
          Choose the perfect plan to unlock powerful job market insights
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4">
          <span className={`text-sm ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly billing
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <span className={`text-sm ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Annual billing
            <Badge variant="secondary" className="ml-2">
              Save 20%
            </Badge>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <Card 
            key={index}
            className={`relative ${
              plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Badge className="bg-blue-500 text-white">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-400 ml-2 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Learn more about {feature}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full ${
                  plan.popular ? 'bg-blue-500 hover:bg-blue-600' : ''
                }`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid gap-6">
          {[
            {
              q: "Can I change plans later?",
              a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards, UPI, and bank transfers for enterprise plans."
            },
            {
              q: "Is there a free trial available?",
              a: "Yes, we offer a 14-day free trial for all plans. No credit card required."
            }
          ].map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center mt-16">
        <p className="text-gray-600">
          Need help choosing the right plan?{" "}
          <Button variant="link" className="text-blue-500 hover:text-blue-600">
            Contact our sales team
          </Button>
        </p>
      </div>
    </div>
  );
}