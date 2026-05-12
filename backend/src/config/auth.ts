import { betterAuth } from 'better-auth'
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db();
import { env } from './env';

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  advanced: {
    useSecureCookies: true,
    cookies: {
        session_token: {
            attributes: {
                sameSite: "None", // This fixes the 'Cross-Site' block
                secure: true,     // Required when sameSite is 'none'
                httpOnly: true,
            }
        },
        state: {
          attributes: {
              sameSite: "None",
              secure: true,
              httpOnly: true,
          }
        }
    }
  },
  trustedOrigins: [
    env.CLIENT_URL, 
  ],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
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