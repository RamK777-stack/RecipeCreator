// app/api/generate-recipe/route.ts

import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { RECIPE_PROMPT, RECIPE_SUGGESTION_PROMPT, REGENERATE_WITH_ALTERNATE_INGREDIENTS, TYPES } from '@/lib/config';
import { rateLimit, getRemainingRequests, getResetTime } from '@/lib/utils';

export interface ErrorResponse {
    message: string;
    remaining?: number;
    resetTime?: string | null;
}

export async function POST(request: Request) {
    // Get the client's IP address
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

    // Check rate limit
    if (!rateLimit(ip)) {
        const remaining = getRemainingRequests(ip);
        console.log("Remaining", remaining)
        const resetTime = getResetTime(ip);
        return NextResponse.json({ 
            message: 'Rate limit exceeded', 
            remaining,
            resetTime
        }, { status: 429 });
    }

    const body = await request.json();
    const { userInput, type, ingredientToReplace, alternativeIngredient = 'Suggest something else' } = body;

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

    let fullPrompt;
    if (type === TYPES.GENERATE_RECIPE) {
        fullPrompt = RECIPE_PROMPT.replace('{{USER_INPUT}}', JSON.stringify(userInput));
    } else if (type === TYPES.RECIPE_SUGGESTION) {
        fullPrompt = RECIPE_SUGGESTION_PROMPT.replace('{{USER_INPUT}}', JSON.stringify(userInput));
    } else if (type === TYPES.REGENERATE_WITH_ALTERNATE_INGREDIENTS) {
        fullPrompt = REGENERATE_WITH_ALTERNATE_INGREDIENTS
            .replace('{{RECIPE_JSON}}', JSON.stringify(userInput))
            .replace('{{INGREDIENT_TO_REPLACE}}', JSON.stringify(ingredientToReplace))
            .replace('{{ALTERNATIVE_INGREDIENT}}', JSON.stringify(alternativeIngredient));
    } else {
        return NextResponse.json({ message: 'Invalid type specified' }, { status: 400 });
    }

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

        const remaining = getRemainingRequests(ip);
        return NextResponse.json({ recipe: recipeText, remaining });

    } catch (error) {
        console.error('Error calling Claude API:', error);
        return NextResponse.json({ message: 'Error generating recipe' }, { status: 500 });
    }
}