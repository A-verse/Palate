            
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server'; // Import the new SERVER client
import LogoutButton from './LogoutButton'; // Import our new client component

// Reusing the same Logo component for consistency
const Logo = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
      <path d="M15.5 8.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM12 14c-2.33 0-4.31 1.46-5.11 3.5h10.22c-.8-2.04-2.78-3.5-5.11-3.5z" fill="currentColor"/>
    </svg>
);


// The Header is now an async component
export default async function Header() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
          <span className="text-xl font-bold text-gray-800">NutriVerse</span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          {user ? (
            // If the user is logged in, show their email and a Logout button
            <div className="flex items-center space-x-4">
               <span className="hidden text-sm text-gray-600 sm:block">{user.email}</span>
               <LogoutButton />
            </div>
          ) : (
            // If the user is not logged in, show Login and Sign Up buttons
            <>
              <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-green-600">
                Log in
              </Link>
              <Link href="/signup" className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

