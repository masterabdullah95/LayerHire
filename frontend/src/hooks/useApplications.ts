import { useCallback } from 'react'
import api from '@/lib/axios'
import { useAppDispatch, useAppSelector } from '@/store/index'
import {
  setMyApplications,
  setRecruiterApplications,
  updateApplicationStatus,
  setStats,
  setLoading,
  setError,
} from '@/features/applications/applications.slice'
import type {
  CreateApplicationDTO,
  ApplicationStatus,
} from '@/features/applications/applications.types'

export const useApplications = () => {
  const dispatch = useAppDispatch()
  const { myApplications, recruiterApplications, isLoading, error, stats } =
    useAppSelector((s) => s.applications)

  const fetchMyApplications = useCallback(async () => {
    dispatch(setLoading(true))
    try {
      const { data } = await api.get('/applications/my')
      dispatch(setMyApplications(data.data))
    } catch {
      dispatch(setError('Failed to fetch your applications'))
    }
  }, [dispatch])

  const fetchRecruiterApplications = useCallback(
    async (jobId?: string) => {
      dispatch(setLoading(true))
      try {
        const params = jobId ? { jobId } : {}
        const { data } = await api.get('/applications/recruiter', { params })
        dispatch(setRecruiterApplications(data.data))
      } catch {
        dispatch(setError('Failed to fetch applications'))
      }
    },
    [dispatch]
  )

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await api.get('/applications/stats')
      dispatch(setStats(data.data))
    } catch {
      dispatch(setError('Failed to fetch stats'))
    }
  }, [dispatch])

  const applyToJob = useCallback(
    async (applicationData: CreateApplicationDTO) => {
      const { data } = await api.post('/applications', applicationData)
      return data.data
    },
    []
  )

  const changeStatus = useCallback(
    async (applicationId: string, status: ApplicationStatus) => {
      const { data } = await api.patch(
        `/applications/${applicationId}/status`,
        { status }
      )
      dispatch(updateApplicationStatus({ id: applicationId, status }))
      return data.data
    },
    [dispatch]
  )

  const checkHasApplied = useCallback(async (jobId: string) => {
    const { data } = await api.get(`/applications/check/${jobId}`)
    return data.data.hasApplied as boolean
  }, [])

  return {
    myApplications,
    recruiterApplications,
    isLoading,
    error,
    stats,
    fetchMyApplications,
    fetchRecruiterApplications,
    fetchStats,
    applyToJob,
    changeStatus,
    checkHasApplied,
  }
}