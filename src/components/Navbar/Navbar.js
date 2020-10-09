import React, { useContext, useEffect, useState } from "react"
import authContext from "../../context/auth/authContext"
import { UIContext } from "../../context/UIContext"
import NavbarItem from "./NavbarItem/"
import Switch from "react-switch"
import darkMode from "../../img/darkMode.png"
import lightMode from "../../img/lightMode.png"
import { useTranslation } from "react-i18next"

export default function Navbar() {
  const { setUser } = useContext(authContext)
  const { ui, setUi } = useContext(UIContext)
  const [toggleNav, setToggleNav] = useState(false)
  const [mobile, setMobile] = useState("")
  const { t } = useTranslation()

  useEffect(() => {
    window.addEventListener("resize", () =>
      setMobile(window.innerWidth < 1024 ? "isMobile" : "")
    )
    setMobile(window.innerWidth < 1024 ? "isMobile" : "")
  }, [])

  return (
    <nav className={`navbar has-shadow is-spaced is-${ui.theme}`}>
      <div className="container">
        <div className="navbar-brand">
          <NavbarItem label="elRaco" to="/" />
          <div
            className={`navbar-burger ${ui.navbarActive && "is-active"}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setUi({ ...ui, navbarActive: !ui.navbarActive })}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>
        <div
          className={`navbar-menu ${mobile} has-text-centered ${
            ui.navbarActive && "is-active"
          }`}
        >
          <div className="navbar-start">
            {mobile && (
              <NavbarItem label={t("Home")} icon="las la-home" to="/" />
            )}
            <NavbarItem
              label={t("Schedule")}
              icon="las la-calendar"
              to="/schedule"
            />
            <NavbarItem
              label={t("Subjects")}
              icon="las la-book"
              to="/subjects"
            />
            <NavbarItem
              label={t("Notifications")}
              icon="las la-bell"
              to="/notifications"
            />
            <NavbarItem label={t("Profile")} icon="las la-user" to="/profile" />
          </div>
          <div className="navbar-end">
            <label className="navbar-item">
              <Switch
                onChange={() => setUi({ ...ui, checked: !ui.checked })}
                checked={ui.checked}
                checkedIcon={<img src={darkMode} />}
                uncheckedIcon={<img src={lightMode} />}
                offColor="#6b6b6b"
                onColor="#e5e5e5"
                offHandleColor="#fbc600"
                onHandleColor="#292929"
              />
            </label>

            <NavbarItem
              label={t("Exit")}
              icon="las la-sign-out-alt"
              to="/login"
              onClick={() => {
                setUser(null)
                if (typeof window !== "undefined") {
                  localStorage.removeItem("token")
                  sessionStorage.removeItem("user")
                  sessionStorage.clear()
                }
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}
