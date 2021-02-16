import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, path, calorieLimit, calorieNeeds, ...rest }) => {
    const { loading, isAuthenticated, loginWithRedirect } = useAuth0();
    useEffect(() => {
        if (loading || isAuthenticated) {
            return;
        }
        const fn = async () => {
            await loginWithRedirect({
                appState: { targetUrl: window.location.pathname }
            });
        };
        fn();
    }, [loading, isAuthenticated, loginWithRedirect, path]);

    const render = props =>
        isAuthenticated === true ? <Component {...props} /> : null;

    return ((calorieNeeds && calorieLimit && isAuthenticated) ? <Route path={path} render={(rest) => render(rest)} {...rest} /> : <Redirect to='/set-up' />);
};

export default PrivateRoute;
