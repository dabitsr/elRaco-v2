import React, { createContext, useEffect, useState } from "react"
import UIContextModel from "../models/uicontext.model"

export const UIContext = createContext(UIContextModel)

export default function UIContextProvider({ children }) {
  const [ui, setUi] = useState({
    theme:
      typeof window !== "undefined" && localStorage.getItem("theme")
        ? localStorage.getItem("theme")
        : "dark",
    navbarActive: false,
    checked:
      typeof window !== "undefined" && localStorage.getItem("theme")
        ? localStorage.getItem("theme") === "dark"
        : true,
    subjectColor:
      typeof window !== "undefined" && localStorage.getItem("subjectColor")
        ? JSON.parse(localStorage.getItem("subjectColor"))
        : null,
  })

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("theme", ui.theme)
  }, [ui.theme])

  useEffect(() => {
    setUi({ ...ui, theme: ui.checked ? "dark" : "light" })
  }, [ui.checked])

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("subjectColor", JSON.stringify(ui.subjectColor))

    console.log(localStorage.getItem("subjectColor"))
    console.log(JSON.parse(localStorage.getItem("subjectColor")))
    console.log(ui.subjectColor)
  }, [ui.subjectColor])

  return (
    <UIContext.Provider value={{ ui, setUi }}>{children}</UIContext.Provider>
  )
}
