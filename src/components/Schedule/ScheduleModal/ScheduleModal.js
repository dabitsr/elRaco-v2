import React from "react"
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import cuid from "cuid"
import { UIContext } from "../../../context/UIContext"
import { colors } from "../Schedule"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const ColorsSelect = ({ subject, modal, setModal }) => {
  const { ui, setUi } = useContext(UIContext)

  return (
    <div
      key={cuid()}
      className="columns section is-vcentered is-mobile is-multiline"
    >
      {colors.map((color, i) => (
        <div className="column has-text-centered" key={i}>
          <div
            className="card button"
            style={{ backgroundColor: color }}
            onClick={() => {
              setUi({
                ...ui,
                subjectColor: { ...ui.subjectColor, [subject]: color },
              })
              setModal({ ...modal, color })
            }}
          ></div>
        </div>
      ))}
    </div>
  )
}

export default function ScheduleModal({ showModal, setShowModal }) {
  const [modal, setModal] = useState(null)
  const [colorClass, setColorClass] = useState("")
  const { t } = useTranslation()

  useEffect(() => {
    if (showModal) setModal(showModal)
  }, [showModal])

  useEffect(() => {
    if (modal) {
      setColorClass(
        `color${modal.color && modal.color.substring(1, modal.color.length)}`
      )
    }
  }, [modal])

  useEffect(() => {
    return () => {
      setColorClass(null)
      setModal(null)
    }
  }, [])

  return (
    <div>
      {modal && (
        <div className={`modal  ${showModal && "is-active"}`}>
          <div
            className="modal-background"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="modal-content">
            <div className={`${colorClass} has-text-centered box`}>
              <div className="block">
                <div className={`title ${colorClass}`}>{modal.subject}</div>
              </div>
              <div className="block">
                <i className="las la-users"></i> {t("Group")}: {modal.group}
              </div>
              <div className="block">
                <i className="las la-book"></i> {t("Type")}: {modal.type}
              </div>
              <div className="block">
                <i className="las la-university"></i> {t("Classroom")}:{" "}
                {modal.room}
              </div>
              <div className="block">
                <ColorsSelect
                  modal={modal}
                  setModal={setModal}
                  subject={modal.subject}
                />
              </div>
              <div className={`block`}>
                <a
                  style={{ textDecoration: "underline" }}
                  className={`${colorClass}`}
                  target="_blank"
                  href={`https://www.fib.upc.edu/ca/estudis/graus/grau-en-enginyeria-informatica/pla-destudis/assignatures/${modal.subject}`}
                >
                  {t("More")}
                </a>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="modal-close is-large"
            aria-label="close"
          ></button>
        </div>
      )}
    </div>
  )
}
