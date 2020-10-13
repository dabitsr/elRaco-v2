import React, { useReducer, useContext, useState, useEffect } from "react"
import userDataContext from "./userDataContext"
import userDataReducer from "./userDataReducer"
import authContext from "../auth/authContext"
import {
  CREATE_SCHEDULE,
  GET_SUBJECT_NOTICES,
  GET_SUBJECT_NOTICES_ERROR,
  GET_SUBJECT_NOTICES_CORRECT,
} from "../../types"
import Axios from "axios"
import { firebaseContext } from "../firebase/firebaseState"

const UserDataState = props => {
  const initialState = {
    schedule: null,
    subjectNotices: [],
    loading: false,
    error: false,
  }

  const { accessToken } = useContext(authContext)
  const [token, saveToken] = useState(null)

  const [state, dispatch] = useReducer(userDataReducer, initialState)
  const { fb } = useContext(firebaseContext)

  //=======================
  //||  Create Schedule  ||
  //=======================

  const isFirebaseActiveAndNotUserSchedule = user => {
    return fb && fb.active && !user.schedule ? true : false
  }

  const userScheduleAndResultsExists = user => {
    return user && user.schedule && user.schedule.results ? true : false
  }
  const userScheduleExists = user => {
    return user && user.schedule ? true : false
  }
  const isFirebaseActive = () => {
    return fb && fb.active ? true : false
  }

  const obtenerHorarioFormateado = (user, colors) => {
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

      if (durada === 2) {
        let inici0 = inici[0],
          inici1
        if (inici[1] === "9") {
          inici0 = (parseInt(inici[0]) + 1).toString()
          inici1 = "0"
        } else inici1 = (parseInt(inici[1]) + 1).toString()

        secondHour = {
          [`${inici0}${inici1}:00`]: {
            ...data,
            color: colors[codi_assig],
          },
        }
      } else secondHour = null

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
    return newSchedule
  }
  const actualizarColoresSchedule = (newSchedule, colors) => {
    Object.keys(newSchedule).map(d => {
      let day = newSchedule[d]
      Object.keys(day).map(hour => {
        day[hour].color = colors[day[hour].subject]
      })
    })
    return newSchedule
  }

  const createScheduleAction = async (user, colors) => {
    let userFirebaseSchedule
    let newSchedule = {}

    if (isFirebaseActiveAndNotUserSchedule(user))
      userFirebaseSchedule = await fb.getSchedule()

    if (userFirebaseSchedule) {
      dispatch(createSchedule(userFirebaseSchedule))
    } else if (userScheduleAndResultsExists(user)) {
      newSchedule = obtenerHorarioFormateado(user, colors)
      dispatch(createSchedule(newSchedule))

      if (isFirebaseActive()) fb.setSchedule(newSchedule)
    } else if (userScheduleExists(user)) {
      newSchedule = actualizarColoresSchedule(user.schedule, colors)
      dispatch(createSchedule(newSchedule))

      if (isFirebaseActive()) fb.setSchedule(newSchedule)
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

  useEffect(() => {
    if (accessToken) saveToken(accessToken.token)
  }, [accessToken])

  async function solicitarAvisosUsuario() {
    return Axios({
      method: "GET",
      url: "https://api.fib.upc.edu/v2/jo/avisos/",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  }

  const getSubjectNoticesAction = async subjectCode => {
    let notices = {}

    dispatch(getSubjectNotices(true))
    try {
      notices = await solicitarAvisosUsuario()
      notices = notices.data.results.filter(
        notice => notice.codi_assig === subjectCode
      )
      notices.sort(
        (a, b) => new Date(b.data_modificacio) - new Date(a.data_modificacio)
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
