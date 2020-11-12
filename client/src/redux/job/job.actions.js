import { JobActionTypes } from "./job.types";

export const setJobs = jobs => ({
    type: JobActionTypes.SET_JOBS,
    payload: jobs
})

export const toggleLoading = loading => ({
    type: JobActionTypes.TOGGLE_LOADING,
    
})

export const getJobs = search => ({
    type: JobActionTypes.GET_JOBS,
    payload: search
})

export const setMax = max => ({
    type: JobActionTypes.SET_MAX,
    payload: max
})