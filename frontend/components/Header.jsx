'use client';

import { useState } from 'react';
import Link from "next/link";
import { TrendingUp, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  const resources = [
    { title: "Documentation", href: "/docs" },
    { title: "API Reference", href: "/api" },
    { title: "Case Studies", href: "/cases" },
    { title: "Blog", href: "/blog" },
  ];

  const solutions = [
    { title: "Job Market Analysis", href: "/solutions/analysis" },
    { title: "Workforce Planning", href: "/solutions/planning" },
    { title: "Skill Gap Analysis", href: "/solutions/skills" },
    { title: "Industry Trends", href: "/solutions/trends" },
  ];

  if(isDashboard) return null;

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">JobForecast</span>
            <Badge variant="secondary" className="hidden sm:inline-flex">Beta</Badge>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-3 py-2 text-gray-600 hover:text-gray-900">
              Overview
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>Solutions</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {solutions.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/about" className="px-3 py-2 text-gray-600 hover:text-gray-900">
              About
            </Link>

            <Link href="/pricing" className="px-3 py-2 text-gray-600 hover:text-gray-900">
              Pricing
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>Resources</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {resources.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Start Free Trial</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                    Overview
                  </Link>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-500">Solutions</h3>
                    {solutions.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block text-gray-600 hover:text-gray-900"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                  <Link href="/features" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                    Features
                  </Link>
                  <Link href="/pricing" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                    Pricing
                  </Link>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-500">Resources</h3>
                    {resources.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block text-gray-600 hover:text-gray-900"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                  <div className="pt-4 space-y-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/sign-in" onClick={() => setIsOpen(false)}>Sign In</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href="/sign-up" onClick={() => setIsOpen(false)}>Start Free Trial</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}