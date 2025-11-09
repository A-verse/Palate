import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function DELETE(request, { params }) {
  const supabase = createClient()
  const recipeId = params.id

  // 1. Check for an authenticated user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    // 2. Find the recipe
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    })

    if (!recipe) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 })
    }

    // 3. SECURITY: Ensure the user owns this recipe
    if (recipe.authorId !== user.id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    // 4. Delete the recipe
    await prisma.recipe.delete({
      where: { id: recipeId },
    })

    return NextResponse.json({ message: 'Recipe deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Failed to delete recipe:', error)
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
  }
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash, Loader2 } from 'lucide-react'

export default function DeleteRecipeButton({ recipeId }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleDelete = async () => {
    // 1. Ask for confirmation
    if (!window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // 2. Call the API route we just built
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to delete recipe')
      }

      // 3. Success: Redirect to the main recipes list
      router.push('/recipes')
      router.refresh() // Force a refresh of the recipes list
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 transition-colors bg-red-100 rounded-lg hover:bg-red-200 disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash className="w-4 h-4" />
        )}
        {isLoading ? 'Deleting...' : 'Delete Recipe'}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </>
  )
}