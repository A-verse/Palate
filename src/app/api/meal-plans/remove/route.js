import { createClient } from '@/lib/supabase/server';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { mealPlanRecipeId } = await request.json();

    // Find the meal plan recipe and verify ownership
    const mealPlanRecipe = await prisma.mealPlanRecipe.findUnique({
      where: { id: mealPlanRecipeId },
      include: {
        mealPlan: true,
      },
    });

    if (!mealPlanRecipe || mealPlanRecipe.mealPlan.authorId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete the meal plan recipe
    await prisma.mealPlanRecipe.delete({
      where: { id: mealPlanRecipeId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing meal from plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}