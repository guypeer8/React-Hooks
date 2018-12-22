import React from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { getStore } from '../Providers/Store';
import { LOGOUT_USER } from '../../GraphQL/Mutation/Auth';

const Navbar = () => {
    const { state, dispatch } = getStore();

    const setLogout = apolloClient =>
        apolloClient.clearStore() && resetClientState();

    const resetClientState = () => {
        dispatch.auth({ type: 'LOGOUT' });
        dispatch.todos({ type: 'CLEAR_TODOS' });
        dispatch.todoInput({ type: 'CLEAR_TODO' });
    };

    const Logout = apolloClient => (
        <Mutation
            mutation={LOGOUT_USER}
            onCompleted={() =>
                setLogout(apolloClient)
            }
        >
            {(logout, { loading }) => (
                <Router>
                    <div className='User'>
                        <span>
                            Hello <strong>{state.auth.username}</strong>!
                        </span>
                        <NavLink to='/login'>
                            <button
                                onClick={logout}
                                disabled={loading}
                                className='Logout-Button'
                            >
                                Logout
                            </button>
                        </NavLink>
                    </div>
                </Router>
            )}
        </Mutation>
    );

    return (
        <div className='Navbar'>
            <span>React Hooks - Todo App</span>
            {!state.auth.is_logged_in ? null : (
                <ApolloConsumer>
                    {Logout}
                </ApolloConsumer>
            )}
        </div>
    );
};

export default Navbar;
