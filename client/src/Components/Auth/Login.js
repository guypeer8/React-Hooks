import React from 'react';
import { Mutation } from 'react-apollo';
import { getStore } from '../Providers/Store';
import { LOGIN_USER } from '../../GraphQL/Mutation/Auth';
import { useValidation } from '../../Helpers/FormHelpers';

const Login = ({ history }) => {
    const { state, dispatch } = getStore();
    const { username, password, error } = state.auth;

    const canSubmit = () =>
        useValidation({ state, dispatch });

    const loginError = () => (
        dispatch.auth({
            type: 'SET_ERROR',
            error: {
                type: 'password',
                message: 'Incorrect username or password.',
            },
        })
    );

    const postLogin = ({ loginUser }) => {
        if (!(loginUser && loginUser.id))
            return loginError();

        dispatch.auth({
            type: 'SET_USER',
            id: loginUser.id,
            username: loginUser.username,
        });

        history.push('/all');
    };

    const signup = () => {
        dispatch.auth({ type: 'CLEAR_ERROR' });
        history.push('/signup')
    };

    const updateUser = (value, key) => {
        dispatch.auth({
            type: 'UPDATE_USER',
            [key]: value,
        });
    };

    const FormError = ({ type }) => (
        error.type === type
            ? (
                <div className='alert-danger'>
                    {error.message}
                </div>
            ) : null
    );

    return (
        <Mutation
            mutation={LOGIN_USER}
            variables={{ username, password }}
            onCompleted={postLogin}
        >
            {(loginUser, { loading }) => (
                <div className='Auth-Form'>
                    <h4>Login</h4>
                    <form onSubmit={e => {
                        e.preventDefault();
                        if (canSubmit())
                            loginUser();
                    }}>
                        <div>
                            <input
                                type='text'
                                name='username'
                                placeholder='Username'
                                value={username}
                                onChange={e =>
                                    updateUser(e.target.value, 'username')
                                }
                            />
                        </div>
                        <FormError type='username' />
                        <div>
                            <input
                                type='password'
                                name='password'
                                placeholder='Password'
                                value={password}
                                onChange={e =>
                                    updateUser(e.target.value, 'password')
                                }
                            />
                        </div>
                        <FormError type='password' />
                        <div>
                            <button
                                type='submit'
                                disabled={loading}
                            >
                                Submit
                            </button>
                        </div>
                        <div>
                            <span>Don't have an account ?</span> {' '}
                            <span
                                className='Navigate-Auth'
                                onClick={signup}
                            >
                                Sign Up
                            </span>
                        </div>
                    </form>
                </div>
            )}
        </Mutation>
    );
};

export default Login;
