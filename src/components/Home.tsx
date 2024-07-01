'use client'

import { DropDownSelect } from "@/components/ui/DropdownSelect";
import { useState } from "react";
import { Header } from "./Header";
import { Input } from "@/components/ui/input"
import PersonalizationForm from "./PersonalizationForm";

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

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="flex justify-center">
                <DropDownSelect value={value} isSelected={isSelected} onSelect={onSelect} />
            </div>
            <PersonalizationForm />
            <div className="flex justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white transition duration-300"> Generate </button>
            </div>
        </div>
    );
}
