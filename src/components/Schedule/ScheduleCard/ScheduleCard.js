import React, { useContext, useEffect } from "react"
import { UIContext } from "../../../context/UIContext"

export default function ScheduleCard({ subject, type, group, room, color }) {
  const { ui } = useContext(UIContext)

  return (
    <div
      className={`container py-2 ${
        ui.theme !== "dark" ? "trDark" : "trLight"
      } color${color && color.substring(1, color.length)}`}
    >
      <div className="columns has-text-centered is-multiline is-gapless">
        <div className="column is-12">
          {subject} {group} {type}
        </div>
        <div className="column">{room}</div>
      </div>
    </div>
  )
}
