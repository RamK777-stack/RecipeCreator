import React from 'react';
import { Clock, Utensils, Globe, ChefHat } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface Recipe {
    name: string;
    description: string;
    key_ingredients: [];
    cooking_time: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    cuisine: string;
}

interface RecipeCardProps {
    recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => (
    <Card className="w-80 cursor-pointer">
        <CardHeader>
            <CardTitle className="text-xl font-bold">{recipe.name}</CardTitle>
            <p className="text-sm text-gray-500">{recipe.description}</p>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <ChefHat size={18} />
                    <h3 className="font-semibold">Key Ingredients:</h3>
                </div>
                <ul className="list-disc list-inside pl-5 space-y-1">
                    {recipe.key_ingredients.slice(0, 3).map((ingredient: string, index: number) => (
                        <li key={index} className="truncate">{ingredient}</li>
                    ))}
                </ul>
                <div className="flex justify-between text-sm text-gray-500 pt-4">
                    <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        <span> {recipe.cooking_time}</span>
                    </div>
                    <div className="flex items-center">
                        <Utensils size={16} className="mr-1" />
                        <span>{recipe.difficulty}</span>
                    </div>
                    <div className="flex items-center">
                        <Globe size={16} className="mr-1" />
                        <span>{recipe.cuisine}</span>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

interface RecipeCardListProps {
    recipeSuggestions: Recipe[]
}

const RecipeCardList: React.FC<RecipeCardListProps> = ({ recipeSuggestions }) => {
    console.log(recipeSuggestions)
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Recipe Suggestions</h1>
            <div className="grid grid-flow-col gap-3">
                {recipeSuggestions.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
        </div>)
};

export default RecipeCardList;