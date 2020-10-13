import React, { useContext } from "react"
import i18n from "../../utils/i18n/i18n"
import PageHero, { FooterButtons } from "../PageHero/PageHero"
import { firebaseContext } from "../../context/firebase/firebaseState"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

export default function Profile() {
  const { fb } = useContext(firebaseContext)
  const { t } = useTranslation()

  const changeLanguage = async lng => {
    i18n.changeLanguage(lng)
    toast.dark(`👌 ${t("language changed!")}`)
    if (fb && fb.active) fb.setLanguage(lng)
  }

  return (
    <div>
      <PageHero
        nav
        title={t("Profile")}
        foot={<FooterButtons down="configuration" />}
        name="profile"
      >
        <div className="title">{t("General information")}</div>
      </PageHero>

      <PageHero
        name="configuration"
        foot={<FooterButtons up="profile" down="dangerZone" />}
        title={t("Configuration")}
        color="primary"
      >
        <div className="title">{t("Change language")}</div>
        <div className="columns">
          <div className="button" onClick={() => changeLanguage("es")}>
            Español
          </div>
          <div className="button" onClick={() => changeLanguage("cat")}>
            Català
          </div>
          <div className="button" onClick={() => changeLanguage("en")}>
            English
          </div>
        </div>
      </PageHero>

      <PageHero
        name="dangerZone"
        foot={<FooterButtons up="configuration" down={null} />}
        title={t("Danger Zone")}
        color="danger"
      >
        <div className="title">Delete account</div>
      </PageHero>
    </div>
  )
}
