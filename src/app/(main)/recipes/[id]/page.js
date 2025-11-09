import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import { Clock, Users, List, ChefHat, CheckSquare } from 'lucide-react'
import Link from 'next/link'

const prisma = new PrismaClient()

// This is the component for a single info box (e.g., Prep Time)
function InfoCard({ icon, label, value }) {
  if (!value) return null
  return (
    <div className="p-4 bg-green-50 rounded-lg">
      <div className="flex items-center gap-2 text-green-800">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="mt-1 text-lg font-bold text-gray-900">{value}</p>
    </div>
  )
}

export default async function RecipeDetailsPage({ params }) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // 1. Fetch the recipe by its ID
  const recipeId = params.id
  let recipe

  try {
    recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    })
  } catch (error) {
    console.error("Failed to fetch recipe:", error)
    return notFound() // Show a 404 page if fetching fails
  }

  // 2. Handle if recipe not found
  if (!recipe) {
    return notFound() // Show a 404 page
  }

  // 3. SECURITY: Ensure the logged-in user owns this recipe
  if (recipe.authorId !== user.id) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-2 text-gray-600">You do not have permission to view this recipe.</p>
        <Link href="/recipes" className="inline-block px-4 py-2 mt-4 text-white bg-green-600 rounded-lg">
          Back to My Recipes
        </Link>
      </div>
    )
  }

  // 4. Render the recipe details
  return (
    <div className="max-w-4xl px-4 py-12 mx-auto">
      <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="pb-6 border-b border-gray-200">
          <Link href="/recipes" className="text-sm text-green-600 hover:underline">
            &larr; Back to My Recipes
          </Link>
          <h1 className="mt-4 text-4xl font-bold text-gray-900">{recipe.title}</h1>
          {recipe.description && (
            <p className="mt-4 text-lg text-gray-600">{recipe.description}</p>
          )}
        </div>

        {/* Info Cards Section */}
        <div className="grid grid-cols-2 gap-4 my-6 md:grid-cols-4">
          <InfoCard
            icon={<Clock className="w-5 h-5" />}
            label="Prep Time"
            value={recipe.prepTime ? `${recipe.prepTime} min` : null}
          />
          <InfoCard
            icon={<ChefHat className="w-5 h-5" />}
            label="Cook Time"
            value={recipe.cookTime ? `${recipe.cookTime} min` : null}
          />
          <InfoCard
            icon={<Users className="w-5 h-5" />}
            label="Total Time"
            value={recipe.prepTime || recipe.cookTime ? `${(recipe.prepTime || 0) + (recipe.cookTime || 0)} min` : null}
          />
        </div>

        {/* Main Content: Ingredients & Instructions */}
        <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-3">
          {/* Ingredients List */}
          <div className="lg:col-span-1">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
              <List className="w-6 h-6 text-green-600" />
              Ingredients
            </h2>
            <ul className="mt-4 space-y-3">
              {recipe.ingredients.map((ing, index) => (
                <li key={index} className="flex items-start">
                  <CheckSquare className="w-5 h-5 mt-1 text-green-500 shrink-0" />
                  <span className="ml-3 text-gray-700">
                    <span className="font-semibold">{ing.amount}</span> {ing.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions List */}
          <div className="lg:col-span-2">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
              Instructions
            </h2>
            <ol className="mt-4 space-y-6">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex items-center justify-center w-8 h-8 font-bold text-green-700 bg-green-100 rounded-full shrink-0">
                    {index + 1}
                  </span>
                  <p className="ml-4 text-gray-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}