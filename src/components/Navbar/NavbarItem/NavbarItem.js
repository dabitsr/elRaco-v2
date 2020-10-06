import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UIContext } from "../../../context/UIContext"

export default function NavbarItem({ to, label, icon, onClick, className }) {
  const { ui, setUi } = useContext(UIContext)

  return (
    <Link
      to={to}
      className={`navbar-item ${className}`}
      onClick={() => {
        setUi({ ...ui, navbarActive: false })
        if (onClick) onClick()
      }}
    >
      <i className={icon}></i>
      {label}
    </Link>
  )
}
