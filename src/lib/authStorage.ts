// lib/authStorage.ts
const USER_KEY = 'auth_user';
const TOKEN_KEY = 'auth_token';
export const authStorage = {
    save(user: any, token: string) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        localStorage.setItem(TOKEN_KEY, token);
    },
    load(): { user: any | null; token: string | null } {
        const u = localStorage.getItem(USER_KEY);
        const t = localStorage.getItem(TOKEN_KEY);
        return { user: u ? JSON.parse(u) : null, token: t };
    },
    clear() {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
    },
    token(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },
}