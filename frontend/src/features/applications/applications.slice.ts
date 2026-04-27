import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IApplication } from './applications.types'

interface ApplicationsState {
  myApplications: IApplication[]
  recruiterApplications: IApplication[]
  isLoading: boolean
  error: string | null
  stats: {
    total: number
    pending: number
    reviewing: number
    accepted: number
    rejected: number
  }
}

const initialState: ApplicationsState = {
  myApplications: [],
  recruiterApplications: [],
  isLoading: false,
  error: null,
  stats: {
    total: 0,
    pending: 0,
    reviewing: 0,
    accepted: 0,
    rejected: 0,
  },
}

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setMyApplications(state, action: PayloadAction<IApplication[]>) {
      state.myApplications = action.payload
      state.isLoading = false
    },
    setRecruiterApplications(state, action: PayloadAction<IApplication[]>) {
      state.recruiterApplications = action.payload
      state.isLoading = false
    },
    updateApplicationStatus(
      state,
      action: PayloadAction<{ id: string; status: IApplication['status'] }>
    ) {
      const app = state.recruiterApplications.find(
        (a) => a._id === action.payload.id
      )
      if (app) app.status = action.payload.status
    },
    setStats(state, action: PayloadAction<ApplicationsState['stats']>) {
      state.stats = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

export const {
  setMyApplications,
  setRecruiterApplications,
  updateApplicationStatus,
  setStats,
  setLoading,
  setError,
} = applicationsSlice.actions

export default applicationsSlice.reducer