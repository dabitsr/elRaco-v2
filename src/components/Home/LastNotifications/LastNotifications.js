import React, { useContext, useState, useEffect } from "react"
import { UIContext } from "../../../context/UIContext"
import { useTranslation } from "react-i18next"
import authContext from "../../../context/auth/authContext"
import UpdateButton from "../../UpdateButton/UpdateButton"

export default function LastNotifications({ setShowNotification }) {
  const { user, accessToken, getNotifications } = useContext(authContext)
  const [lastNotifications, setLastNotifications] = useState(null)
  const { ui } = useContext(UIContext)
  const { t } = useTranslation()
  const [loadingButton, setLoadingButton] = useState(false)

  const getLastNotifications = async notifications => {
    let previewArray = notifications.slice(0, 20)

    console.log(previewArray)

    setLastNotifications(previewArray)
    setLoadingButton(false)
  }

  const updateLastNotifications = async () => {
    let newNotis = await getNotifications(accessToken.token)
    getLastNotifications(newNotis.results)
  }

  useEffect(() => {
    if (user && user.notifications)
      getLastNotifications(user.notifications.results)
  }, [user])
  useEffect(() => {
    console.log(lastNotifications)
    if (lastNotifications) setLoadingButton(false)
  }, [lastNotifications])

  return (
    <div className="column">
      <div className="title has-text-centered">
        {t("Last notifications")}
        <UpdateButton
          onClick={() => {
            updateLastNotifications()
            setLoadingButton(true)
          }}
          loading={loadingButton}
        />
      </div>

      <div
        style={{
          overflowY: "scroll",
          maxHeight: window.innerHeight * 0.5,
        }}
      >
        {lastNotifications &&
          lastNotifications.map((notice, i) => {
            let day = notice.data_modificacio.toString().substring(8, 10)
            let month = notice.data_modificacio.toString().substring(5, 7)

            return (
              <div key={i} className="block is-12">
                <div
                  className={`box has-text-${
                    ui.theme === "dark" ? "white" : "black"
                  } has-background-${ui.theme}`}
                  onClick={() => setShowNotification(notice)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="is-flex is-justify-content-space-between">
                    <span className="has-text-weight-bold">
                      {notice.codi_assig}{" "}
                      {notice.adjunts.length ? (
                        <i className="las la-file-alt"></i>
                      ) : null}
                    </span>
                    <span className="has-text-weight-bold">
                      {day}/{month}
                    </span>
                  </div>
                  <p>{notice.titol}</p>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
