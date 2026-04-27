import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IJob, JobFilters } from './jobs.types'

interface JobsState {
  jobs: IJob[]
  selectedJob: IJob | null
  total: number
  totalPages: number
  isLoading: boolean
  error: string | null
  filters: JobFilters
}

const initialState: JobsState = {
  jobs: [],
  selectedJob: null,
  total: 0,
  totalPages: 1,
  isLoading: false,
  error: null,
  filters: {
    page: 1,
    limit: 10,
  },
}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs(state, action: PayloadAction<{ jobs: IJob[]; total: number; totalPages: number }>) {
      state.jobs = action.payload.jobs
      state.total = action.payload.total
      state.totalPages = action.payload.totalPages
      state.isLoading = false
      state.error = null
    },
    setSelectedJob(state, action: PayloadAction<IJob | null>) {
      state.selectedJob = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.isLoading = false
    },
    setFilters(state, action: PayloadAction<JobFilters>) {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters(state) {
      state.filters = { page: 1, limit: 10 }
    },
  },
})

export const { setJobs, setSelectedJob, setLoading, setError, setFilters, resetFilters } = jobsSlice.actions
export default jobsSlice.reducer