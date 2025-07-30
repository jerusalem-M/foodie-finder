import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const MealList = () => {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
      .then((res) => res.json())
      .then((data) => setMeals(data.meals));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {meals.map((meal) => (
        <Link key={meal.idMeal} to={`/meal/${meal.idMeal}`}>
          <Card className="hover:shadow-lg">
            <CardHeader>
              <CardTitle>{meal.strMeal}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded-md" />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default MealList;
