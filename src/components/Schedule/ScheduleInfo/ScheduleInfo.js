import React from "react"
import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { UIContext } from "../../../context/UIContext"

export default function ScheduleInfo() {
  const { ui, setUi } = useContext(UIContext)
  const { t } = useTranslation()
  return (
    <div className="mb-3">
      {ui.showScheduleInfo && (
        <div className={`notification is-${ui.theme}`}>
          <div
            className="delete"
            onClick={() => setUi({ ...ui, showScheduleInfo: false })}
          />
          {t("Welcome schedule")}
        </div>
      )}
    </div>
  )
}
