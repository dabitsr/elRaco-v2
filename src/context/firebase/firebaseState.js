import React, { createContext, useContext, useEffect, useState } from "react"
import firebase from "firebase/app"
import "firebase/firestore"

export const firebaseContext = createContext({})

export default function FirebaseState({ children }) {
  const [fb, setFb] = useState(null)

  const initFb = async () => {
    const bd = firebase.firestore().collection("users")

    // Añadimos el usuario si no lo estaba ya

    let u = await fb.ref.get().then(res => res.data())
    if (!u)
      await fb.ref
        .set({ date: new Date(), theme: "dark" })
        .catch(e => console.log(e))
    else await fb.ref.update({ lastLog: new Date() })

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

      setTheme: async theme => {
        fb.ref
          .update({ theme: theme ? theme : "dark" })
          .catch(e => console.log(e))
      },

      getTheme: async () => {
        let theme = await fb.ref
          .get()
          .then(res => res.data().theme)
          .catch(e => console.log(e))
        return theme.toString()
      },

      setSubjectColor: async subjectColor => {
        fb.ref
          .update({ subjectColor: subjectColor ? subjectColor : null })
          .catch(e => console.log(e))
      },

      getSubjectColor: async () => {
        let subjectColor = await fb.ref
          .get()
          .then(res => res.data().subjectColor)
          .catch(e => console.log(e))
        return subjectColor
      },

      setSchedule: async schedule => {
        fb.ref
          .update({
            schedule,
          })
          .catch(e => console.log(e))
      },

      getSchedule: async () => {
        let schedule = await fb.ref
          .get()
          .then(res => res.data().schedule)
          .catch(e => {
            console.log(e)
            return false
          })

        return schedule
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

    /*if (sessionStorage.getItem("fb"))
      setFb(JSON.parse(sessionStorage.getItem("fb")))*/
  }, [])

  const addUser = async user => {
    setFb({
      user: user.username,
      name: user.nom,
      ref: firebase.firestore().collection("users").doc(user.username),
      ...fb,
    })
  }

  useEffect(() => {
    console.log(fb)
    if (fb && fb.user) {
      if (!fb.active) initFb()
      //else sessionStorage.setItem("fb", JSON.stringify(fb))
    }
  }, [fb])

  return (
    <firebaseContext.Provider value={{ fb, addUser }}>
      {children}
    </firebaseContext.Provider>
  )
}
