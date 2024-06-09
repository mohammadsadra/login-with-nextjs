// utils/api.ts

import {refreshToken} from "@/app/utils/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchWithToken<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('No access token available');
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        await refreshToken();
        return fetchWithToken<T>(endpoint, options);
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return response.json();
}
