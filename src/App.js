// src/App.js

import React from "react";
import NavBar from "./components/NavBar";

// New - import the React Router components, and the Profile page component
import { Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import ResponsiveApp from './ResponsiveApp';
import { useAuth0 } from './react-auth0-spa';

function App() {
  const { loading } = useAuth0();
  if (loading) {
    return 'loading'
  }
  return (
    <div className="App">
      {/* Don't forget to include the history module */}


      <Router history={history}>
        <ResponsiveApp />
        {/* <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch> */}
      </Router>
    </div>
  );
}

export default App;
