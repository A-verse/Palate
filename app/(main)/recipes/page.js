import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import RecipeCard from '@/components/RecipeCard';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function RecipesPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Fetch all recipes for the currently logged-in user
  const recipes = await prisma.recipe.findMany({
    where: {
      authorId: user.id,
    },
    orderBy: {
      createdAt: 'desc', // Show newest recipes first
    },
  });

  return (
    <div className="container max-w-6xl px-4 py-12 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Recipes</h1>
          <p className="mt-1 text-gray-600">
            Your personal collection of culinary creations.
          </p>
        </div>
        <Link
          href="/recipes/new"
          className="flex items-center gap-2 px-4 py-2 font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Add New Recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="py-24 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">No recipes yet!</h2>
          <p className="mt-2 text-gray-500">
            Click the "Add New Recipe" button to save your first one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}