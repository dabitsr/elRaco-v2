import React, { createContext, useState, useEffect, useContext } from "react"
import {
  createBrowserHistory as createHistory,
  createHashHistory,
} from "history"
import Axios from "axios"
import window from "global"
import UserContextModel from "../models/usercontext.model"
import { firebaseContext } from "./firebase/firebaseState"
import { withRouter, useHistory } from "react-router-dom"

export const UserContext = createContext(UserContextModel)

function UserContextProvider({ children }) {
  const { fb, addUser } = useContext(firebaseContext)
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [code, setCode] = useState(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")
  const history = createHistory()

  useEffect(() => {
    let a = window.location.search.substring(1).split("&")
    let access
    a.map(i =>
      i.substr(0, 4) === "code" ? (access = i.substr(5, i.length)) : null
    )
    setCode(access ? access : null)
  }, [])

  useEffect(() => {
    if (code) {
      Axios({
        url: "https://api.fib.upc.edu/v2/o/token",
        params: {
          grant_type: "authorization_code",
          redirect_uri: process.env.REACT_APP_REDIRECT_URI,
          code: code,
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
        },
        method: "POST",
      })
        .then(data => {
          console.log(data.data.expires_in)
          setAccessToken({
            token: data.data.access_token,
            expires: data.data.expires_in,
            refreshToken: data.data.refresh_token,
          })
        })
        .catch(e => {
          localStorage.removeItem("token")
          console.log(e)
        })

      setCode(null)
    }
  }, [code])

  useEffect(() => {
    if (accessToken) {
      console.log(accessToken)
      if (typeof window !== "undefined")
        localStorage.setItem("token", accessToken.token)
      getUser(accessToken.token)
    }
  }, [accessToken])

  const handleError = () => {
    history.push("/login")
    window.location.reload()
  }

  const getUser = async token => {
    setLoading(true)

    setStatus("Getting user info...")
    let me = await Axios({
      method: "GET",
      url: "https://api.fib.upc.edu/v2/jo/",
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
    console.log(me)
    addUser(me)
  }

  const getData = async () => {
    var token = accessToken.token
    var schedule
    if (fb) schedule = await fb.getSchedule()
    let photo = `https://api.fib.upc.edu/v2/jo/foto.jpg?access_token=${token}`
    console.log(photo)
    setStatus(`Getting ${fb.user} subjects...`)
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
        console.log(e)
        handleError()
      })

    if (!schedule) {
      setStatus(`Getting ${fb.user} schedule...`)
      schedule = await Axios({
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
    }

    setStatus(`Getting ${fb.user} notifications...`)
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
    if (fb && fb.user && fb.active && accessToken) {
      getData()
    }
  }, [fb, accessToken])

  useEffect(() => {
    console.log(user)
    if (typeof window !== "undefined") {
      if (!user) {
        if (sessionStorage.getItem("user"))
          setUser(JSON.parse(sessionStorage.getItem("user")))
        else if (localStorage.getItem("token"))
          getUser(localStorage.getItem("token"))
        else if (
          window.location.pathname !== "/login" &&
          !localStorage.getItem("token") &&
          !window.location.search.includes("code")
        ) {
          history.push("/login")
          window.location.reload()
        }
      } else {
        if (
          window.location.pathname.includes("login") ||
          window.location.search.includes("code")
        ) {
          history.push("/")
        }
        addUser({ username: user.username, name: user.nom })
        sessionStorage.setItem("user", JSON.stringify(user))
      }
    }
  }, [user, window])

  return (
    <UserContext.Provider value={{ user, setUser, status, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
