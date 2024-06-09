// app/api/refresh-token/route.ts

import { NextRequest, NextResponse } from 'next/server';
import NextCors from "nextjs-cors";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
    await NextCors(req, NextResponse, {
        origin: '*',
        methods: ['GET', 'POST', 'OPTIONS'],
        headers: ['Content-Type'],
    });
    const { refreshToken } = await req.json();

    const response = await fetch(`${BASE_URL}/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to refresh token' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
}
