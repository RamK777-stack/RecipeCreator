// app/api/generate-recipe/route.ts

import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { RECIPE_PROMPT } from '@/lib/config';


export async function POST(request: Request) {
    const body = await request.json();
    const { userInput } = body;

    if (!userInput) {
        return NextResponse.json({ message: 'User input is required' }, { status: 400 });
    }

    const apiKey = process.env["NEXT_PUBLIC_ANTHROPIC_API_KEY"];

    if (!apiKey) {
        console.error('Anthropic API key is not set');
        return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    const anthropic = new Anthropic({
        apiKey: apiKey,
    });

    const fullPrompt = RECIPE_PROMPT.replace('{{USER_INPUT}}', JSON.stringify(userInput));

    try {
        const response = await anthropic.messages.create({
            model: 'claude-3-haiku-20240307',
            max_tokens: 1500,
            temperature: 0.7,
            system: 'You are a sophisticated cooking assistant AI.',
            messages: [
                { role: 'user', content: fullPrompt }
            ]
        });

        const recipeText = response.content[0].type === 'text'
            ? response.content[0].text
            : 'Unable to generate recipe text';

        return NextResponse.json({ recipe: recipeText });
        
    } catch (error) {
        console.error('Error calling Claude API:', error);
        return NextResponse.json({ message: 'Error generating recipe' }, { status: 500 });
    }
}