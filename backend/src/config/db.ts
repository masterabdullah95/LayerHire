import mongoose from 'mongoose'
import { env } from './env'

export const connectDB = async (): Promise<void> => {
  const uri = env.MONGO_URI
  if (!uri) throw new Error('MONGO_URI is not defined')

  try {
    await mongoose.connect(env.MONGO_URI)
    console.log('✓ MongoDB connected')
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error)
    process.exit(1)   // kill the process — no point running without a DB
  }
}