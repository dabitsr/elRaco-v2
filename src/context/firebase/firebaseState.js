import React, { createContext, useContext, useEffect, useState } from "react"
import firebase from "firebase/app"
import "firebase/firestore"
import { UIContext } from "../UIContext"
import { UserContext } from "../UserContext"

export const firebaseContext = createContext({})

export default function FirebaseState({ children }) {
  const [fb, setFb] = useState(null)
  const { ui } = useContext(UIContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    var firebaseConfig = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_DATABASE_URL,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
    }
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
    const bd = firebase.firestore().collection("users")

    setFb({
      getUsers: async () => {
        bd.get()
          .then(snapshot =>
            snapshot.docs.map(doc =>
              console.log(`${doc.id}: ${doc.data().name}`)
            )
          )
          .catch(e => console.log(e))
      },

      addUser: async user => {
        let ref = bd.doc(user)
        if (!ref.get()) ref.set({ date: new Date() })
      },

      addUi: async (user, ui) => {
        let ref = bd.doc(user)
        ref.set({ ...ref, theme: ui.theme ? ui.theme : "dark" })
      },
    })
  }, [])

  useEffect(() => {
    if (ui && fb && user && user.username) fb.addUi(user.username, ui)
  }, [ui])

  return (
    <firebaseContext.Provider value={{ fb }}>
      {children}
    </firebaseContext.Provider>
  )
}
