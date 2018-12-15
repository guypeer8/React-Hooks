import React from 'react';
import { getStore } from '../Providers/Store';
import { useValidation } from '../../Helpers/FormHelpers';

const Login = ({ history }) => {
    const { state, dispatch } = getStore();
    const { username, password, error } = state.auth;

    const login = (e) => {
        e.preventDefault();
        if (!useValidation({ state, dispatch }))
            return;

        dispatch.auth({
            type: 'SET_USER',
            username,
        });

        history.push('/all');
    };

    const signup = () => {
        dispatch.auth({ type: 'CLEAR_ERROR' });
        history.push('/signup')
    };

    const updateUser = (e) => {
        const attr = e.target.getAttribute('name');
        const value = e.target.value;

        const payload = (
            attr === 'username'
                ? {username: value}
                : {password: value}
        );

        dispatch.auth({
            type: 'UPDATE_USER',
            ...payload,
        });
    };

    return (
        <div className='Auth-Form'>
            <h4>Login</h4>
            <form onSubmit={login}>
                <div>
                    <input
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={username}
                        onChange={updateUser}
                    />
                </div>
                {error.type === 'username' ? <div className='alert-danger'>{error.message}</div> : null}
                <div>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={password}
                        onChange={updateUser}
                    />
                </div>
                {error.type === 'password' ? <div className='alert-danger'>{error.message}</div> : null}
                <div>
                    <button
                        type='submit'
                    >
                        Login
                    </button>
                </div>
                <div>
                    <span>Don't have an account ?</span> {' '}
                    <span
                        className='Navigate-Auth'
                        onClick={signup}
                    >
                        Signup
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Login;
