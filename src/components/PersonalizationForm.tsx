import React from 'react';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxItemProps {
    id: string;
    label: string;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ id, label }) => (
    <div className="flex items-center space-x-2">
        <Checkbox id={id} />
        <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            {label}
        </label>
    </div>
);

const PersonalizationForm = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
            <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    Servings
                </h2>
                <Input type="number" defaultValue="4" className="w-24" />
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
                            <CheckboxItem id="vegetarian" label="vegetarian" />
                            <CheckboxItem id="vegan" label="vegan" />
                            <CheckboxItem id="gluten-free" label="gluten-free" />
                            <CheckboxItem id="other-diet" label="Other" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium mb-4">Flavour</h3>
                        <div className="flex flex-col space-y-4">
                            <CheckboxItem id="sweet" label="Sweet" />
                            <CheckboxItem id="spicy" label="Spicy (heat)" />
                            <CheckboxItem id="fruity" label="Fruity" />
                            <CheckboxItem id="other-flavor" label="Other" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-medium mb-4">Allergies and ingredient exclusions</h3>
                <Input placeholder="Enter allergies or ingredients to exclude" className="w-full" />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <h3 className="font-medium mb-4">Preferred cuisines</h3>
                    <div className="flex flex-col space-y-4">
                        <CheckboxItem id="indian" label="Indian" />
                        <CheckboxItem id="italian" label="Italian" />
                        <CheckboxItem id="mexican" label="Mexican" />
                        <CheckboxItem id="other-cuisine" label="Other" />
                    </div>
                </div>
                <div>
                    <h3 className="font-medium mb-4">Texture Preferences</h3>
                    <div className="flex flex-col space-y-4">
                        <CheckboxItem id="gravy" label="Gravy" />
                        <CheckboxItem id="semi-gravy" label="Semi gravy" />
                        <CheckboxItem id="dry" label="Dry" />
                        <CheckboxItem id="crispy" label="Crispy" />
                        <CheckboxItem id="other-texture" label="Other" />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-medium mb-4">Available cooking time (in minutes)</h3>
                <Input type="text" placeholder="Enter available cooking time" className="w-full" />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h3 className="font-medium mb-4">Nutritional goals</h3>
                    <div className="flex flex-col space-y-4">
                        <CheckboxItem id="low-calorie" label="low-calorie" />
                        <CheckboxItem id="high-protein" label="high-protein" />
                        <CheckboxItem id="high-carbs" label="high-carbs" />
                        <CheckboxItem id="other-nutrition" label="Other" />
                    </div>
                </div>
                <div>
                    <h3 className="font-medium mb-4">Cooking Method Preferences</h3>
                    <div className="flex flex-col space-y-4">
                        <CheckboxItem id="grilled" label="Grilled" />
                        <CheckboxItem id="roasted" label="Roasted" />
                        <CheckboxItem id="fried" label="Fried" />
                        <CheckboxItem id="deep-fried" label="Deep-fried" />
                        <CheckboxItem id="other-cooking" label="Other" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalizationForm;