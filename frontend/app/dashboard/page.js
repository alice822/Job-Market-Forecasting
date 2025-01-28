import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, TrendingUp, Users, Coins } from "lucide-react";

export default function DashboardPage() {
  const cards = [
    {
      title: "Total Industries",
      value: "10",
      icon: Building2,
      gradient: "from-blue-500 to-blue-600",
      iconColor: "text-blue-200"
    },
    {
      title: "Average Growth",
      value: "26%",
      icon: TrendingUp,
      gradient: "from-green-500 to-green-600",
      iconColor: "text-green-200"
    },
    {
      title: "Highest Demand",
      value: "AI & ML",
      icon: Users,
      gradient: "from-purple-500 to-purple-600",
      iconColor: "text-purple-200"
    },
    {
      title: "Top Salary",
      value: "₹30L",
      icon: Coins,
      gradient: "from-pink-500 to-pink-600",
      iconColor: "text-pink-200"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-90`} />
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{card.title}</CardTitle>
                <Icon className={`h-6 w-6 ${card.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-2xl font-bold text-white">{card.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}