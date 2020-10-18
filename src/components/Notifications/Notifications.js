import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { useTranslation } from "react-i18next"
import authContext from "../../context/auth/authContext"
import userDataContext from "../../context/userData/userDataContext"
import PageHero from "../PageHero"
import Loader from "react-loader-spinner"
import { UIContext } from "../../context/UIContext"
import UpdateButton from "../UpdateButton/UpdateButton"
import NotificationModal from "../NotificationModal"

export default function Notifications() {
  const { user } = useContext(authContext)
  const [tabs, setTabs] = useState(null)
  const [tabsLayout, setTabsLayout] = useState(null)
  const [subject, setSubject] = useState(null)
  const { t } = useTranslation()
  const { subjectNotices, loading, getSubjectNoticesAction } = useContext(
    userDataContext
  )
  const { ui } = useContext(UIContext)
  const [notification, setNotification] = useState(null)

  const updateLayout = () => {
    setTabsLayout(
      <nav className="tabs is-boxed is-fullwidth">
        <div className={`container has-background-${ui.theme}`}>
          <ul>
            {tabs.map(tab => (
              <li
                onClick={() =>
                  subject === tab ? window.scrollTo(0, 0) : setSubject(tab)
                }
                className={subject === tab && "is-active"}
              >
                <a>{tab}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    )
  }

  const updateNotices = () => {
    getSubjectNoticesAction(subject)
  }

  useEffect(() => {
    if (user && user.subjects && user.subjects.results) {
      let aux = []
      user.subjects.results.map(subject => aux.push(subject.id))
      setTabs(aux)
    }
  }, [user])

  useEffect(() => {
    if (tabs) updateLayout()
  }, [tabs, subject, ui])

  useEffect(() => {
    if (subject) updateNotices()
  }, [subject])

  return (
    <PageHero
      nav
      foot={tabsLayout}
      footStyle={{ position: "fixed", bottom: "0", right: "0", left: "0" }}
    >
      {subject ? (
        <div className="has-text-centered">
          {loading ? (
            <div>
              <Loader type="Oval" color="#00BFFF" height={50} width={50} />
            </div>
          ) : (
            <div style={{ scrollBehavior: "smooth" }}>
              <ul>
                <li className="block">
                  <UpdateButton onClick={() => updateNotices()} />
                </li>
                {subjectNotices.map((notification, i) => (
                  <li className="block" key={i}>
                    <div
                      className={`box has-text-${
                        ui.theme === "dark" ? "white" : "black"
                      } has-background-${ui.theme}`}
                      onClick={() => setNotification(notification)}
                      style={{ cursor: "pointer" }}
                    >
                      {notification.titol}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="container">
          <div className="title">
            {t("Welcome to the notifications section!")}
          </div>
          <p>{t("Select a subject to see its notifications")}</p>
        </div>
      )}

      {notification && (
        <NotificationModal
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </PageHero>
  )
}
