import Axios from "axios"
import React, { useContext, useState, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import PageHero from "../PageHero/PageHero"
import SubjectCard from "./SubjectCard/SubjectCard"
import SelectedSubject from "./SelectedSubject/SelectedSubject"
export default function Subjects() {
  const { user } = useContext(UserContext)
  const [asignaturaSel, guardarAsignaturaSel] = useState(null)

  // useEffect(() => {
  //   getSubjectNoticesAction(asignaturaSel.id)
  // }, [asignaturaSel])
  return (
    <>
      {asignaturaSel ? (
        <>
          <SelectedSubject
            asignatura={asignaturaSel}
            schedule={user.schedule}
            guardarAsignaturaSel={guardarAsignaturaSel}
          />
        </>
      ) : (
        <PageHero>
          <div className="columns is-multiline">
            {user &&
              user.subjects &&
              user.subjects.results.map((asignatura, i) => (
                <>
                  <div key={i} className="column">
                    <SubjectCard
                      asignatura={asignatura}
                      schedule={user.schedule}
                      guardarAsignaturaSel={guardarAsignaturaSel}
                    />
                  </div>
                </>
              ))}
          </div>
        </PageHero>
      )}
    </>
  )
}