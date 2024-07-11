import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';


export function Header() {
    return (
        <header className="bg-white shadow-md p-3 sm:p-6">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center">
                    <Image
                        src="/Chef.svg"
                        alt="Recipe Icon"
                        width={24}
                        height={24}
                        className="mr-2"
                    />
                    <h3 className="text-xl font-semibold">Recipe Creator</h3>
                </div>
                <Button size="sm">Login</Button>
            </div>
        </header>
    );
}
