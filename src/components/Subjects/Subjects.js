import React, { useContext, useState } from "react"
import authContext from "../../context/auth/authContext"
import PageHero from "../PageHero/PageHero"
import SubjectCard from "./SubjectCard/SubjectCard"
import SelectedSubject from "./SelectedSubject/SelectedSubject"
export default function Subjects() {
  const { user } = useContext(authContext)
  const [asignaturaSel, guardarAsignaturaSel] = useState(null)

  // useEffect(() => {
  //   getSubjectNoticesAction(asignaturaSel.id)
  // }, [asignaturaSel])
  return (
    <div className="has-background-dark">
      {asignaturaSel ? (
        <div className="column">
          <SelectedSubject
            asignatura={asignaturaSel}
            schedule={user.schedule}
            guardarAsignaturaSel={guardarAsignaturaSel}
          />
        </div>
      ) : (
        <PageHero nav>
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
    </div>
  )
}
