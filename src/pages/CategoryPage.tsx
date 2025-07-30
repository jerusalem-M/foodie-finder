import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MealCard from "@/components/MealCard";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryName) return;

    const fetchMealsByCategory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
        );
        setMeals(res.data.meals || []);
      } catch (error) {
        console.error("Error fetching meals by category", error);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMealsByCategory();
  }, [categoryName]);

  if (loading) return <p className="p-4">Loading meals for {categoryName}...</p>;
  if (!meals.length) return <p className="p-4">No meals found for {categoryName}.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{categoryName} Meals</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {meals.map((meal) => (
          <Link to={`/meal/${meal.idMeal}`} key={meal.idMeal}>
            <MealCard meal={meal} />
          </Link>
        ))}
      </div>
    </div>
  );
}
