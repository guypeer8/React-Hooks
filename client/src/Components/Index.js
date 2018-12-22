import React from "react";
import { Query } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Presentation/Navbar";
import { GET_USER } from "../GraphQL/Query";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import ProtectedRoute from "./Auth/ProtectedRoute";
import { App } from "../App";
import { getStore } from "./Providers/Store";

const AppRouter = () => (
    <Router>
        <Switch>
            <Route path='/signup' component={Signup}/>
            <Route path='/login' component={Login}/>
            <ProtectedRoute path='/:filter?' component={App}/>
        </Switch>
    </Router>
);

const Index = () => {
    const { state, dispatch } = getStore();

    const setUser = ({ id, username }) => {
        dispatch.auth({
            type: 'SET_USER',
            id,
            username,
        });
    };

    return (
        <div>
            <Navbar />
            <div className='App'>
                {
                    (state.auth.is_logged_in || state.auth.logged_out)
                        ? <AppRouter/>
                        : (
                            <Query query={GET_USER}>
                                {({ data, loading, error }) => {
                                    if (loading) return <div>Loading...</div>;
                                    if (error) return <div>{error.message}</div>;

                                    if (data && data.user && data.user.id) {
                                        setUser(data.user);
                                        return null;
                                    }

                                    return <AppRouter/>;
                                }}
                            </Query>
                        )
                }
            </div>
        </div>
    );
};

export default Index;
