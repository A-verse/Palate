import { createClient } from '@/lib/supabase/server';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { Clock, ChefHat } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function RecipePage({ params }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const recipe = await prisma.recipe.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!recipe || recipe.authorId !== user.id) {
    return (
      <div className="container max-w-4xl px-4 py-12 mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Recipe not found</h1>
          <p className="mt-2 text-gray-600">The recipe you're looking for doesn't exist or you don't have permission to view it.</p>
          <Link href="/recipes" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl px-4 py-12 mx-auto">
      <div className="mb-8">
        <Link href="/recipes" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Recipes
        </Link>
        <h1 className="text-4xl font-bold text-gray-900">{recipe.title}</h1>
        {recipe.description && (
          <p className="mt-2 text-lg text-gray-600">{recipe.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {recipe.imageUrl && (
            <div className="mb-8">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <ChefHat className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipe Details</h3>
            <div className="space-y-3">
              {recipe.prepTime && (
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Prep: {recipe.prepTime} min</span>
                </div>
              )}
              {recipe.cookTime && (
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Cook: {recipe.cookTime} min</span>
                </div>
              )}
              {(recipe.prepTime || recipe.cookTime) && (
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Total: {(recipe.prepTime || 0) + (recipe.cookTime || 0)} min</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link
                href={`/recipes/${recipe.id}/edit`}
                className="w-full block text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Edit Recipe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}