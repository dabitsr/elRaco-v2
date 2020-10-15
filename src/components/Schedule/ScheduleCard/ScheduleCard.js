import React, { useContext } from "react"
import { UIContext } from "../../../context/UIContext"

export default function ScheduleCard({
  subject,
  type,
  group,
  room,
  color,
  setShowModal,
}) {
  const { ui } = useContext(UIContext)

  return (
    <div
      className={`container scheduleCard box p0 py-2 ${
        ui.theme !== "dark" ? "trDark" : "trLight"
      } color${color && color.substring(1, color.length)}`}
      onClick={() => setShowModal({ subject, type, group, room, color })}
      style={{ cursor: "pointer" }}
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
