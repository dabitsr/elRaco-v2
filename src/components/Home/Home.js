import React, { useContext, useEffect } from "react"
import authContext from "../../context/auth/authContext"
import PageHero from "../PageHero/PageHero"

export default function Home() {
  const { user } = useContext(authContext)

  return (
    <PageHero>
      {user && (
        <div className="columns">
          <div className="column is-one-fifth">
            <div className="columns is-centered">
              <div className="column">
                <h1 className="title has-text-centered">
                  Hi {user.nom}, welcome to elRaco!
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
