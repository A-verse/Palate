'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import LogoutButton from './LogoutButton';
import { ChefHat, LayoutDashboard, BookOpen, Calendar } from 'lucide-react';

export default function Header() {
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (user) {
    return (
      <header className="glass-nav sticky top-0 z-50 border-b border-sage-200/30">
        <div className="container-luxury">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center group-hover:bg-sage-700 transition-colors">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-semibold text-charcoal-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Palate
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-2">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 px-4 py-2 text-charcoal-700 hover:text-sage-700 hover:bg-sage-50 rounded-lg transition-all duration-200"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link 
                href="/recipes" 
                className="flex items-center gap-2 px-4 py-2 text-charcoal-700 hover:text-sage-700 hover:bg-sage-50 rounded-lg transition-all duration-200"
              >
                <BookOpen className="w-4 h-4" />
                <span className="font-medium">My Recipes</span>
              </Link>
              <Link 
                href="/planner" 
                className="flex items-center gap-2 px-4 py-2 text-charcoal-700 hover:text-sage-700 hover:bg-sage-50 rounded-lg transition-all duration-200"
              >
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Meal Planner</span>
              </Link>
              <div className="ml-2">
                <LogoutButton />
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-sage-200/30">
      <div className="container-luxury">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center group-hover:bg-sage-700 transition-colors">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold text-charcoal-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Palate
            </span>
          </Link>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="px-5 py-2 text-charcoal-700 hover:text-sage-700 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="px-6 py-2.5 bg-sage-600 text-white rounded-lg hover:bg-sage-700 font-medium transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}