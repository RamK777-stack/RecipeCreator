'use client'

import React from 'react';
import { Clock, Globe, ChefHat } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export interface Recipe {
    id: string;
    name: string;
    description: string;
    key_ingredients: [];
    cooking_time: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    cuisine: string;
}

interface RecipeCardProps {
    recipe: Recipe;
    handleClick: (recipe: Recipe) => void;
}

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
        case 'easy':
            return 'bg-green-100 text-green-800 hover:bg-green-200';
        case 'medium':
            return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
        case 'hard':
            return 'bg-red-100 text-red-800 hover:bg-red-200';
        default:
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, handleClick }) => {
    const difficultyColor = getDifficultyColor(recipe.difficulty);
    return (
        <Card className="w-full cursor-pointer flex flex-col h-full" onClick={() => handleClick(recipe)}>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold">{recipe.name}</CardTitle>
                    <Badge className={`ml-2 ${difficultyColor}`}>
                        {recipe.difficulty}
                    </Badge>
                </div>
                <p className="text-sm text-gray-500">{recipe.description}</p>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
                <div className="space-y-4 flex-grow">
                    <div className="flex items-center space-x-2">
                        <ChefHat size={18} />
                        <h3 className="font-semibold">Key Ingredients:</h3>
                    </div>
                    <ul className="list-disc list-inside pl-5 space-y-1">
                        {recipe.key_ingredients.slice(0, 3).map((ingredient: string, index: number) => (
                            <li key={index} className="truncate">{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-between text-sm text-gray-500 pt-4">
                    <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        <span>{recipe.cooking_time}</span>
                    </div>
                    <div className="flex items-center">
                        <Globe size={16} className="mr-1" />
                        <span>{recipe.cuisine}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
};


interface RecipeCardListProps {
    recipeSuggestions: Recipe[]
}

const RecipeCardList: React.FC<RecipeCardListProps> = ({ recipeSuggestions }) => {
    console.log(recipeSuggestions)
    const router = useRouter();

    const handleClick = (recipe: Recipe) => {
        localStorage.setItem('currentRecipe', JSON.stringify(recipe));
        router.push(`recipe/${recipe.id}`);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Recipe Suggestions</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipeSuggestions.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} handleClick={handleClick}/>
                ))}
            </div>
        </div>)
};

export default RecipeCardList;