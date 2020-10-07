import React, { useContext, useEffect } from "react"
import SubjectCard from "../SubjectCard/SubjectCard"
import Notices from "../../Notices/Notices"

export default function SelectedSubject({
  asignatura,
  schedule,
  guardarAsignaturaSel,
}) {
  return (
    <>
      <div className="columns is-centered mt-2">
        <div className="column is-4 is-8-tablet is-7-desktop">
          <SubjectCard asignatura={asignatura} schedule={schedule} />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => guardarAsignaturaSel(null)}
          >
            Retroceder
          </button>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column ">
          <Notices subjectId={asignatura.id}></Notices>
        </div>
      </div>
    </>
  )
}
