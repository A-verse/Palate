import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { ChefHat, Calendar, TrendingUp } from 'lucide-react';

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get stats
  const recipeCount = await prisma.recipe.count({
    where: { authorId: user.id },
  });

  const mealPlanCount = await prisma.mealPlan.count({
    where: { authorId: user.id },
  });

  // Get recent recipes
  const recentRecipes = await prisma.recipe.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  return (
    <div className="container max-w-6xl px-4 py-12 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.email}!</h1>
        <p className="mt-1 text-gray-600">
          Here's what's happening with your culinary journey.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ChefHat className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Recipes Saved</p>
              <p className="text-2xl font-bold text-gray-900">{recipeCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Meal Plans</p>
              <p className="text-2xl font-bold text-gray-900">{mealPlanCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">7 meals planned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Recipes</h2>
          {recentRecipes.length > 0 ? (
            <div className="space-y-4">
              {recentRecipes.map((recipe) => (
                <div key={recipe.id} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    {recipe.imageUrl ? (
                      <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <ChefHat className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{recipe.title}</h3>
                    <p className="text-sm text-gray-500">
                      {recipe.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    href={`/recipes/${recipe.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ChefHat className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No recipes yet. Start building your collection!</p>
              <Link
                href="/recipes/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Your First Recipe
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/recipes/new"
              className="block w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center font-medium"
            >
              Add New Recipe
            </Link>
            <Link
              href="/planner"
              className="block w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-center font-medium"
            >
              Plan This Week's Meals
            </Link>
            <Link
              href="/recipes"
              className="block w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-center font-medium"
            >
              Browse My Recipes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}