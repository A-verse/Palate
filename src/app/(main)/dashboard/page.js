import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // This is a failsafe, middleware should handle this.
    redirect('/login');
  }

  return (
    <div className="container max-w-4xl px-4 py-12 mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to your Dashboard</h1>
      <p className="mt-2 text-gray-600">
        You are logged in as: <span className="font-semibold text-green-600">{user.email}</span>
      </p>
      
      <div className="p-8 mt-8 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700">This is your personal space.</h2>
          <p className="mt-4 text-gray-500">
            From here, you will soon be able to manage your recipes, create meal plans, and track your nutritional goals. We're excited to have you on board!
          </p>
      </div>
    </div>
  );
}