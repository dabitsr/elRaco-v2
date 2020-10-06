import React, { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import ThemeCard from "./ThemeCard"
import Axios from "axios"
import PageHero from "../PageHero/PageHero"
import { firebaseContext } from "../../context/firebase/firebaseState"
import { createBrowserHistory as createHistory } from "history"

export default function Home() {
  const { user } = useContext(UserContext)

  return (
    <PageHero>
      {user && user.me && (
        <div className="columns">
          <div className="column is-one-fifth">
            <div className="columns is-centered">
              <div className="column">
                <h1 className="title has-text-centered">
                  Hi {user.me.nom}, welcome to elRaco!
                </h1>
              </div>
            </div>
            <div className="columns is-centered">
              <div className="column is-narrow has-text-centered">
                <figure className="image is-128x128 container">
                  <img
                    className="is-rounded has-shadow"
                    src={user.photo}
                    alt="foto"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageHero>
  )
}
