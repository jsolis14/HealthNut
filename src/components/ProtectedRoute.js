import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '../react-auth0-spa';
import LoginPage from './loginPage/LoginPage';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return (
            <Route {...rest} render={
                props => <Component {...rest} {...props} />
            } />
        )
    } else {
        return (
            <Redirect to='/login' />
        )
    }

}

export default ProtectedRoute;
