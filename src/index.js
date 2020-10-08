import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bulma"
import Home from "./components/Home"
import Subjects from "./components/Subjects"
import Schedule from "./components/Schedule"
import Profile from "./components/Profile"
import UIContextProvider from "./context/UIContext"
import UserContextProvider from "./context/UserContext"
import UserDataState from "./context/userData/userDataState"
import Login from "./components/Login/Login"
import Layout from "./components/Layout/Layout"
import FirebaseState from "./context/firebase/firebaseState"
import AuthState from "./context/auth/authState"

//Los contextes DEBEN tener este orden!!

ReactDOM.render(
  <FirebaseState>
    <AuthState>
      <UIContextProvider>
        <UserDataState>
          <Router>
            <Layout>
              <Route path="/login" exact component={Login} />
              <Route path="/" exact component={Home} />
              <Route path="/subjects" component={Subjects} />
              <Route path="/schedule" component={Schedule} />
              <Route path="/profile" component={Profile} />
            </Layout>
          </Router>
        </UserDataState>
      </UIContextProvider>
    </AuthState>
  </FirebaseState>,
  document.getElementById("root")
)
