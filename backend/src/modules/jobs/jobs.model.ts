import mongoose, { Schema, type Document } from 'mongoose'
import type { IJob, JobType, ExperienceLevel } from './jobs.types.ts'

export interface IJobDocument extends Omit<IJob, '_id'>, Document {}

const jobSchema = new Schema<IJobDocument>(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'] satisfies JobType[],
      required: [true, 'Job type is required'],
    },
    experienceLevel: {
      type: String,
      enum: ['entry', 'mid', 'senior', 'lead'] satisfies ExperienceLevel[],
      required: [true, 'Experience level is required'],
    },
    salaryMin: {
      type: Number,
      required: [true, 'Minimum salary is required'],
      min: [0, 'Salary cannot be negative'],
    },
    salaryMax: {
      type: Number,
      required: [true, 'Maximum salary is required'],
      min: [0, 'Salary cannot be negative'],
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },
    requirements: {
      type: [String],
      default: [],
    },
    recruiterId: {
      type: String,
      required: true,
    },
    recruiterName: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

// Index for search performance
jobSchema.index({ title: 'text', company: 'text', description: 'text' })
jobSchema.index({ recruiterId: 1 })
jobSchema.index({ isActive: 1, createdAt: -1 })

export const Job = mongoose.model<IJobDocument>('Job', jobSchema)