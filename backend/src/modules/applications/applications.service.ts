import { Application } from './applications.model'
import { Job } from '../jobs/jobs.model'
import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db();

import type {
  CreateApplicationDTO,
  UpdateApplicationStatusDTO,
} from './applications.types.ts'
import { notificationsService } from '../notifications/notifications.service';


export const applicationsService = {
  /**
   * Seeker applies to a job.
   * resumeUrl is stored directly on the application document so
   * recruiters can access it later without a separate resume lookup.
   */
  async apply(
    data: CreateApplicationDTO,
    seekerId: string,
    seekerName: string,
    seekerEmail: string
  ) {
    // Check job exists
    const job = await Job.findById(data.jobId).lean()
    if (!job) throw new Error('Job not found')
    if (!job.isActive) throw new Error('This job is no longer accepting applications')

    // Check for duplicate application
    const existing = await Application.findOne({
      jobId: data.jobId,
      seekerId,
    })
    if (existing) throw new Error('You have already applied for this job')

    const application = await Application.create({
      ...data,
      jobTitle: job.title,
      company: job.company,
      recruiterId: job.recruiterId,
      seekerId,
      seekerName,
      seekerEmail,
    })

    return application
  },

  /**
   * Seeker views their own applications.
   */
  async getSeekerApplications(seekerId: string) {
    const applications = await Application.find({ seekerId })
      .sort({ createdAt: -1 })
      .lean()
    return applications
  },

  // Recruiter — get all applications for their jobs
  async getRecruiterApplications(recruiterId: string, jobId?: string) {
    const query: Record<string, unknown> = { recruiterId }
    if (jobId) query.jobId = jobId

    const applications = await Application.find(query)
      .sort({ createdAt: -1 })
      .lean()
    return applications
  },

  // Recruiter — update application status
  async updateStatus(
    applicationId: string,
    data: UpdateApplicationStatusDTO,
    recruiterId: string
  ) {
    const application = await Application.findById(applicationId)
    if (!application) throw new Error('Application not found')

    if (application.recruiterId !== recruiterId) {
      throw new Error('Forbidden — you can only update your own applications')
    }

    application.status = data.status
    await application.save()

    // Get seeker's Id from application
    const seekerId = application.seekerId

    // Get seeker's fcmToken from database
    try {
      const user = await db.collection("user").findOne({ _id: new ObjectId(seekerId) }, { projection: { fcmToken: 1 } });
      const fcmToken = user?.fcmToken;

      var title = '';
      var body = '';

      if (application.status === 'accepted') {
        title = `Your application "${application.jobTitle}" has been approved`;
        body = `Your application "${application.jobTitle}" has been approved. Please contact the recruiter for more information.`;
      }else if (application.status === 'rejected') {
        title = `Your application "${application.jobTitle}" has been rejected`;
        body = `Your application "${application.jobTitle}" has been rejected. Please contact the recruiter for more information.`;
      }else if (application.status === 'pending') {
        title = `Your application "${application.jobTitle}" is pending`;
        body = `Your application "${application.jobTitle}" is pending. Please contact the recruiter for more information.`;
      }else if (application.status === 'reviewing') {
        title = `Your application "${application.jobTitle}" is being reviewed`;
        body = `Your application "${application.jobTitle}" is being reviewed. Please contact the recruiter for more information.`;
      }
      
      if (fcmToken) {
        // Send push notification to seeker
        await notificationsService.sendPushNotification(fcmToken, title, body);
      }

    } catch (error) {
      console.error('Error getting user:', error)
      throw new Error('Cannot send push notification')
    }

    return application
  },

  // Check if seeker already applied to a job
  async hasApplied(jobId: string, seekerId: string) {
    const existing = await Application.findOne({ jobId, seekerId })
    return !!existing
  },

  // Recruiter — get application counts per job
  async getApplicationStats(recruiterId: string) {
    const stats = await Application.aggregate([
      { $match: { recruiterId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])

    const result = {
      total: 0,
      pending: 0,
      reviewing: 0,
      accepted: 0,
      rejected: 0,
    }

    for (const s of stats) {
      result[s._id as keyof typeof result] = s.count
      result.total += s.count
    }

    return result
  },
}