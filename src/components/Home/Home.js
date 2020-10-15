import React, { useContext, useEffect, useState } from "react"
import authContext from "../../context/auth/authContext"
import PageHero, { FooterButtons } from "../PageHero/PageHero"
import { useTranslation } from "react-i18next"
import LastNotifications from "./LastNotifications/LastNotifications"
import { UIContext } from "../../context/UIContext"
import ReactPlayer from "react-player/youtube"
import { Player } from "video-react"
import BigPlayButton from "video-react/lib/components/BigPlayButton"
import ControlBar from "video-react/lib/components/control-bar/ControlBar"
var parse = require("html-react-parser")

export default function Home() {
  const { user, accessToken } = useContext(authContext)
  const { ui } = useContext(UIContext)
  const { t } = useTranslation()
  const [showNotification, setShowNotification] = useState(null)
  const [textColor, setTextColor] = useState("")

  useEffect(() => {
    console.log(showNotification)
  }, [showNotification])

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
    <div style={{ scrollBehavior: "smooth" }}>
      {user && (
        <div>
          <PageHero
            name="welcome"
            title={t("Home")}
            foot={<FooterButtons down="news" />}
            nav
          >
            <div className="columns">
              <div className="column is-one-fifth is-hidden-mobile is-vcentered">
                <h1 className="title has-text-centered is-size-4-mobile">
                  {t("Hello")} {user.nom}, {t("Welcome")}!
                </h1>

                <figure className="image is-96x96 container is-size-4-mobile">
                  <img
                    className="is-rounded has-shadow"
                    src={user.photo}
                    alt="foto"
                  />
                </figure>
              </div>
              <LastNotifications setShowNotification={setShowNotification} />
            </div>
          </PageHero>

          <PageHero
            title={t("News")}
            color="info"
            foot={<FooterButtons up="welcome" down="more" />}
            name="news"
          >
            <div className="title">Last news</div>
          </PageHero>

          <PageHero
            name="more"
            foot={<FooterButtons up="news" down="about" />}
            title="More"
            color="primary"
          >
            <div>More</div>
          </PageHero>

          <PageHero
            name="about"
            foot={<FooterButtons up="more" />}
            color="warning"
            title={t("About")}
          ></PageHero>

          {showNotification && (
            <div className={`modal ${showNotification && "is-active"}`}>
              <div
                className="modal-background"
                onClick={() => setShowNotification(null)}
              ></div>
              <div className="modal-content">
                <div
                  className={` box has-background-${ui.theme} has-text-${textColor}`}
                >
                  <div
                    className={`block has-text-centered title has-text-${textColor}`}
                  >
                    {showNotification.titol}
                  </div>
                  <div
                    className={`subtitle has-text-centered has-text-${textColor}`}
                  >
                    {showNotification.codi_assig}
                  </div>
                  <div className={`block has-text-${textColor}`}>
                    {parse(showNotification.text)}
                  </div>
                  <div className="columns is-multiline is-mobile">
                    {showNotification.adjunts.map((file, i) => {
                      let icon = getIcon(
                        file.nom.substring(file.nom.length - 3)
                      )

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

                      return (
                        <div key={i} className="block has-text-centered">
                          <Player
                            src={`${file.url}?access_token=${accessToken.token}`}
                          >
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
              <div
                className="modal-close"
                onClick={() => setShowNotification(null)}
              ></div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
