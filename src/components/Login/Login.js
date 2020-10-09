import React, { useContext, useEffect, useState } from "react"
import { createBrowserHistory as createHistory } from "history"
import cuid from "cuid"
import authContext from "../../context/auth/authContext"
import { UIContext } from "../../context/UIContext"
import { useTranslation } from "react-i18next"

export default function Login() {
  const { user } = useContext(authContext)
  const { ui } = useContext(UIContext)
  const [url, setUrl] = useState("")
  const history = createHistory()
  const { t } = useTranslation()

  useEffect(() => {
    setUrl(
      `https://api.fib.upc.edu/v2/o/authorize/?client_id=${encodeURIComponent(
        process.env.REACT_APP_CLIENT_ID
      )}&redirect_uri=${encodeURIComponent(
        process.env.REACT_APP_REDIRECT_URI
      )}&response_type=code&state=${cuid()}`
    )
  }, [])

  useEffect(() => {
    if (user) history.push("/")
  }, [user])

  return (
    <section
      className={`hero is-fullheight ${
        ui ? `is-${ui.theme}` : "is-dark"
      } is-bold`}
    >
      <div className="hero-body has-text-centered">
        <div className="container">
          <h1 className="title">{t("Welcome")}</h1>
          <button
            className={`button ${
              ui ? `is-${ui.theme === "dark" ? "light" : "dark"}` : "is-dark"
            }  is-outlined`}
            onClick={() => history.push(url)}
          >
            {t("Log In")}
          </button>
        </div>
      </div>
    </section>
  )
}
