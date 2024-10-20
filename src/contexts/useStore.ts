import { create } from "zustand";

type AuthState = {
    accessToken: string | null
    setAccessToken: (token: string) => void
    clearAccessToken: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: typeof window !== 'undefined' ? localStorage.getItem('jwt_access_token') : null,
    setAccessToken: (token) => set({ accessToken: token }),
    clearAccessToken: () => set({ accessToken: null })
}))