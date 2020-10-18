import React from "react"
import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { UIContext } from "../../context/UIContext"

export default function UpdateButton({ onClick, loading }) {
  const { ui } = useContext(UIContext)
  const { t } = useTranslation()
  return (
    <div
      className={`button is-rounded is-${ui.theme} ${loading && "is-loading"}`}
      onClick={onClick}
    >
      <i className="las la-sync"></i>{" "}
      <span className="is-hidden-mobile">{t("Update")}</span>
    </div>
  )
}
