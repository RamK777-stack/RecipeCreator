"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const ingredients = [
  {
    value: "tomato",
    label: "Tomato",
  },
  {
    value: "potato",
    label: "Potato",
  },
  {
    value: "red_chilly",
    label: "Red chilly",
  },
  {
    value: "onion",
    label: "Onion",
  }
]

interface props {
  value: string[],
  onSelect: (selectedValue: string) => void,
  isSelected: (value: string) => Boolean
}

export function DropDownSelect({ value, onSelect, isSelected }: props) {
  const [open, setOpen] = React.useState(false)


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
            ? value.map(v => ingredients.find(i => i.value === v)?.label).join(", ")
            : "Select Ingredients..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-0">
        <Command>
          <CommandInput placeholder="Search Ingredient..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {ingredients.map((ingredient) => (
                <CommandItem
                  key={ingredient.value}
                  value={ingredient.value}
                  onSelect={onSelect}
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
  )
}