import React, { useEffect, useState, useContext } from "react"
import "bulma"
import "./global.scss"
import authContext from "../../context/auth/authContext"
import Navbar from "../Navbar"
import Loader from "react-loader-spinner"
import PageHero from "../PageHero/PageHero"

import { useHistory } from "react-router-dom"

export default function Layout({ children }) {
  const history = useHistory()
  const { user, status, loading, url } = useContext(authContext)

  useEffect(() => {
    if (url) history.push(url)
  }, [url])

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
