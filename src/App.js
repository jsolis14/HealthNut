import React from "react";
import { Router } from "react-router-dom";
import history from "./utils/history";
import ResponsiveApp from './ResponsiveApp';
import { useAuth0 } from './react-auth0-spa';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '99%',
    height: '98%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
}));

function App() {
  const classes = useStyles();
  const { loading } = useAuth0();

  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>

    )
  }

  return (
    <div className="App">
      <Router history={history}>
        <ResponsiveApp />
      </Router>
    </div>
  );
}

export default App;
