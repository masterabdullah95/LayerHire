import mongoose, { Schema, type Document } from 'mongoose'
const recruiterSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    unique: true // One profile per recruiter
  },
  company: {
    type: String,
    required: false,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: false,
    maxlength: [5000, 'Description cannot exceed 5000 characters'],
  },
},
{
    timestamps: true,
});

export const Recruiter = mongoose.model('recruiter', recruiterSchema);