import mongoose, { Schema, type Document } from 'mongoose'
import type { IApplication, ApplicationStatus } from './applications.types.ts'

export interface IApplicationDocument
  extends Omit<IApplication, '_id'>,
    Document {}

const applicationSchema = new Schema<IApplicationDocument>(
  {
    jobId: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    seekerId: {
      type: String,
      required: true,
    },
    seekerName: {
      type: String,
      required: true,
    },
    seekerEmail: {
      type: String,
      required: true,
    },
    recruiterId: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
      required: [true, 'Cover letter is required'],
      maxlength: [2000, 'Cover letter cannot exceed 2000 characters'],
    },
    resumeUrl: { // Stores the Supabase public URL of the seeker's uploaded resume
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'accepted', 'rejected'] satisfies ApplicationStatus[],
      default: 'pending',
    },
  },
  { timestamps: true }
)

// Prevent duplicate applications
applicationSchema.index({ jobId: 1, seekerId: 1 }, { unique: true })

// Fast lookup indexes
applicationSchema.index({ seekerId: 1, createdAt: -1 })
applicationSchema.index({ recruiterId: 1, createdAt: -1 })
applicationSchema.index({ jobId: 1, createdAt: -1 })

export const Application = mongoose.model<IApplicationDocument>(
  'Application',
  applicationSchema
)