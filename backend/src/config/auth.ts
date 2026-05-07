import { betterAuth } from 'better-auth'
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db();
import { env } from './env';

const isProduction = env.NODE_ENV === "production";  // true only in production

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,

  trustedOrigins: [
    env.CLIENT_URL, // "http://localhost:5173"
  ],

  cookie: {
    secure: true, // true only in production
    sameSite: "none", // or "strict" depending on needs
    domain: ".up.railway.app",
  },
  
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'seeker',         // 'seeker' | 'recruiter'
        input: true,                    // allow client to send this on signup
      },
    },
  },

  session: {
    // additionalFields: { // Additional fields for the session table
		// 	role: {
    //     type: 'string',
    //     defaultValue: 'seeker',         // 'seeker' | 'recruiter'
    //     input: true,                    // allow client to send this on signup
    //   }
		// },
    expiresIn: 60 * 60 * 24 * 7,       // 7 days
    updateAge: 60 * 60 * 24,           // refresh session if older than 1 day
  },
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user