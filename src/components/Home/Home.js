import React, { useContext, useEffect, useState } from "react"
import authContext from "../../context/auth/authContext"
import PageHero, { FooterButtons } from "../PageHero/PageHero"
import { useTranslation } from "react-i18next"
import LastNotifications from "./LastNotifications/LastNotifications"
import { UIContext } from "../../context/UIContext"
import NotificationModal from "../NotificationModal/NotificationModal"

export default function Home() {
  const { user } = useContext(authContext)
  const { t } = useTranslation()
  const [showNotification, setShowNotification] = useState(null)

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
            <NotificationModal
              notification={showNotification}
              setNotification={setShowNotification}
            />
          )}
        </div>
      )}
    </div>
  )
}
