'use client';

import { useState } from 'react';
import Link from "next/link";
import { TrendingUp, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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


  if (isDashboard) return null;

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

            <Link href="/about" className="px-3 py-2 text-gray-600 hover:text-gray-900">
              About
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className='bg-purple-700 ' asChild>
              <Link href="/dashboard">Get Started</Link>
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
                  <Link href="/about" className="px-3 py-2 text-gray-600 hover:text-gray-900">
                    About
                  </Link>
                  <div className="pt-4 space-y-4">
                    <Button className="w-full" asChild>
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>Get Started</Link>
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