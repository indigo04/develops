"use client";

import Meals from "../meals/meals";
import { useRouter, useSearchParams } from "next/navigation";

export enum Filter {
  category = "category",
  country = "country",
  ingredient = "ingredient",
}

export default function Home() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const router = useRouter();

  const toggleOption = (option: Filter) => {
    if (filter === option) {
      router.push('/')
    } else {
      router.push(`/?filter=${option}`);
    }
  };

  return (
    <main className="container mx-auto">
      <h1>Recipies</h1>
      <div className="flex gap-5 items-center mb-5">
        <button
          className={
            filter === Filter.category
              ? "flex border-2 border-gray-900 rounded-sm p-2 cursor-pointer bg-amber-300"
              : "flex border-2 border-gray-900 rounded-sm p-2 cursor-pointer"
          }
          onClick={() => toggleOption(Filter.category)}
        >
          Category
        </button>
        <button
          className={
            filter === Filter.country
              ? "flex border-2 border-gray-900 rounded-sm p-2 cursor-pointer bg-amber-300"
              : "flex border-2 border-gray-900 rounded-sm p-2 cursor-pointer"
          }
          onClick={() => toggleOption(Filter.country)}
        >
          Country
        </button>
        <button
          className={
            filter === Filter.ingredient
              ? "flex border-2 border-gray-900 rounded-sm p-2 cursor-pointer bg-amber-300"
              : "flex border-2 border-gray-900 rounded-sm p-2 cursor-pointer"
          }
          onClick={() => toggleOption(Filter.ingredient)}
        >
          Ingredient
        </button>
      </div>
      <Meals filter={filter ? filter : ''}/>
    </main>
  );
}
