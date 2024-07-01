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

const frameworks = [
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

export function DropDownSelect() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string[]>([])

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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[600px] justify-between"
        >
          {value.length > 0
            ? value.map(v => frameworks.find(f => f.value === v)?.label).join(", ")
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={onSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-green-600",
                      isSelected(framework.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}