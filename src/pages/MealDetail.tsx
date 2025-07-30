import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Meal {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
}

const MealDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setMeal(data.meals[0]));
  }, [id]);

  if (!meal) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>
      <img
        src={meal.strMealThumb}
        alt={`Image of ${meal.strMeal}`}
        className="rounded-lg mb-4"
      />
      <p className="mb-4 whitespace-pre-line">{meal.strInstructions}</p>
      <a
        href={meal.strYoutube}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Watch on YouTube
      </a>
    </div>
  );
};

export default MealDetail;
