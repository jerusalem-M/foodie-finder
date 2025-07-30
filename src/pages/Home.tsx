import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MealCard from "@/components/MealCard";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // track if user has searched

  // Fetch default meals on mount (e.g. by letter 'c')
  useEffect(() => {
    fetchMealsByLetter("c");
  }, []);

  // Fetch meals by first letter (for default load)
  const fetchMealsByLetter = async (letter: string) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
      );
      setMeals(res.data.meals || []);
    } catch (error) {
      console.error("Failed to fetch default meals", error);
      setMeals([]);
    } finally {
      setLoading(false);
      setSearched(false);
    }
  };

  // Fetch meals by search query
  const searchMeals = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      setMeals(res.data.meals || []);
    } catch (error) {
      console.error("Failed to search meals", error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Discover Meals</h2>

      {/* Search bar */}
      <div className="flex gap-2 mb-6 max-w-lg">
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 flex-grow"
          placeholder="Type a meal name (e.g. pasta)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMeals()}
        />
        <button
          onClick={searchMeals}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Search
        </button>
        <button
          onClick={() => fetchMealsByLetter("c")}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          title="Load default meals"
        >
          Reset
        </button>
      </div>

      {/* Meal results */}
      {loading ? (
        <p>Loading meals...</p>
      ) : meals.length === 0 && searched ? (
        <p>No meals found for "{query}".</p>
      ) : meals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {meals.map((meal) => (
            <Link to={`/meal/${meal.idMeal}`} key={meal.idMeal}>
              <MealCard meal={meal} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
