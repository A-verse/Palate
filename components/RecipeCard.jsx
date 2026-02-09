import Link from 'next/link';
import { Clock, ChefHat, ArrowRight } from 'lucide-react';

export default function RecipeCard({ recipe }) {
  return (
    <div className="group bento-card overflow-hidden hover:border-sage-200 hover:shadow-lg transition-all duration-300">
      <div className="aspect-[4/3] bg-sage-100 flex items-center justify-center overflow-hidden rounded-lg mb-4">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <ChefHat className="w-16 h-16 text-sage-400" />
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-charcoal-900 mb-2 group-hover:text-sage-700 transition-colors line-clamp-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {recipe.title}
        </h3>
        <p className="text-charcoal-600 mb-4 line-clamp-2 font-light text-sm leading-relaxed">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-sage-100">
          <div className="flex items-center text-charcoal-500 text-sm">
            <Clock className="w-4 h-4 mr-2 text-sage-600" />
            <span className="font-medium">{recipe.prepTime ? `${recipe.prepTime} min` : 'N/A'}</span>
          </div>

          <Link
            href={`/recipes/${recipe.id}`}
            className="flex items-center gap-1 text-sage-700 hover:text-sage-800 font-medium text-sm group/link"
          >
            View Recipe
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}