import React, { createContext, useEffect, useState } from "react"
import firebase from "firebase/app"
import "firebase/firestore"

export const firebaseContext = createContext({})

export default function FirebaseState({ children }) {
  const [db, setDB] = useState(null)
  const [usersCol, setUsersCol] = useState(null)

  const getUsers = async user => {
    console.log("HEY")
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(snapshot =>
        snapshot.docs.map(doc => console.log(`${doc.id}: ${doc.data().name}`))
      )
      .catch(e => console.log(e))
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
    setDB(firebase.firestore())
  }, [])

  useEffect(() => {
    if (db) setUsersCol(db.collection("users"))
  }, [db])

  return (
    <firebaseContext.Provider value={{ getUsers }}>
      {children}
    </firebaseContext.Provider>
  )
}
