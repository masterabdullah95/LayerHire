import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  fetchOptions: {
    credentials: 'include',           // sends cookies
  },
})

// Named exports for clean usage across components
export const { signIn, signUp, signOut, useSession } = authClient