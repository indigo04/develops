"use client";

import { Meal } from "@/types/meal";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MealPage() {
  const [meal, setMeal] = useState<Meal>();
  const [recipes, setRecipes] = useState<Meal[]>();
  const pathname = usePathname();
  console.log(pathname);
  useEffect(() => {
    fetch(`http://localhost:3005/meals${pathname}`)
      .then((response) => response.json())
      .then((data) => setMeal(data.meals[0] || []))
      .catch((error) => console.error(error));

    fetch(`http://localhost:3005/meals?filter=category`)
      .then((response) => response.json())
      .then((data) => setRecipes(data.meals || []))
      .catch((error) => console.error(error));
  }, [pathname]);

  const ingr = [
    meal?.strIngredient1,
    meal?.strIngredient2,
    meal?.strIngredient3,
    meal?.strIngredient4,
    meal?.strIngredient5,
    meal?.strIngredient6,
    meal?.strIngredient7,
    meal?.strIngredient8,
    meal?.strIngredient9,
    meal?.strIngredient10,
    meal?.strIngredient11,
    meal?.strIngredient12,
    meal?.strIngredient13,
    meal?.strIngredient14,
    meal?.strIngredient15,
    meal?.strIngredient16,
    meal?.strIngredient17,
    meal?.strIngredient18,
    meal?.strIngredient19,
    meal?.strIngredient20,
  ];
  const visibleIngridients = ingr.filter(
    (el) => typeof el === "string" && el.length
  );

  return (
    <main>
      {meal && (
        <div className="flex flex-col xl:flex-row container mx-auto gap-5">
          <Image
            alt="image"
            width={300}
            height={300}
            className="w-75 h-75"
            src={meal.strMealThumb + "/small"}
          />
          <div className="flex flex-col w-[100%] xl:w-[50%]">
            <h1 className="text-2xl">{meal.strMeal}</h1>
            <Link href="/filter=country">{meal.strArea}</Link>
            <p>{meal.strInstructions}</p>
            <div className="flex gap-1">
              {visibleIngridients.map((el) => (
                <Link href={`/?filter=ingredient`} key={el} className="text-blue-400 underline">
                  {el?.length ? el : null},
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap w-[100%] xl:w-[25%]">
            {recipes?.map((el) => (
              <div key={meal.idMeal}>
                <Link href={`/?filter=category`}>
                  <Image
                    alt="image"
                    width={75}
                    height={75}
                    src={el.strMealThumb + "/small"}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
