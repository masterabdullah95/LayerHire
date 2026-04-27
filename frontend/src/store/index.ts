import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import authReducer from '../features/auth/auth.slice'
import jobsReducer from '@/features/jobs/jobs.slice'
import applicationsReducer from '@/features/applications/applications.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    applications: applicationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Typed hooks — use these instead of raw useDispatch/useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(fn: (state: RootState) => T) =>
  useSelector<RootState, T>(fn)