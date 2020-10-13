import React from "react"

const Notice = ({ notice }) => {
  return (
    <div className="columns is-centered mt-2 mb-2">
      <div className="column notice is-8">
        <p>{notice.titol}</p>
        {/* <div dangerouslySetInnerHTML={{ __html: notice.text }} /> */}
      </div>
    </div>
  )
}

export default Notice
