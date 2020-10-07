import React, { useContext, useEffect, useState } from "react"
import authContext from "../../context/auth/authContext"
import userDataContext from "../../context/userData/userDataContext"
import PageHero from "../../components/PageHero"
import cuid from "cuid"
import { UIContext } from "../../context/UIContext"
import ScheduleCard from "./ScheduleCard"
import { firebaseContext } from "../../context/firebase/firebaseState"

export default function Schedule() {
  const days = [
    { label: "Hour", num: 0 },
    { label: "Monday", num: 1 },
    { label: "Tuesday", num: 2 },
    { label: "Wednesday", num: 3 },
    { label: "Thursday", num: 4 },
    { label: "Friday", num: 5 },
  ]

  const hours = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ]

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
  const { schedule, createScheduleAction } = useContext(userDataContext)

  useEffect(() => {
    if (!ui.subjectColor && user && user.subjects) {
      let aux = {}
      user.subjects.results.map(s => {
        console.log("POPOP")
        aux = { ...aux, [s.id]: "" }
      })
      setUi({ ...ui, subjectColor: aux })
    } else createScheduleAction(user, ui.subjectColor)
  }, [user])

  useEffect(() => {
    console.log(ui.subjectColor)
    if (ui.subjectColor) createScheduleAction(user, ui.subjectColor)
  }, [ui])

  useEffect(() => {
    console.log(schedule)
  }, [schedule])

  return (
    <PageHero>
      <h1 className="title">Schedule</h1>

      <table className="table is-narrow is-fullwidth is-size-7-mobile">
        <thead>
          <tr
            className={
              ui ? (ui.theme === "dark" ? "trDark" : "trLight") : "trDark"
            }
          >
            {days.map(d => (
              <th key={cuid()} className="has-text-centered">
                <abbr
                  className={
                    ui ? (ui.theme === "dark" ? "trDark" : "trLight") : "trDark"
                  }
                  title={d.label}
                >
                  {d.label[0]}
                </abbr>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map(h => (
            <tr
              key={cuid()}
              className={`is-selected ${
                ui ? (ui.theme === "dark" ? "trDark" : "trLight") : "trDark"
              }`}
            >
              <th>{h}</th>
              {days.map(
                d =>
                  d.label !== "Hour" && (
                    <td key={cuid()}>
                      {schedule && schedule[d.num] && schedule[d.num][h] && (
                        <ScheduleCard
                          type={schedule[d.num][h].type}
                          room={schedule[d.num][h].room}
                          subject={schedule[d.num][h].subject}
                          group={schedule[d.num][h].group}
                          color={schedule[d.num][h].color}
                        />
                      )}
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="title">Subject colors</div>
      {ui &&
        ui.subjectColor &&
        Object.keys(ui.subjectColor).map(k => (
          <div className="columns section is-vcentered is-mobile is-multiline">
            <div className="column is-size-4 has-text-centered">{k}</div>
            {colors.map(c => (
              <div className="column has-text-centered">
                <div
                  className="card button"
                  style={{ backgroundColor: c }}
                  onClick={() =>
                    setUi({
                      ...ui,
                      subjectColor: { ...ui.subjectColor, [k]: c },
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
