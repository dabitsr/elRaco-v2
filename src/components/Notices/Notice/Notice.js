import React from "react"
import global from './global.css'
const Notice = ({ notice }) => {
  console.log(notice.text)
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
