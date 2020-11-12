import { JobActionTypes } from './job.types';

const INITIAL_STATE = {
    jobs: [],
    loading: false,
    search: '',
    max: '4'
}

const jobReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case JobActionTypes.SET_JOBS:
            return {
                ...state,
                jobs: action.payload,
            }
        case JobActionTypes.TOGGLE_LOADING:
            return {
                ...state,
                loading: !state.loading
            }
        case JobActionTypes.GET_JOBS:
            return {
                ...state,
                search: action.payload
            }
        case JobActionTypes.SET_MAX:
            return {
                ...state,
                max: action.payload
            }
        default:
            return state;
    }
}


export default jobReducer;