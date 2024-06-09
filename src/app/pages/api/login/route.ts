// app/api/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import NextCors from 'nextjs-cors';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
    await NextCors(req, NextResponse, {
        origin: '*',
        methods: ['GET', 'POST', 'OPTIONS'],
        headers: ['Content-Type'],
    });
    const { username, password } = await req.json();

    console.log(process.env)

    const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to authenticate' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
}

export async function OPTIONS() {
    return new NextResponse(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
