import {
  CREATE_SCHEDULE,
  GET_SUBJECT_NOTICES,
  GET_SUBJECT_NOTICES_CORRECT,
  GET_SUBJECT_NOTICES_ERROR,
} from "../../types"

export default (state, action) => {
  switch (action.type) {
    case CREATE_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
      }

    case GET_SUBJECT_NOTICES:
      return {
        ...state,
        loading: action.payload,
      }
    case GET_SUBJECT_NOTICES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case GET_SUBJECT_NOTICES_CORRECT:
      return {
        ...state,
        loading: false,
        subjectNotices: action.payload,
      }
    default:
      return state
  }
}
