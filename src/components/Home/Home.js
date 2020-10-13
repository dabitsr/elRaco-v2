import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import authContext from "../../context/auth/authContext"
import PageHero, { FooterButtons } from "../PageHero/PageHero"
import { useTranslation } from "react-i18next"
import { UIContext } from "../../context/UIContext"

export default function Home() {
  const { user, accessToken, getNotifications } = useContext(authContext)
  const { t } = useTranslation()
  const [previewNotices, setPreviewNotices] = useState(null)
  const { ui } = useContext(UIContext)
  const [loadingButton, setLoadingButton] = useState(false)

  const getPreviewNotices = async notifications => {
    let previewArray = notifications.slice(0, 20)

    console.log(previewArray)

    setPreviewNotices(previewArray)
    setLoadingButton(false)
  }

  const updatePreviewNotices = async () => {
    let newNotis = await getNotifications(accessToken.token)
    getPreviewNotices(newNotis.results)
  }

  useEffect(() => {
    console.log("I ENTER")
    if (user && user.notifications)
      getPreviewNotices(user.notifications.results)
  }, [user])

  useEffect(() => {
    console.log(previewNotices)
    if (previewNotices) setLoadingButton(false)
  }, [previewNotices])

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
              <div className="column is-one-fifth">
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
              <div className="column">
                <div
                  className="columns is-multiline is-mobile section"
                  style={{
                    overflowY: "scroll",
                    maxHeight: window.innerHeight * 0.4,
                  }}
                >
                  <div className="column is-12 has-text-centered">
                    <div
                      className={`button box is-rounded is-${ui.theme} ${
                        loadingButton && "is-loading"
                      }`}
                      onClick={() => {
                        updatePreviewNotices()
                        setLoadingButton(true)
                      }}
                    >
                      <i className="las la-sync"></i>
                    </div>
                  </div>
                  {previewNotices &&
                    previewNotices.map(notice => {
                      let day = notice.data_modificacio
                        .toString()
                        .substring(8, 10)
                      let month = notice.data_modificacio
                        .toString()
                        .substring(5, 7)

                      return (
                        <div className="column is-12">
                          <div
                            className={`box has-text-${
                              ui.theme === "dark" ? "white" : "black"
                            } has-background-${ui.theme}`}
                          >
                            <div className="is-flex is-justify-content-space-between">
                              <span className="has-text-weight-bold">
                                {notice.codi_assig}
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
        </div>
      )}
    </div>
  )
}
