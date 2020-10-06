import React, { createContext, useContext, useEffect, useState } from "react"
import firebase from "firebase/app"
import "firebase/firestore"

export const firebaseContext = createContext({})

export default function FirebaseState({ children }) {
  const [fb, setFb] = useState(null)

  const initFb = async () => {
    const bd = firebase.firestore().collection("users")

    setFb({
      ...fb,
      active: true,
      getUsers: async () => {
        bd.get()
          .then(snapshot =>
            snapshot.docs.map(doc =>
              console.log(`${doc.id}: ${doc.data().name}`)
            )
          )
          .catch(e => console.log(e))
      },

      addUser: async () => {
        let ref = bd.doc(fb.user)
        if (!ref.get()) ref.set({ date: new Date() })
      },

      setTheme: async theme => {
        let ref = bd.doc(fb.user)
        ref.update({ theme: theme ? theme : "dark" })
      },

      getTheme: async () => {
        let ref = bd.doc(fb.user)
        let theme = await ref.get().then(res => res.data().theme)
        console.log(theme)
        return theme.toString()
      },

      setSubjectColor: async subjectColor => {
        let ref = bd.doc(fb.user)
        ref.update({ subjectColor: subjectColor ? subjectColor : null })
      },

      getSubjectColor: async () => {
        let ref = bd.doc(fb.user)
        let subjectColor = await ref.get().then(res => res.data().subjectColor)
        console.log(subjectColor)
        return subjectColor
      },
    })
  }

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
  }, [])

  const addUser = user => {
    setFb({ user })
  }

  useEffect(() => {
    if (fb && fb.user && !fb.active) {
      initFb()
    }
  }, [fb])

  return (
    <firebaseContext.Provider value={{ fb, addUser }}>
      {children}
    </firebaseContext.Provider>
  )
}
