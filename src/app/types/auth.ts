// types/auth.ts

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
}

export interface PaginatedData<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}
