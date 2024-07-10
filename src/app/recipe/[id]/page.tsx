'use client'

import { FC, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { TYPES } from '@/lib/config';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Flame,
  Salad,
  Sandwich,
  Apple
} from 'lucide-react';
import Image from 'next/image';


interface PageProps {
  params: {
    id: string;
  };
}

interface Ingredient {
  item: string;
  amount: string;
}

interface Instruction {
  step: string;
  timer: string;
  instruction: string;
}

interface Nutrition {
  calories: string;
  protein: string;
  carbohydrates: string;
  fat: string;
  fiber: string;
}

interface RecipeDetail {
  name: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutrition: Nutrition;
  facts: string[];
  similar_dishes: string[];
}

interface NutritionBoxProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const AnimatedLoading: FC = () => (
  <div className="flex flex-col justify-center items-center h-screen">
    <Image
      src="/chef_thinking.gif" // Replace this with your actual GIF URL
      alt="Loading animation"
      width={300}
      height={300}
    />
    <p className="mt-2 text-lg font-semibold text-gray-600">Preparing your recipe...</p>
  </div>
);

const NutritionBox: React.FC<NutritionBoxProps> = ({ icon, label, value }) => (
  <div className="bg-gray-100 p-3 rounded-lg flex flex-col items-center justify-center">
    {icon}
    <span className="text-sm font-semibold mt-1">{value}</span>
    <span className="text-xs text-gray-600">{label}</span>
  </div>
);

const RecipePage: FC<PageProps> = ({ params }) => {
  // Here you would typically fetch the recipe data based on the params.recipe
  // For demonstration, we're just using the param directly
  const { id } = params;
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Example of handling non-existent routes
  if (recipe?.name === 'not-found') {
    notFound();
  }

  useEffect(() => {
    const storedRecipe = localStorage.getItem('currentRecipe');
    if (storedRecipe) {
      setRecipe(JSON.parse(storedRecipe));

      const fetchRecipe = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('/api/generate-recipe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput: JSON.parse(storedRecipe), type: TYPES.GENERATE_RECIPE }),
          });

          if (!response.ok) {
            throw new Error('Failed to generate recipe');
          }

          const result = await response.json();
          const parsedRecipe = JSON.parse(result?.recipe)?.recipe_detail;
          if (parsedRecipe) {
            setRecipe(parsedRecipe);
          }
        } catch (error) {
          console.error('Error generating recipe:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchRecipe();
    } else {
      setIsLoading(false);
    }
  }, []);

  console.log(params, recipe);

  if (isLoading) {
    return <AnimatedLoading />;
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">{recipe?.name}</h1>

        {/* Ingredients */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Ingredients:</h2>
          <ul className="space-y-2">
            {recipe?.ingredients?.map((ingredient, index) => (
              <li key={index} className="flex items-center">
                <Checkbox id={`ingredient-${index}`} className="mr-2" />
                <label htmlFor={`ingredient-${index}`} className="text-sm">
                  {ingredient.amount} {ingredient.item}
                </label>
              </li>
            ))}
          </ul>
        </section>

        {/* Instructions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Instructions:</h2>
          <ol className="list-decimal list-inside space-y-4">
            {recipe?.instructions?.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">{instruction.step}.</span>
                <div>
                  <p>{instruction.instruction}</p>
                  <span className="text-sm text-gray-600 flex items-center mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {instruction.timer}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Nutrition Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Nutrition Information:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <NutritionBox icon={<Flame />} label="Calories" value={recipe?.nutrition?.calories ?? 'N/A'} />
            <NutritionBox icon={<Sandwich />} label="Protein" value={recipe?.nutrition?.protein ?? 'N/A'} />
            <NutritionBox icon={<Apple />} label="Carbs" value={recipe?.nutrition?.carbohydrates ?? 'N/A'} />
            <NutritionBox icon={<Salad />} label="Fat" value={recipe?.nutrition?.fat ?? 'N/A'} />
            <NutritionBox icon={<Apple />} label="Fiber" value={recipe?.nutrition?.fiber ?? 'N/A'} />
          </div>
        </section>

        {/* Facts */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Fun Facts:</h2>
          <ul className="list-disc list-inside space-y-2">
            {recipe?.facts?.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </section>

        {/* Similar Dishes */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Similar Dishes:</h2>
          <div className="flex flex-wrap gap-2">
            {recipe?.similar_dishes?.map((dish, index) => (
              <Badge key={index} variant="secondary">{dish}</Badge>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecipePage;