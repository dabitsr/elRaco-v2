import React, { createContext, useEffect, useState } from "react"
import { useContext } from "react"
import UIContextModel from "../models/uicontext.model"
import { firebaseContext } from "./firebase/firebaseState"
import { UserContext } from "./UserContext"

export const UIContext = createContext(UIContextModel)

export default function UIContextProvider({ children }) {
  const { fb } = useContext(firebaseContext)
  const { user } = useContext(UserContext)

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
    setUi({
      ...ui,
      theme: await fb.getTheme(),
      subjectColor: await fb.getSubjectColor(),
    })
  }

  useEffect(() => {
    console.log(fb)

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
      if (fb) fb.setSubjectColor(subjectColor)
    }
    /*
    if (typeof window !== "undefined")
      localStorage.setItem("subjectColor", JSON.stringify(ui.subjectColor))

    console.log(localStorage.getItem("subjectColor"))
    console.log(JSON.parse(localStorage.getItem("subjectColor")))
    console.log(ui.subjectColor)*/
  }, [ui.subjectColor])

  return (
    <UIContext.Provider value={{ ui, setUi }}>{children}</UIContext.Provider>
  )
}
