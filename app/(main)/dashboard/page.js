import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { ChefHat, Calendar, BookOpen, Plus, ArrowRight, Sparkles } from 'lucide-react';

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  let recipeCount = 0;
  let mealPlanCount = 0;
  let recentRecipes = [];

  try {
    recipeCount = await prisma.recipe.count({
      where: { authorId: user.id },
    });

    mealPlanCount = await prisma.mealPlan.count({
      where: { authorId: user.id },
    });

    recentRecipes = await prisma.recipe.findMany({
      where: { authorId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 4,
    });
  } catch (error) {
    // Database not configured yet - show empty state
  }

  const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'Chef';

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-sage-50/20 py-12">
      <div className="container-luxury">
        <div className="mb-12">
          <h1 className="text-5xl font-light text-charcoal-900 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Welcome back, <span className="font-semibold italic text-sage-700">{userName}</span>
          </h1>
          <p className="text-lg text-charcoal-600 font-light">
            Your culinary journey continues
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bento-card group hover:border-sage-200 cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-sage-100 rounded-xl group-hover:bg-sage-600 transition-colors duration-300">
                <BookOpen className="w-6 h-6 text-sage-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-3xl font-light text-charcoal-900">{recipeCount}</span>
            </div>
            <h3 className="text-sm font-medium text-charcoal-600 uppercase tracking-wide">Recipes Saved</h3>
          </div>

          <div className="bento-card group hover:border-sage-200 cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-sage-100 rounded-xl group-hover:bg-sage-600 transition-colors duration-300">
                <Calendar className="w-6 h-6 text-sage-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-3xl font-light text-charcoal-900">{mealPlanCount}</span>
            </div>
            <h3 className="text-sm font-medium text-charcoal-600 uppercase tracking-wide">Meal Plans</h3>
          </div>

          <Link href="/recipes/new" className="bento-card group hover:border-sage-300 hover:bg-sage-50/50 cursor-pointer md:col-span-2">
            <div className="flex items-center justify-between h-full">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-900 mb-2">Create New Recipe</h3>
                <p className="text-sm text-charcoal-600 font-light">Add to your collection</p>
              </div>
              <div className="p-4 bg-sage-600 rounded-xl group-hover:bg-sage-700 transition-colors">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bento-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-charcoal-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Recent Recipes
              </h2>
              <Link href="/recipes" className="text-sage-700 hover:text-sage-800 text-sm font-medium flex items-center gap-1">
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {recentRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentRecipes.map((recipe) => (
                  <Link
                    key={recipe.id}
                    href={`/recipes/${recipe.id}`}
                    className="group flex items-start gap-4 p-4 rounded-xl hover:bg-sage-50/50 transition-all duration-300 border border-transparent hover:border-sage-200"
                  >
                    <div className="w-16 h-16 bg-sage-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {recipe.imageUrl ? (
                        <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
                      ) : (
                        <ChefHat className="w-7 h-7 text-sage-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-charcoal-900 group-hover:text-sage-700 transition-colors line-clamp-2">
                        {recipe.title}
                      </h3>
                      <p className="text-sm text-charcoal-500 mt-1">
                        {recipe.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-sage-100 rounded-full mb-6">
                  <ChefHat className="w-10 h-10 text-sage-500" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal-900 mb-2">No Recipes Yet</h3>
                <p className="text-charcoal-600 mb-6 font-light">Start building your culinary collection</p>
                <Link href="/recipes/new" className="btn-primary inline-flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Create Your First Recipe
                </Link>
              </div>
            )}
          </div>

          <div className="bento-card">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-sage-600" />
              <h2 className="text-2xl font-semibold text-charcoal-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Quick Actions
              </h2>
            </div>
            <div className="space-y-3">
              <Link
                href="/recipes/new"
                className="group block w-full px-5 py-4 bg-sage-600 text-white rounded-xl hover:bg-sage-700 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Add Recipe</span>
                  <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
              </Link>
              <Link
                href="/planner"
                className="group block w-full px-5 py-4 bg-white border-2 border-sage-200 text-sage-700 rounded-xl hover:bg-sage-50 hover:border-sage-300 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Meal Planner</span>
                  <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
              </Link>
              <Link
                href="/recipes"
                className="group block w-full px-5 py-4 bg-white border-2 border-sage-200 text-sage-700 rounded-xl hover:bg-sage-50 hover:border-sage-300 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Browse Recipes</span>
                  <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}