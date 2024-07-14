'use client'

import React, { useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ingredients as initialIngredients } from "@/lib/config";

interface Props {
  value: string[];
  onSelect: (selectedValue: string) => void;
  isSelected: (value: string) => boolean;
}

export function DropDownSelect({ value, onSelect, isSelected }: Props) {
  const [open, setOpen] = useState(false);
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (currentValue: string) => {
    onSelect(currentValue);
    setSearchTerm("");
  };

  const addNewIngredient = () => {
    const newIngredient = {
      value: searchTerm.toLowerCase().replace(/\s+/g, "-"),
      label: searchTerm,
    };
    setIngredients([...ingredients, newIngredient]);
    handleSelect(newIngredient.value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[600px] justify-between"
        >
          {value.length > 0
            ? value
                .map((v) => ingredients.find((i) => i.value === v)?.label)
                .join(", ")
            : "Select Ingredients..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-0">
        <Command>
          <CommandInput 
            placeholder="Search Ingredient..." 
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            <CommandEmpty>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={addNewIngredient}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add "{searchTerm}" as a new ingredient
              </Button>
            </CommandEmpty>
            <CommandGroup>
              {ingredients.map((ingredient) => (
                <CommandItem
                  key={ingredient.value}
                  value={ingredient.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-green-600",
                      isSelected(ingredient.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {ingredient.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}