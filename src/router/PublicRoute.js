import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from "../context/AuthContext"


const PublicRoute = ({ component: Component, restricted, ...rest }) => {

    const user = useContext(AuthContext)

    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            user.userInfo && restricted ?
                <Redirect to="/dashboard" />
                :
                <Component {...props} />
        )} />
    );
};

export default PublicRoute;