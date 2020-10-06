import React, { createContext, useContext, useEffect, useState } from "react"
import firebase from "firebase/app"
import "firebase/firestore"

export const firebaseContext = createContext({})

export default function FirebaseState({ children }) {
  const [fb, setFb] = useState(null)

  const initFb = async () => {
    const bd = firebase.firestore().collection("users")

    // Añadimos el usuario si no lo estaba ya
    let ref = bd.doc(fb.user)
    let u = await ref.get()
    if (!u.data())
      await ref
        .set({ date: new Date(), theme: "dark" })
        .catch(e => console.log(e))

    //Creamos el objeto fb para usar firebase
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

  const addUser = async user => {
    setFb({ user, ...fb })
  }

  useEffect(() => {
    console.log(fb)
    if (fb && fb.user && !fb.active) initFb()
  }, [fb])

  return (
    <firebaseContext.Provider value={{ fb, addUser }}>
      {children}
    </firebaseContext.Provider>
  )
}
