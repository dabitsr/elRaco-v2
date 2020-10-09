import React, { useContext } from "react"
import { UIContext } from "../../../context/UIContext"
import { useTranslation } from "react-i18next"

export const ThemeCardType = ({ type }) => {
  const colors = [
    { class: "primary", color: "#00d1b2" },
    { class: "link", color: "#3273dc" },
    { class: "info", color: "#3298dc" },
    { class: "success", color: "#48c774" },
    { class: "warning", color: "#ffdd57" },
    { class: "danger", color: "#f14668" },
    { class: "black", color: "#0a0a0a" },
    { class: "dark", color: "#363636" },
    { class: "light", color: "#f5f5f5" },
    { class: "white", color: "#fff" },
  ]
  const { ui, setUi } = useContext(UIContext)
  const { t } = useTranslation()

  return (
    <div className="card-content">
      <div className="title has-text-dark">{type}</div>
      <div className="columns is-multiline is-mobile has-text-centered">
        {colors.map((c, i) => (
          <div key={i} className="column colorSelect">
            <div
              className={`card button has-background-${c.class}`}
              onClick={() => setUi({ ...ui, [type.toLowerCase()]: c.class })}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ThemeCard() {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{t("Personalize theme")}</p>
        <i className="card-header-icon las la-brush"></i>
      </header>
      <ThemeCardType type="Navbar" />
      <ThemeCardType type="Background" />
    </div>
  )
}
