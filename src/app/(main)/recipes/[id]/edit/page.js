import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import EditRecipeForm from '@/components/EditRecipeForm' // We will create this next
import Link from 'next/link'

const prisma = new PrismaClient()

export default async function EditRecipePage({ params }) {
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
        <p className="mt-2 text-gray-600">You do not have permission to edit this recipe.</p>
        <Link href="/recipes" className="inline-block px-4 py-2 mt-4 text-white bg-green-600 rounded-lg">
          Back to My Recipes
        </Link>
      </div>
    )
  }

  // 4. Render the form, passing the recipe data to it
  return (
    <div className="container max-w-4xl px-4 py-12 mx-auto">
      <EditRecipeForm recipe={recipe} />
    </div>
  )
}
