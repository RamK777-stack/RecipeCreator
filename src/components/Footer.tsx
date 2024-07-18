import React from 'react';

const Footer = () => {
    return (
        <footer className="bottom-0 left-0 w-full py-2 space-y-1 text-center text-sm text-gray-600">
            <div className="flex items-center justify-center">
                <span>Made with</span>
                <svg
                    className="mx-1 h-4 w-4 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                    />
                </svg>
                <span>by</span>
                <a href="https://x.com/ravancodes" target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-600 hover:text-blue-700 transition-colors underline cursor-pointer">
                    Ramkumar.barani
                </a>
            </div>
            <div className="flex items-center justify-center">
                <span>Read more</span>
                <a href="https://ramk.hashnode.dev/smart-meal-planner" target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-600 hover:text-blue-700 transition-colors underline cursor-pointer">
                    #AIForTomorrow
                </a>
            </div>
        </footer>
    );
};

export default Footer;