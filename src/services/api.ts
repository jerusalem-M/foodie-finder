import axios from "axios";

export async function fetchMealsByFirstLetter(letter: string) {
  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  return response.data.meals;
}

export async function fetchMealById(id: string) {
  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return response.data.meals[0];
}
