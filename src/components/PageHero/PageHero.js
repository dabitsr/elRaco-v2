import React, { useContext, useEffect } from "react"
import { UIContext } from "../../context/UIContext"
import Navbar from "../Navbar"
import { Link, Element } from "react-scroll"

export const FooterButtons = ({ up, down }) => {
  return (
    <div className="container has-text-centered">
      <div className="tabs is-centered">
        <ul>
          {up && (
            <li>
              <Link
                activeClass="active"
                to={up}
                spy={true}
                smooth={true}
                duration={500}
              >
                <i className="las la-angle-up la-3x arrowUp"></i>
              </Link>
            </li>
          )}

          {down && (
            <li>
              <Link
                activeClass="active"
                to={down}
                spy={true}
                smooth={true}
                duration={500}
              >
                <i className="las la-angle-down la-3x arrowDown"></i>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default function PageHero({
  children,
  title,
  foot,
  nav,
  color,
  name,
  footStyle,
}) {
  const { ui, setUi } = useContext(UIContext)

  useEffect(() => {
    setUi({ ...ui, navbarActive: false })
  }, [])

  return (
    <Element
      name={name}
      className={`hero page-hero ${
        ui ? `is-${color ? color : ui.theme}` : "is-dark"
      }  is-bold is-fullheight has-spaced-navbar-fixed-top`}
    >
      {nav && (
        <div className="hero-head">
          <Navbar />
        </div>
      )}
      <div className="hero-head">
        <div className="container">
          <h1 className="title has-text-centered mt-4">{title}</h1>
        </div>
      </div>
      <div
        className="hero-body"
        onClick={() => setUi({ ...ui, navbarActive: false })}
      >
        <div className="container">{children}</div>
      </div>

      <div
        className="hero-foot"
        style={footStyle}
        onClick={() => setUi({ ...ui, navbarActive: false })}
      >
        {foot}
      </div>
    </Element>
  )
}
