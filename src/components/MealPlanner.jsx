'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = ['Breakfast', 'Lunch', 'Dinner'];

export default function MealPlanner({ mealPlan, recipes }) {
  const [draggedRecipe, setDraggedRecipe] = useState(null);

  const getMealForDayAndType = (dayIndex, mealType) => {
    return mealPlan.recipes.find(
      (mr) => mr.dayOfWeek === dayIndex && mr.mealType === mealType
    );
  };

  const handleDragStart = (recipe) => {
    setDraggedRecipe(recipe);
  };

  const handleDrop = async (dayIndex, mealType) => {
    if (!draggedRecipe) return;

    try {
      const response = await fetch('/api/meal-plans/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mealPlanId: mealPlan.id,
          recipeId: draggedRecipe.id,
          dayOfWeek: dayIndex,
          mealType,
        }),
      });

      if (response.ok) {
        // Refresh the page to show updated plan
        window.location.reload();
      }
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  const handleRemoveMeal = async (mealPlanRecipeId) => {
    try {
      const response = await fetch('/api/meal-plans/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mealPlanRecipeId,
        }),
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error removing meal:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Meal Plan Grid */}
      <div className="lg:col-span-3">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-4 font-semibold text-gray-900 bg-gray-50"></div>
            {DAYS.map((day) => (
              <div key={day} className="p-4 font-semibold text-gray-900 bg-gray-50 text-center">
                {day}
              </div>
            ))}
          </div>

          {MEALS.map((mealType) => (
            <div key={mealType} className="grid grid-cols-8 border-b border-gray-200 last:border-b-0">
              <div className="p-4 font-medium text-gray-700 bg-gray-50 flex items-center">
                {mealType}
              </div>
              {DAYS.map((_, dayIndex) => {
                const meal = getMealForDayAndType(dayIndex, mealType.toLowerCase());
                return (
                  <div
                    key={`${mealType}-${dayIndex}`}
                    className="p-4 border-l border-gray-200 min-h-[120px] bg-white hover:bg-gray-50 transition-colors"
                    onDrop={() => handleDrop(dayIndex, mealType.toLowerCase())}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {meal ? (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 relative group">
                        <button
                          onClick={() => handleRemoveMeal(meal.id)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-red-600 hover:bg-red-100 rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <h4 className="font-medium text-blue-900 text-sm mb-1">{meal.recipe.title}</h4>
                        <p className="text-xs text-blue-700 line-clamp-2">{meal.recipe.description}</p>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm flex items-center justify-center h-full">
                        <Plus className="w-4 h-4 mr-1" />
                        Drop recipe here
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Recipes Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Recipes</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                draggable
                onDragStart={() => handleDragStart(recipe)}
                className="p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
              >
                <h4 className="font-medium text-gray-900 text-sm mb-1">{recipe.title}</h4>
                <p className="text-xs text-gray-600 line-clamp-2">{recipe.description}</p>
              </div>
            ))}
            {recipes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No recipes yet.</p>
                <a href="/recipes/new" className="text-blue-600 hover:text-blue-800 text-sm">
                  Create your first recipe
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}