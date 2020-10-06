import React, { useContext } from "react"
import { useState } from "react"
import { UIContext } from "../../context/UIContext"

export default function PageHero({ children }) {
  const { ui } = useContext(UIContext)

  return (
    <section
      id="hero"
      className={`hero ${
        ui ? `is-${ui.theme}` : "is-dark"
      }  is-bold is-fullheight`}
    >
      <div className="hero-body">
        <div className="container">{children}</div>
      </div>
    </section>
  )
}
