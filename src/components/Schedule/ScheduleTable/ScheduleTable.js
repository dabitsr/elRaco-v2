import React, { useEffect, useState } from "react"
import { useContext } from "react"
import { UIContext } from "../../../context/UIContext"
import ScheduleCard from "../ScheduleCard"
import cuid from "cuid"
import userDataContext from "../../../context/userData/userDataContext"

export default function ScheduleTable() {
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
  const { ui } = useContext(UIContext)
  const { schedule } = useContext(userDataContext)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    if (ui) setIsDark(ui.theme === "dark")
  }, [ui.theme])

  return (
    <table className={`table is-narrow is-fullwidth is-size-7-mobile`}>
      <thead>
        <tr className={isDark ? "trDark" : "trLight"}>
          {days.map(day => (
            <th key={cuid()} className="has-text-centered is-1">
              <abbr className={isDark ? "trDark" : "trLight"} title={day.label}>
                {day.label[0]}
              </abbr>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {hours.map(hour => (
          <tr
            key={cuid()}
            className={`is-selected ${
              ui ? (ui.theme === "dark" ? "trDark" : "trLight") : "trDark"
            }`}
          >
            <th className="has-text-centered">{hour}</th>
            {days.map(
              day =>
                day.label !== "Hour" && (
                  <td key={cuid()}>
                    {schedule &&
                      schedule[day.num] &&
                      schedule[day.num][hour] && (
                        <ScheduleCard
                          type={schedule[day.num][hour].type}
                          room={schedule[day.num][hour].room}
                          subject={schedule[day.num][hour].subject}
                          group={schedule[day.num][hour].group}
                          color={schedule[day.num][hour].color}
                        />
                      )}
                  </td>
                )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
