import React, { useContext, useEffect } from "react"
import SubjectCard from "../SubjectCard/SubjectCard"
import Notices from "../../Notices/Notices"

export default function SelectedSubject({
  asignatura,
  schedule,
  guardarAsignaturaSel,
}) {
  return (
    <div>
      <div className="columns mt-2">
        <div className="column is-4">
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

      <Notices subjectId={asignatura.id}></Notices>

    </div>
  )
}
