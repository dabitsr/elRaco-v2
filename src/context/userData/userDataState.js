import React, { useReducer } from "react"
import userDataContext from "./userDataContext"
import userDataReducer from "./userDataReducer"
import {
  CREATE_SCHEDULE,
  GET_SUBJECT_NOTICES,
  GET_SUBJECT_NOTICES_ERROR,
  GET_SUBJECT_NOTICES_CORRECT,
} from "../../types"
import Axios from "axios"
import { useContext } from "react"
import { firebaseContext } from "../firebase/firebaseState"

const UserDataState = props => {
  const initialState = {
    schedule: {},
    subjectNotices: [],
    loading: false,
    error: false,
  }

  const [state, dispatch] = useReducer(userDataReducer, initialState)
  const { fb } = useContext(firebaseContext)

  //=======================
  //||  Create Schedule  ||
  //=======================
  const createScheduleAction = async (user, colors) => {
    let s
    if (fb && fb.active) s = await fb.getSchedule()
    if (s) dispatch(createSchedule(s))
    else if (user && user.schedule && user.schedule.results) {
      console.log(user.schedule)
      let newSchedule = {}
      let secondHour = {}
      let data = {}
      user.schedule.results.map(subject => {
        const {
          inici,
          durada,
          grup,
          codi_assig,
          aules,
          tipus,
          dia_setmana,
        } = subject

        data = {
          hour: inici,
          duration: durada,
          group: grup,
          subject: codi_assig,
          room: aules,
          type: tipus,
        }

        secondHour =
          durada === 2
            ? {
                [`${inici[0]}${(parseInt(inici[1]) + 1).toString()}:00`]: {
                  ...data,
                  color: colors[codi_assig],
                },
              }
            : null

        newSchedule = {
          ...newSchedule,
          [dia_setmana]: {
            ...newSchedule[dia_setmana],
            [inici]: {
              ...data,
              color: colors[codi_assig],
            },
            ...secondHour,
          },
        }
      })
      dispatch(createSchedule(newSchedule))
      if (fb && fb.active) fb.setSchedule(newSchedule)
      console.log(newSchedule)
    }
  }

  const createSchedule = newSchedule => ({
    type: CREATE_SCHEDULE,
    payload: newSchedule,
  })

  //===========================
  //||  GET SUBJECT NOTICES  ||
  //===========================
  const getSubjectNoticesAction = async subjectCode => {
    let notices = {}
    let token = localStorage.getItem("token")
    dispatch(getSubjectNotices(true))
    try {
      notices = await Axios({
        method: "GET",
        url: "https://api.fib.upc.edu/v2/jo/avisos/",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      notices = notices.data.results.filter(
        notice => notice.codi_assig === subjectCode
      )
      dispatch(getSubjectNoticesCorrect(notices))

      return notices
    } catch (error) {
      console.log(error)
      dispatch(getSubjectNoticesError(true))
    }
  }

  const getSubjectNotices = loading => ({
    type: GET_SUBJECT_NOTICES,
    payload: loading,
  })
  const getSubjectNoticesCorrect = notices => ({
    type: GET_SUBJECT_NOTICES_CORRECT,
    payload: notices,
  })
  const getSubjectNoticesError = error => ({
    type: GET_SUBJECT_NOTICES_ERROR,
    payload: error,
  })
  return (
    <userDataContext.Provider
      value={{
        //Aquí atributos para exportar
        schedule: state.schedule,
        subjectNotices: state.subjectNotices,
        loading: state.loading,

        //Aquí funciones para exportar
        createScheduleAction,
        getSubjectNoticesAction,
      }}
    >
      {props.children}
    </userDataContext.Provider>
  )
}

export default UserDataState
