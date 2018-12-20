import React from 'react';
import { Mutation } from 'react-apollo';
import { getStore } from '../Providers/Store';
import { LOGOUT_USER } from '../../GraphQL/Mutation/Auth';

const Navbar = () => {
    const { state, dispatch } = getStore();

    const logoutClient = () =>
        dispatch.auth({ type: 'LOGOUT' });

    return (
        <div className='Navbar'>
            <span>React Hooks - Todo App</span>
            {!state.auth.is_logged_in ? null : (
                <Mutation
                    mutation={LOGOUT_USER}
                    onCompleted={logoutClient}
                >
                    {(logout, { loading }) => (
                        <div className='User'>
                            <span>
                                Hello <strong>{state.auth.username}</strong>!
                            </span>
                            <button
                                onClick={logout}
                                disabled={loading}
                                className='Logout-Button'
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </Mutation>
            )}
        </div>
    );
};

export default Navbar;
