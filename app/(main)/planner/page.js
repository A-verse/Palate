import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import MealPlanner from '@/components/MealPlanner';

const prisma = new PrismaClient();

export default async function PlannerPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Get current week's meal plan or create one
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Monday
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
  endOfWeek.setHours(23, 59, 59, 999);

  let mealPlan = await prisma.mealPlan.findFirst({
    where: {
      authorId: user.id,
      startDate: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
    include: {
      recipes: {
        include: {
          recipe: true,
        },
      },
    },
  });

  if (!mealPlan) {
    mealPlan = await prisma.mealPlan.create({
      data: {
        name: `Week of ${startOfWeek.toLocaleDateString()}`,
        startDate: startOfWeek,
        endDate: endOfWeek,
        authorId: user.id,
      },
      include: {
        recipes: {
          include: {
            recipe: true,
          },
        },
      },
    });
  }

  // Get user's recipes for the sidebar
  const recipes = await prisma.recipe.findMany({
    where: {
      authorId: user.id,
    },
    orderBy: {
      title: 'asc',
    },
  });

  return (
    <div className="container max-w-7xl px-4 py-12 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Meal Planner</h1>
        <p className="mt-1 text-gray-600">
          Plan your weekly meals with drag-and-drop simplicity.
        </p>
      </div>

      <MealPlanner mealPlan={mealPlan} recipes={recipes} />
    </div>
  );
}