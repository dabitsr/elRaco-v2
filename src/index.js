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

ReactDOM.render(
  <React.StrictMode>
    <UIContextProvider>
      <UserContextProvider>
        <UserDataState>
          <Router>
            <Layout>
              <Route path="/" exact component={Home} />
              <Route path="/subjects" component={Subjects} />
              <Route path="/schedule" component={Schedule} />
              <Route path="/profile" component={Profile} />
              <Route path="/login" component={Login} />
            </Layout>
          </Router>
        </UserDataState>
      </UserContextProvider>
    </UIContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
