"use client";
import { Meal } from "@/types/meal";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Meals({ filter = '' }) {
  const [recipes, setRecipes] = useState<Meal[]>([]);
  useEffect(() => {
    fetch(
      filter
        ? `http://localhost:3005/meals?filter=${filter}`
        : "http://localhost:3005/meals"
    )
      .then((response) => response.json())
      .then((data) => setRecipes(data.meals || []))
      .catch((error) => console.error(error));
  }, [filter]);
  return (
    <main>
      <div className="flex gap-5 flex-wrap">
        {recipes.map((meal) => (
          <div className="mx-auto" key={meal.idMeal}>
            <h1 className="text-center">{meal.strMeal}</h1>
            <Link href={`/${meal.idMeal}`}>
              <Image
                alt="image"
                width={200}
                height={200}
                src={meal.strMealThumb + "/small"}
              />
            </Link>
            <div className="flex justify-between">
              <p>{meal.strCategory}</p>
              <p>{meal.strArea}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
