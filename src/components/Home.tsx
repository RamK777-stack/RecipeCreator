'use client'

import { DropDownSelect } from "@/components/ui/DropdownSelect";
import { useState } from "react";
import PersonalizationForm, { ExtendedFormValues, FormValues } from "./PersonalizationForm";
import { TYPES } from "@/lib/config";


export default function Home() {

    const [value, setValue] = useState<string[]>([])

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

        try {
            const response = await fetch('/api/generate-recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userInput: extendedUserInput, type: TYPES.RECIPE_SUGGESTION }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate recipe');
            }

            const result = await response.json();
            console.log(result.recipe)
            return result.recipe;
        } catch (error) {
            console.error('Error generating recipe:', error);
            return null;
        }
    }

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="flex justify-center">
                <DropDownSelect value={value} isSelected={isSelected} onSelect={onSelect} />
            </div>
            <PersonalizationForm onSubmitForm={onSubmitForm} />
        </div>
    );
}
