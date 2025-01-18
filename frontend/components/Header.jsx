import { Button } from "./ui/button";
import { TrendingUp } from "lucide-react";

export default function Header() {
    return (
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold">JobForecast</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Solutions</Button>
              <Button variant="ghost">Pricing</Button>
              <Button variant="ghost">About</Button>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Sign In</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </header>
    );
  };