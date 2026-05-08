import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: import.meta.env.VITE_APP_URL, // For reverse proxy, we are using frontend url, otherwise we have to put backend api url
  fetchOptions: {
    credentials: 'include',           // sends cookies
  },
  plugins: [inferAdditionalFields({ // additional field
      user: {
        role: {
          type: "string"
        }
      }
  })],
});

// Named exports for clean usage across components
export const { signIn, signUp, signOut, useSession } = authClient