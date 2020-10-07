import React, { useContext, useEffect, useState } from "react"
import authContext from "../../context/auth/authContext"
import userDataContext from "../../context/userData/userDataContext"
import PageHero from "../../components/PageHero"
import { UIContext } from "../../context/UIContext"
import ScheduleTable from "./ScheduleTable/ScheduleTable"

//TODO: poner colores por default en las asignaturas

export default function Schedule() {
  const colors = [
    "#a40e4c",
    "#681d50",
    "#2c2c54",
    "#6c787d",
    "#acc3a6",
    "#d1cdb0",
    "#f5d6ba",
    "#f49d6e",
  ]
  const { user } = useContext(authContext)
  const { ui, setUi } = useContext(UIContext)
  const { createScheduleAction } = useContext(userDataContext)

  useEffect(() => {
    if (!ui.subjectColor && user && user.subjects) {
      let aux = {}
      user.subjects.results.map(s => {
        console.log("POPOP")
        aux = { ...aux, [s.id]: "" }
      })
      setUi({ ...ui, subjectColor: aux })
    }
  }, [user, ui])

  useEffect(() => {
    console.log(ui.subjectColor)
    if (ui.subjectColor) createScheduleAction(user, ui.subjectColor)
  }, [ui])

  return (
    <PageHero>
      <h1 className="title">Schedule</h1>
      <ScheduleTable />

      <div className="title">Subject colors</div>
      {ui &&
        ui.subjectColor &&
        Object.keys(ui.subjectColor).map(key => (
          <div
            key={key}
            className="columns section is-vcentered is-mobile is-multiline"
          >
            <div className="column is-size-4 has-text-centered">{key}</div>
            {colors.map((color, i) => (
              <div className="column has-text-centered" key={i}>
                <div
                  className="card button"
                  style={{ backgroundColor: color }}
                  onClick={() =>
                    setUi({
                      ...ui,
                      subjectColor: { ...ui.subjectColor, [key]: color },
                    })
                  }
                ></div>
              </div>
            ))}
          </div>
        ))}
    </PageHero>
  )
}
