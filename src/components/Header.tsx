import React from 'react';


export function Header() {
    return (
        <header className="bg-white shadow-md p-4 sm:p-6">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
                <h3 className="text-xl font-semibold mb-4 sm:mb-0">Recipe Creator</h3>
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white transition duration-300">
                    Login
                </button>
            </div>
        </header>
    );
}
