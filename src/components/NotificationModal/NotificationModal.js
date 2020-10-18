import React, { useContext, useState, useEffect } from "react"
import { UIContext } from "../../context/UIContext"
import ReactPlayer from "react-player/youtube"
import { Player } from "video-react"
import BigPlayButton from "video-react/lib/components/BigPlayButton"
import ControlBar from "video-react/lib/components/control-bar/ControlBar"
import authContext from "../../context/auth/authContext"

var parse = require("html-react-parser")
export default function NotificationModal({ notification, setNotification }) {
  const { ui } = useContext(UIContext)
  const { accessToken } = useContext(authContext)
  const [textColor, setTextColor] = useState("")

  useEffect(() => {
    console.log(notification)
  }, [notification])

  useEffect(() => {
    if (ui.theme) setTextColor(ui.theme === "dark" ? "light" : "dark")
  }, [ui.theme])

  const getIcon = fileExtension => {
    console.log(fileExtension)

    switch (fileExtension) {
      case "mp4":
      case "avi":
      case "mov":
      case "flv":
        return <i className="las la-file-video"></i>

      case "pdf":
        return <i className="las la-file-pdf"></i>
      case "doc":
      case "docx":
      case "txt":
        return <i className="las la-file-alt"></i>

      default:
        return <i className="las la-file"></i>
    }
  }

  return (
    <div className={`modal ${notification && "is-active"}`}>
      <div
        className="modal-background"
        onClick={() => setNotification(null)}
      ></div>
      <div className="modal-content">
        <div
          className={` box has-background-${ui.theme} has-text-${textColor}`}
        >
          <div
            className={`block has-text-centered title has-text-${textColor}`}
          >
            {notification.titol}
          </div>
          <div className={`subtitle has-text-centered has-text-${textColor}`}>
            {notification.codi_assig}
          </div>
          <div className={`block has-text-${textColor}`}>
            {parse(notification.text)}
          </div>
          <div className="columns is-multiline is-mobile">
            {notification.adjunts.map((file, i) => {
              let fileExtension = file.nom.substring(file.nom.length - 3)
              let icon = getIcon(fileExtension)

              console.log(`${file.url}?access_token=${accessToken.token}`)

              return (
                <div className="column has-text-centered">
                  <a
                    key={i}
                    className={`button is-${ui.theme}`}
                    href={file.url}
                    target="_blank"
                  >
                    <span className="icon">{icon}</span>
                    <span>{file.nom}</span>
                  </a>
                </div>
              )

              //Video player
              return (
                <div key={i} className="block has-text-centered">
                  <Player src={`${file.url}?access_token=${accessToken.token}`}>
                    <BigPlayButton position="center" />
                    <ControlBar autoHide />
                  </Player>

                  <video
                    src={`${file.url}?access_token=${accessToken.token}`}
                    preload="auto"
                    width="100%"
                    height="100%"
                    onLoadedData={() => alert("LOADED VIDOE")}
                  ></video>

                  <a
                    className={`button is-${ui.theme}`}
                    href={file.url}
                    target="_blank"
                  >
                    <span className="icon">{icon}</span>
                    <span>{file.nom}</span>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="modal-close" onClick={() => setNotification(null)}></div>
    </div>
  )
}
