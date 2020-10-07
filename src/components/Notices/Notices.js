import React, { useEffect, useContext } from "react"
import userDataContext from "../../context/userData/userDataContext"
import Notice from "./Notice/Notice"
import Loader from "react-loader-spinner"

export default function Notices({ subjectId }) {
  const { subjectNotices, loading, getSubjectNoticesAction } = useContext(
    userDataContext
  )

  useEffect(() => {
    getSubjectNoticesAction(subjectId)
  }, [])

  return (
    <>
      {!loading ? (
        subjectNotices.map(notice => <Notice key={notice.id} notice={notice} />)
      ) : (
        <div className="container has-text-centered modal-spinner">
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={50}
            width={50}
            timeout={10000}
          />
        </div>
      )}
    </>
  )
}
