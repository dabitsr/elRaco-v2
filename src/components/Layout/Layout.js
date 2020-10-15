import React, { useEffect, useContext } from "react"
import "bulma"
import "./global.scss"
import authContext from "../../context/auth/authContext"
import Loader from "react-loader-spinner"
import { useHistory } from "react-router-dom"
import { firebaseContext } from "../../context/firebase/firebaseState"
import i18n from "../../utils/i18n/i18n"

export default function Layout({ children }) {
  const history = useHistory()
  const { status, loading, url } = useContext(authContext)
  const { fb } = useContext(firebaseContext)

  useEffect(() => {
    if (url) history.push(url)
  }, [url])

  const handlelanguage = async () => {
    if (fb && fb.active) {
      let lang = await fb.getLanguage()

      i18n.changeLanguage(lang)
    }
  }

  useEffect(() => {
    if (fb) handlelanguage()
  }, [fb])

  return (
    <div>
      <div>{children}</div>

      {loading && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="container has-text-centered modal-spinner">
              <Loader type="Oval" color="#00BFFF" height={100} width={100} />
              <div className="title has-text-light">{status}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
