import React from 'react';
import { getStore } from '../Providers/Store';
import Login from './Login';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, rest }) => {
    const { state } = getStore();

    return (
        <Route
            {...rest}
            render={props => {
                if (state.auth.is_logged_in)
                    return <Component {...props} />;

                if (props.location.pathname !== '/login')
                    return <Redirect to='/login'/>;

                return <Login/>;
            }}
        />
    );
};

export default PrivateRoute;
