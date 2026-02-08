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

    const { mealPlanId, recipeId, dayOfWeek, mealType } = await request.json();

    // Verify the meal plan belongs to the user
    const mealPlan = await prisma.mealPlan.findUnique({
      where: { id: mealPlanId },
    });

    if (!mealPlan || mealPlan.authorId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if there's already a meal for this slot
    const existingMeal = await prisma.mealPlanRecipe.findUnique({
      where: {
        mealPlanId_dayOfWeek_mealType: {
          mealPlanId,
          dayOfWeek,
          mealType,
        },
      },
    });

    if (existingMeal) {
      // Update existing meal
      await prisma.mealPlanRecipe.update({
        where: { id: existingMeal.id },
        data: { recipeId },
      });
    } else {
      // Create new meal
      await prisma.mealPlanRecipe.create({
        data: {
          mealPlanId,
          recipeId,
          dayOfWeek,
          mealType,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding meal to plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}