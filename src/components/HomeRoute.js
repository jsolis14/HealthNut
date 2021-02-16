import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth0 } from '../react-auth0-spa';

//asdsadsadasad
const HomeRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return (
            <Redirect to='/calorie-tracker' />
        )
    } else {
        return (
            <Redirect to='/login' />
        )
    }

}

export default HomeRoute;
