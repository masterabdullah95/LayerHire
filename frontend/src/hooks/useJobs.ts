import { useCallback } from 'react'
import api from '@/lib/axios'
import { useAppDispatch, useAppSelector } from '@/store/index'
import { setJobs, setSelectedJob, setLoading, setError, setFilters } from '@/features/jobs/jobs.slice'
import type { JobFilters, JobsResponse, IJob } from '@/features/jobs/jobs.types'

export const useJobs = () => {
  const dispatch = useAppDispatch()
  const { jobs, selectedJob, total, totalPages, isLoading, error, filters } =
    useAppSelector((s) => s.jobs)

  const fetchJobs = useCallback(async (newFilters?: JobFilters) => {
    dispatch(setLoading(true))
    try {
      const params = { ...filters, ...newFilters }
      const { data } = await api.get<{ data: JobsResponse }>('/jobs', { params })
      dispatch(setJobs({
        jobs: data.data.jobs,
        total: data.data.total,
        totalPages: data.data.totalPages,
      }))
      if (newFilters) dispatch(setFilters(newFilters))
    } catch {
      dispatch(setError('Failed to fetch jobs'))
    }
  }, [dispatch, filters])

  const fetchJobById = useCallback(async (id: string) => {
    dispatch(setLoading(true))
    try {
      const { data } = await api.get<{ data: IJob }>(`/jobs/${id}`)
      dispatch(setSelectedJob(data.data))
    } catch {
      dispatch(setError('Failed to fetch job'))
    }
    dispatch(setLoading(false))
  }, [dispatch])

  const createJob = useCallback(async (jobData: Omit<IJob, '_id' | 'recruiterId' | 'recruiterName' | 'isActive' | 'createdAt' | 'updatedAt'>) => {
    const { data } = await api.post<{ data: IJob }>('/jobs', jobData)
    return data.data
  }, [])

  const updateJob = useCallback(async (id: string, jobData: Omit<IJob, '_id' | 'recruiterId' | 'recruiterName' | 'isActive' | 'createdAt' | 'updatedAt'>) => {
    const { data } = await api.put<{ data: IJob }>(`/jobs/${id}`, jobData)
    dispatch(setSelectedJob(data.data))
    return data.data
  }, [dispatch])

  const deleteJob = useCallback(async (id: string) => {
    await api.delete(`/jobs/${id}`)
    await fetchJobs()
  }, [fetchJobs])

  return {
    jobs,
    selectedJob,
    total,
    totalPages,
    isLoading,
    error,
    filters,
    fetchJobs,
    fetchJobById,
    createJob,
    deleteJob,
    updateJob,
  }
}