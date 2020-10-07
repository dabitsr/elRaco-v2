import React, { createContext, useEffect, useState } from "react"
import { useContext } from "react"
import UIContextModel from "../models/uicontext.model"
import { firebaseContext } from "./firebase/firebaseState"
import authContext from "./auth/authContext"

export const UIContext = createContext(UIContextModel)

export default function UIContextProvider({ children }) {
  const { fb } = useContext(firebaseContext)
  const { user } = useContext(authContext)

  const [ui, setUi] = useState({
    theme: "dark",
    navbarActive: false,
    checked:
      typeof window !== "undefined" && localStorage.getItem("theme")
        ? localStorage.getItem("theme") === "dark"
        : true,
    subjectColor: null,
  })

  const getUiFb = async () => {
    let theme = await fb.getTheme()
    setUi({
      ...ui,
      theme,
      subjectColor: await fb.getSubjectColor(),
      checked: theme === "dark",
    })
  }

  useEffect(() => {
    if (fb && fb.active && user) getUiFb()
  }, [fb, user])

  useEffect(() => {
    let theme = ui.checked ? "dark" : "light"
    setUi({ ...ui, theme })
    if (fb) fb.setTheme(theme)
  }, [ui.checked])

  useEffect(() => {
    if (ui.subjectColor) {
      let subjectColor = ui.subjectColor
      console.log(subjectColor)
      if (fb && fb.active) fb.setSubjectColor(subjectColor)
    }
  }, [ui.subjectColor])

  return (
    <UIContext.Provider value={{ ui, setUi }}>{children}</UIContext.Provider>
  )
}
