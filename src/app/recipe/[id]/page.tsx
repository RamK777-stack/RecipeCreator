'use client'

import { FC, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { TYPES } from '@/lib/config';

interface PageProps {
  params: {
    id: string;
  };
}

const RecipePage: FC<PageProps> = ({ params }) => {
  // Here you would typically fetch the recipe data based on the params.recipe
  // For demonstration, we're just using the param directly
  const { id } = params;
  const [recipe, setRecipe] = useState<any>(null);

  // Example of handling non-existent routes
  if (recipe?.name === 'not-found') {
    notFound();
  }

  useEffect(() => {
    const storedRecipe = localStorage.getItem('currentRecipe');
    if (storedRecipe) {
      setRecipe(JSON.parse(storedRecipe));

      const fetchRecipe = async () => {
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
          console.log(result.recipe);
          setRecipe(result.recipe);
        } catch (error) {
          console.error('Error generating recipe:', error);
        }
      };

      fetchRecipe();
    }
  }, []);

  console.log(params, recipe);

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
        <h1>Recipe: {recipe?.name}</h1>
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default RecipePage;