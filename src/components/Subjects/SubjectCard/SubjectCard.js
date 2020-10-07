import React, { useState, useEffect } from "react"
import numToDay from "../../../utils/numToDay"
import Axios from "axios"
import global from "./global.css"

// s -> asignatura
// schedule -> conjunto asignaturas que cursa el alumno / calendario semanal

export default function SubjectCard({
  asignatura,
  schedule,
  guardarAsignaturaSel,
}) {
  // console.log(asignatura)
  console.log(schedule)

  const handleClick = () => {
    if (guardarAsignaturaSel) guardarAsignaturaSel(asignatura)
  }
  return (
    <div className="card card-styles" onClick={handleClick}>
      <div className="card-content">
        <p className="has-text-centered title has-text-dark">{asignatura.id}</p>
        <p className="has-text-centered">Group: {asignatura.grup}</p>
        {schedule &&
          schedule.results &&
          schedule.results.map((d, i) => {
            let j = d.inici.search(":")
            let m = d.inici.substring(j + 1)
            if (d.codi_assig === asignatura.id)
              return (
                <p key={i} className="has-text-centered">
                  {numToDay(d.dia_setmana)}: {d.inici} -{" "}
                  {(parseInt(d.inici) + d.durada).toString()}:{m}
                </p>
              )
          })}
      </div>
    </div>
  )
}
