import React, { useContext, useEffect, useState } from "react"
import authContext from "../../context/auth/authContext"
import userDataContext from "../../context/userData/userDataContext"
import PageHero from "../../components/PageHero"
import { UIContext } from "../../context/UIContext"
import ScheduleTable from "./ScheduleTable/ScheduleTable"
import { firebaseContext } from "../../context/firebase/firebaseState"
import ScheduleModal from "./ScheduleModal/ScheduleModal"
import ScheduleInfo from "./ScheduleInfo/ScheduleInfo"
import { useTranslation } from "react-i18next"

//TODO: poner colores por default en las asignaturas, esperar hasta que los colores esten bien puestos
export const colors = [
  "#a40e4c",
  "#681d50",
  "#2c2c54",
  "#6c787d",
  "#acc3a6",
  "#d1cdb0",
  "#f5d6ba",
  "#f49d6e",
]

export default function Schedule() {
  const { user, loading, setLoading } = useContext(authContext)
  const { ui, setUi } = useContext(UIContext)
  const { createScheduleAction } = useContext(userDataContext)
  const { fb } = useContext(firebaseContext)
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (!ui.subjectColor && user && user.subjects) {
      let aux = {}
      user.subjects.results.map((subject, i) => {
        aux = { ...aux, [subject.id]: colors[i] }
      })
      setUi({ ...ui, subjectColor: aux })
    }
  }, [user, ui])

  const checkLoading = async () => {
    let fbSubjectColor = await fb.getSubjectColor()
    setLoading(ui.subjectColor === fbSubjectColor)
  }

  useEffect(() => {
    console.log(ui.subjectColor)
    if (ui.subjectColor) {
      createScheduleAction(user, ui.subjectColor)
    }
  }, [ui])

  useEffect(() => {
    if (fb && fb.active) checkLoading()
    else setLoading(true)
  }, [fb])

  return (
    <div>
      {!loading && (
        <PageHero>
          <ScheduleInfo />

          <h1 className="title">{t("Schedule")}</h1>
          <ScheduleTable setShowModal={setShowModal} />

          <ScheduleModal showModal={showModal} setShowModal={setShowModal} />
        </PageHero>
      )}
    </div>
  )
}
