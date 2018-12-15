import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getStore } from '../Providers/Store';
import Login from './Login';

const ProtectedRoute = ({ component: Component, rest }) => {
    const { state } = getStore();

    return (
        <Route
            {...rest}
            render={props => (
                state.auth.is_logged_in
                    ? <Component {...props} {...rest} />
                    : (
                        props.location.pathname !== '/login'
                            ? <Redirect to='/login' />
                            : <Login />
                    )
            )}
        />
    );
};

export default ProtectedRoute;
