import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <Link
          key={cat.idCategory}
          to={`/category/${cat.strCategory}`}
          className="block border rounded-lg shadow-sm p-4 hover:shadow-md transition"
        >
          <img
            src={cat.strCategoryThumb}
            alt={cat.strCategory}
            className="rounded mb-2"
          />
          <h2 className="text-lg font-bold">{cat.strCategory}</h2>
          <p className="text-sm text-gray-600 line-clamp-3">
            {cat.strCategoryDescription}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
