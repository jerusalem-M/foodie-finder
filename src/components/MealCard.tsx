interface MealCardProps {
  meal: {
    strMeal: string;
    strMealThumb: string;
  };
}

export default function MealCard({ meal }: MealCardProps) {
  return (
    <div className="rounded-2xl shadow-md hover:shadow-xl transition">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="rounded-t-2xl w-full h-48 object-cover"
      />
      <div className="p-4 text-center">
        <h2 className="font-semibold text-lg">{meal.strMeal}</h2>
      </div>
    </div>
  );
}
