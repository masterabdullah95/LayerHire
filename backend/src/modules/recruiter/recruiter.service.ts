import { Recruiter } from './recruiter.model'
import type { RecruiterCompany } from './recruiter.types'
import type { SortOrder } from 'mongoose'

export const recruiterService = {

  async getRecruiterInfoById(id: string) {
    const recruiter = await Recruiter.findOne({userId: id})
    if (recruiter)
        return recruiter
    else
        return {company: '', description: ''}
  },

  async updateRecruiter(recruiterId: string, data: RecruiterCompany) {
    const recruiter = await Recruiter.findOne({userId: recruiterId})
    if (recruiter){
        try {
            const updated = await Recruiter.findByIdAndUpdate(recruiter._id, data, {
            new: true,
            runValidators: true,
            }).lean()
            return updated
        } catch (error) {
            throw new Error('Cannot update recruiter')
        }
    } else{
        try {
            const mydata = {
                userId: recruiterId,
                ...data
            }
            const recruiter = await Recruiter.create(mydata)
            return recruiter
        } catch (error) {
            throw new Error('Cannot create recruiter')
        }
    }
  }
}