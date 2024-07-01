import React from 'react';
import { Button } from './ui/button';


export function Header() {
    return (
        <header className="bg-white shadow-md p-4 sm:p-6">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
                <h3 className="text-xl font-semibold mb-4 sm:mb-0">Recipe Creator</h3>
                <Button size={"sm"} >Login</Button>
            </div>
        </header>
    );
}
