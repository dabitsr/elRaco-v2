import React, { createContext, useContext, useEffect, useState } from "react"
import { firebaseContext } from "../firebase/firebaseState"
import { createBrowserHistory as createHistory } from "history"
import Axios from "axios"
import window from "global"
import authContext from "./authContext"
import { useTranslation } from "react-i18next"

export default function AuthState({ children }) {
  const { fb, addUser } = useContext(firebaseContext)
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [url, setUrl] = useState(null)
  const history = createHistory()
  const { t } = useTranslation()

  useEffect(() => {
    let a = window.location.search.substring(1).split("&")
    let code
    a.map(i =>
      i.substr(0, 4) === "code" ? (code = i.substr(5, i.length)) : null
    )

    if (typeof window !== "undefined" && sessionStorage.getItem("token"))
      setAccessToken(JSON.parse(sessionStorage.getItem("token")))
    else if (code) {
      getToken(code)
    }
  }, [])

  const getToken = async code => {
    console.log(code)
    try {
      let token = await Axios({
        url: "https://api.fib.upc.edu/v2/o/token",
        params: {
          grant_type: "authorization_code",
          redirect_uri: process.env.REACT_APP_REDIRECT_URI,
          code: code,
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
        },
        method: "POST",
      }).then(res => ({
        token: res.data.access_token,
        expires: res.data.expires_in,
        refreshToken: res.data.refresh_token,
      }))

      if (typeof window !== "undefined") {
        sessionStorage.setItem("token", JSON.stringify(token))
      }
      setAccessToken(token)
    } catch (e) {
      handleError()
      console.log(e)
    }
  }

  const handleError = () => {
    alert("Error getting data! Redirecting to login...")
    setUrl("/login")
  }

  useEffect(() => {
    console.log(accessToken)
    if (accessToken) {
      getUser(accessToken.token)
    }
  }, [accessToken])

  const getUser = async token => {
    setLoading(true)

    setStatus(`${t("Getting")} ${t("user info")}...`)
    let me = await Axios({
      method: "GET",
      url: "https://api.fib.upc.edu/v2/jo/",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 1800,
    })
      .then(res => res.data)
      .catch(e => {
        console.log(e)
        handleError()
      })
    console.log(me)
    if (me) addUser(me)
  }

  useEffect(() => {
    if (!user && fb && fb.active && accessToken) {
      getData()
    }
  }, [fb, accessToken])

  const getSubjects = async token => {
    setStatus(`${t("Getting")} ${t("subjects")}...`)
    let subjects = await Axios({
      method: "GET",
      url: "https://api.fib.upc.edu/v2/jo/assignatures/",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.data)
      .catch(e => {
        handleError()
        console.log(e)
      })
    return subjects
  }

  const getSchedule = async token => {
    setStatus(`${t("Getting")} ${t("schedule")}...`)
    let schedule = await Axios({
      method: "GET",
      url: "https://api.fib.upc.edu/v2/jo/classes/",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.data)
      .catch(e => {
        console.log(e)
        handleError()
      })
    return schedule
  }

  const getNotifications = async token => {
    setStatus(`${t("Getting")} ${t("notifications")}...`)
    console.log("GETTING NOTS...")
    let notifications = await Axios({
      method: "GET",
      url: "https://api.fib.upc.edu/v2/jo/avisos/",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.data)
      .catch(e => {
        console.log(e)
        handleError()
      })
    return notifications
  }

  const getData = async () => {
    var { token } = accessToken
    var schedule
    if (fb) schedule = await fb.getSchedule()
    else {
      addUser({ username: user.username, name: user.nom })
      return
    }
    let photo = `https://api.fib.upc.edu/v2/jo/foto.jpg?access_token=${token}`

    let subjects = await getSubjects(token)

    if (!schedule) {
      schedule = await getSchedule(token)
    }

    let notifications = await getNotifications(token)

    setUser({
      ...user,
      username: fb.user,
      nom: fb.name,
      subjects,
      schedule,
      notifications,
      photo,
    })

    setLoading(false)
    setStatus("")
  }

  useEffect(() => {
    console.log(user)
    if (typeof window !== "undefined") {
      if (!user) {
        if (sessionStorage.getItem("user")) {
          setUser(JSON.parse(sessionStorage.getItem("user")))
        } else if (accessToken && window.location.pathname !== "/login")
          getUser(accessToken.token)
        else if (
          window.location.pathname !== "/login" &&
          !window.location.search.includes("code")
        ) {
          setUrl("/login")
        }
      } else {
        if (window.location.search.includes("code")) {
          setUrl("/")
        }
        if (!fb) addUser({ username: user.username, name: user.nom })
        sessionStorage.setItem("user", JSON.stringify(user))
        setLoading(false)
        setStatus("")
      }
    }
  }, [user, window.location])

  return (
    <authContext.Provider
      value={{
        user,
        setUser,
        status,
        loading,
        setLoading,
        url,
        accessToken,
        getNotifications,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
