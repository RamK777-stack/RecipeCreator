'use client'

import { DropDownSelect } from "@/components/ui/DropdownSelect";
import { useState } from "react";
import PersonalizationForm, { ExtendedFormValues, FormValues } from "./PersonalizationForm";
import { TYPES } from "@/lib/config";
import RecipeCardList from "./RecipeCardList";
import { ErrorResponse } from "@/app/api/generate-recipe/route";
import { useToast } from "@/components/ui/use-toast";

interface Recipe {
    id: string;
    name: string;
    description: string;
    key_ingredients: [];
    cooking_time: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    cuisine: string;
}

export default function Home() {

    const [value, setValue] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [personalizationFormOpen, setPersonalizationFormOpen] = useState<boolean>(true)
    const [recipeSuggestions, setRecipeSuggestions] = useState<Recipe[]>([])
    const { toast } = useToast();

    const onSelect = (selectedValue: string) => {
        setValue(prevValue => {
            if (prevValue.includes(selectedValue)) {
                return prevValue.filter(v => v !== selectedValue)
            } else {
                return [...prevValue, selectedValue]
            }
        })
    }

    const isSelected = (selectedValue: string) => {
        return value.includes(selectedValue)
    }

    const onSubmitForm = async (userInput: FormValues) => {

        const extendedUserInput: ExtendedFormValues = {
            ...userInput,
            ingredients: value,
        };

        setLoading(true);

        try {
            const response = await fetch('/api/generate-recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userInput: extendedUserInput, type: TYPES.RECIPE_SUGGESTION }),
            });

            if (!response.ok) {
                const errorData: ErrorResponse = await response.json();
                if (response.status === 429) {
                    const utcRetryTime = new Date(errorData.resetTime!);
                    // Format date and time
                    const formattedDateTime = utcRetryTime.toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    });

                    toast({
                        title: "Rate Limit Exceeded",
                        description: `Please try again after ${formattedDateTime}. Remaining requests: ${errorData.remaining}`,
                        variant: "destructive",
                    });
                    setLoading(false);
                    console.log(`Rate limit exceeded. Try again after ${errorData.resetTime}.`);
                } else {
                    toast({
                        title: "Error",
                        description: errorData.message,
                        variant: "destructive",
                    });
                    console.error('Error:', errorData.message);
                }
                return;
            }

            const result = await response.json();
            console.log(result.recipe)
            setLoading(false);
            setPersonalizationFormOpen(false)
            setRecipeSuggestions(JSON.parse(result?.recipe).recipe_suggestions)
            return result.recipe;
        } catch (error) {
            console.error('Error generating recipe:', error);
            setLoading(false);
            setPersonalizationFormOpen(true)
            return null;
        }
    }

    return (
        <div className="container mx-auto py-6 space-y-8">
            <div className="flex justify-center">
                <DropDownSelect value={value} isSelected={isSelected} onSelect={onSelect} />
            </div>
            <PersonalizationForm loading={loading} personalizationFormOpen={personalizationFormOpen} setPersonalizationFormOpen={setPersonalizationFormOpen} onSubmitForm={onSubmitForm} />

            {recipeSuggestions.length ? <RecipeCardList recipeSuggestions={recipeSuggestions} /> : null}
        </div>
    );
}
