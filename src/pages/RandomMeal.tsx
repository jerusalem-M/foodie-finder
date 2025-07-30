import React, { useEffect, useState } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  strArea: string;
}

const Random = () => {
  const [meal, setMeal] = useState<Meal | null>(null);

  const fetchRandomMeal = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((data) => setMeal(data.meals[0]));
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  if (!meal) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded" />
      <h1 className="text-2xl font-bold">{meal.strMeal}</h1>
      <p className="text-sm text-gray-500">
        {meal.strCategory} | {meal.strArea}
      </p>
      <p className="text-gray-700 whitespace-pre-line">{meal.strInstructions}</p>
      <button
        onClick={fetchRandomMeal}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Get Another Meal
      </button>
    </div>
  );
};

export default Random;
