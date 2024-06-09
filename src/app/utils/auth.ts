// utils/auth.ts

import {AuthResponse} from "@/app/types/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function login(username: string, password: string): Promise<AuthResponse> {
    console.log(BASE_URL)
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email': username,
            'password': password,
            'twoFactorCode': "false",
            'twoFactorRecoveryCode': "false"
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to login');
    }

    const data: AuthResponse = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data;
}

export async function refreshToken(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    const response = await fetch(`${BASE_URL}/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }

    const data: AuthResponse = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data;
}
