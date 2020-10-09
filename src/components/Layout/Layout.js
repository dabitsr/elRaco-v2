import React, { useEffect, useState, useContext } from "react"
import "bulma"
import "./global.scss"
import authContext from "../../context/auth/authContext"
import Navbar from "../Navbar"
import Loader from "react-loader-spinner"
import PageHero from "../PageHero/PageHero"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import { firebaseContext } from "../../context/firebase/firebaseState"
import i18n from "../../utils/i18n/i18n"

export default function Layout({ children }) {
  const history = useHistory()
  const { user, status, loading, url } = useContext(authContext)
  const { fb } = useContext(firebaseContext)

  useEffect(() => {
    if (url) history.push(url)
  }, [url])

  const handleLanguague = async () => {
    if (fb && fb.active) {
      let lang = await fb.getLanguague()

      i18n.changeLanguage(lang)
    }
  }

  useEffect(() => {
    if (fb) handleLanguague()
  }, [fb])

  return (
    <div>
      {user && <Navbar />}
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
