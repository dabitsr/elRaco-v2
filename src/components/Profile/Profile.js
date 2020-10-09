import React, { useContext } from "react"
import i18n from "../../utils/i18n/i18n"
import PageHero from "../PageHero/PageHero"
import { firebaseContext } from "../../context/firebase/firebaseState"

export default function Profile() {
  const { fb } = useContext(firebaseContext)

  const changeLanguage = async lng => {
    i18n.changeLanguage(lng)
    if (fb && fb.active) fb.setLanguague(lng)
  }

  return (
    <PageHero>
      <div className="title">Change Languague</div>
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
  )
}
