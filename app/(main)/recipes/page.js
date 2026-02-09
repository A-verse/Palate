import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import RecipeCard from '@/components/RecipeCard';
import { Plus, ChefHat } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function RecipesPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  let recipes = [];
  try {
    recipes = await prisma.recipe.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    // Database not configured
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-sage-50/20 py-12">
      <div className="container-luxury">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-light text-charcoal-900 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              My <span className="font-semibold italic text-sage-700">Recipe Collection</span>
            </h1>
            <p className="text-lg text-charcoal-600 font-light">
              Your personal culinary repertoire
            </p>
          </div>
          <Link
            href="/recipes/new"
            className="flex items-center gap-2 btn-primary"
          >
            <Plus className="w-5 h-5" />
            Add Recipe
          </Link>
        </div>

        {recipes.length === 0 ? (
          <div className="bento-card py-24 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-sage-100 rounded-full mb-6">
              <ChefHat className="w-10 h-10 text-sage-500" />
            </div>
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              No Recipes Yet
            </h2>
            <p className="text-charcoal-600 mb-8 font-light max-w-md mx-auto">
              Start building your culinary collection by adding your first recipe
            </p>
            <Link href="/recipes/new" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Your First Recipe
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}