import React from 'react';
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

// Define the schema for form validation
const formSchema = z.object({
    servings: z.number().min(1).max(10),
    dietaryRestrictions: z.array(z.string()).default([]),
    flavors: z.array(z.string()).default([]),
    allergies: z.string().optional(),
    preferredCuisines: z.array(z.string()).default([]),
    texturePreferences: z.array(z.string()).default([]),
    cookingTime: z.number().min(5).max(180),
    nutritionalGoals: z.array(z.string()).default([]),
    cookingMethods: z.array(z.string()).default([]),
});

export type FormValues = z.infer<typeof formSchema>;
export type ExtendedFormValues = FormValues & { ingredients: string[] };


interface CheckboxItemProps {
    control: UseFormReturn<FormValues>['control'];
    name: keyof FormValues;
    label: string;
}

interface PersonalizationFormProps {
    onSubmitForm: (userInput: FormValues) => void
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ control, name, label }) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                    <Checkbox
                        checked={(field.value as string[])?.includes(label)}
                        onCheckedChange={(checked) => {
                            return checked
                                ? field.onChange([...((field.value as string[]) || []), label])
                                : field.onChange(((field.value as string[]) || []).filter((value) => value !== label));
                        }}
                    />
                </FormControl>
                <FormLabel className="font-normal">{label}</FormLabel>
            </FormItem>
        )}
    />
);

const PersonalizationForm: React.FC<PersonalizationFormProps> = ({ onSubmitForm }) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            servings: 4,
            dietaryRestrictions: [],
            flavors: [],
            allergies: "",
            preferredCuisines: [],
            texturePreferences: [],
            cookingTime: 30,
            nutritionalGoals: [],
            cookingMethods: [],
        },
    });

    const onSubmit = async (userInput: FormValues) => {
        onSubmitForm(userInput)
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        Servings
                    </h2>
                    <FormField
                        control={form.control}
                        name="servings"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} className="w-24" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        Personalization
                    </h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-medium mb-4">Dietary restrictions</h3>
                            <div className="flex flex-col space-y-4">
                                <CheckboxItem control={form.control} name="dietaryRestrictions" label="vegetarian" />
                                <CheckboxItem control={form.control} name="dietaryRestrictions" label="vegan" />
                                <CheckboxItem control={form.control} name="dietaryRestrictions" label="gluten-free" />
                                <CheckboxItem control={form.control} name="dietaryRestrictions" label="Other" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium mb-4">Flavour</h3>
                            <div className="flex flex-col space-y-4">
                                <CheckboxItem control={form.control} name="flavors" label="Sweet" />
                                <CheckboxItem control={form.control} name="flavors" label="Spicy (heat)" />
                                <CheckboxItem control={form.control} name="flavors" label="Fruity" />
                                <CheckboxItem control={form.control} name="flavors" label="Other" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-medium mb-4">Allergies and ingredient exclusions</h3>
                    <FormField
                        control={form.control}
                        name="allergies"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="Enter allergies or ingredients to exclude" className="w-full" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <h3 className="font-medium mb-4">Preferred cuisines</h3>
                        <div className="flex flex-col space-y-4">
                            <CheckboxItem control={form.control} name="preferredCuisines" label="Indian" />
                            <CheckboxItem control={form.control} name="preferredCuisines" label="Italian" />
                            <CheckboxItem control={form.control} name="preferredCuisines" label="Mexican" />
                            <CheckboxItem control={form.control} name="preferredCuisines" label="Other" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium mb-4">Texture Preferences</h3>
                        <div className="flex flex-col space-y-4">
                            <CheckboxItem control={form.control} name="texturePreferences" label="Gravy" />
                            <CheckboxItem control={form.control} name="texturePreferences" label="Semi gravy" />
                            <CheckboxItem control={form.control} name="texturePreferences" label="Dry" />
                            <CheckboxItem control={form.control} name="texturePreferences" label="Crispy" />
                            <CheckboxItem control={form.control} name="texturePreferences" label="Other" />
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-medium mb-4">Available cooking time (in minutes)</h3>
                    <FormField
                        control={form.control}
                        name="cookingTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} placeholder="Enter available cooking time" className="w-full" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-medium mb-4">Nutritional goals</h3>
                        <div className="flex flex-col space-y-4">
                            <CheckboxItem control={form.control} name="nutritionalGoals" label="low-calorie" />
                            <CheckboxItem control={form.control} name="nutritionalGoals" label="high-protein" />
                            <CheckboxItem control={form.control} name="nutritionalGoals" label="high-carbs" />
                            <CheckboxItem control={form.control} name="nutritionalGoals" label="Other" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium mb-4">Cooking Method Preferences</h3>
                        <div className="flex flex-col space-y-4">
                            <CheckboxItem control={form.control} name="cookingMethods" label="Grilled" />
                            <CheckboxItem control={form.control} name="cookingMethods" label="Roasted" />
                            <CheckboxItem control={form.control} name="cookingMethods" label="Fried" />
                            <CheckboxItem control={form.control} name="cookingMethods" label="Deep-fried" />
                            <CheckboxItem control={form.control} name="cookingMethods" label="Other" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-10">
                    <Button type="submit" size={"lg"} >Generate</Button>
                </div>
            </form>
        </Form>
    );
};

export default PersonalizationForm;