'use client'

import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import GoogleTranslate from './GoogleTranslate';
import { TooltipWrapper } from './ui/TooltipWrapper';

export function Header() {
    const router = useRouter()

    return (
        <header className="bg-white shadow-md p-3 sm:p-6">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center cursor-pointer" onClick={() => { router.push('/') }}>
                    <Image
                        src="/Chef.svg"
                        alt="Recipe Icon"
                        width={24}
                        height={24}
                        className="mr-2"
                    />
                    <h3 className="text-xl font-semibold">Recipe Creator</h3>
                </div>
                <div className="flex items-center space-x-4">
                    <TooltipWrapper tooltipContent="Coming soon">
                        <Button variant="default">Login</Button>
                    </TooltipWrapper>
                    <GoogleTranslate />
                </div>
            </div>
        </header>
    );
}
