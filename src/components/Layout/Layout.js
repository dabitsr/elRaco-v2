import React, { useEffect, useState, useContext } from "react"
import "bulma"
import "./global.scss"
import { UserContext } from "../../context/UserContext"
import Navbar from "../Navbar"
import Loader from "react-loader-spinner"
import PageHero from "../PageHero/PageHero"

export default function Layout({ children }) {
  const { user, status, loading } = useContext(UserContext)

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
