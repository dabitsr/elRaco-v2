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
    checked: true,
    subjectColor: null,
    lng: "en",
  })

  const getUiFb = async () => {
    let theme = await fb.getTheme()
    let si = await fb.getScheduleInfo()
    setUi({
      ...ui,
      theme,
      subjectColor: await fb.getSubjectColor(),
      checked: theme === "dark",
      showScheduleInfo: si === undefined ? true : si,
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

  useEffect(() => {
    if (fb) fb.setScheduleInfo(ui.showScheduleInfo)
  }, [ui.showScheduleInfo])

  return (
    <UIContext.Provider value={{ ui, setUi }}>{children}</UIContext.Provider>
  )
}
