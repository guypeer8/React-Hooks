import React from 'react';
import { getStore } from '../Providers/Store';

const Login = ({ history }) => {
    const { state, dispatch } = getStore();
    const { username, password, error } = state.auth;

    const validateForm = () => {
        if (!username) {
            dispatch.auth({
                type: 'SET_ERROR',
                error: 'Please provide your username.',
            });
            return false;
        }

        if (!password) {
            dispatch.auth({
                type: 'SET_ERROR',
                error: 'Please provide a password.',
            });
            return false;
        }

        if (password.length < 6) {
            dispatch.auth({
                type: 'SET_ERROR',
                error: 'Password must include at least 6 characters.',
            });
            return false;
        }

        return true;
    };

    const login = (e) => {
        e.preventDefault();
        if (!validateForm())
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
        <div className='login'>
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
                <div>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={password}
                        onChange={updateUser}
                    />
                </div>
                <div>
                    <button
                        type='submit'
                    >
                        Login
                    </button>
                </div>
                {error ? <div className='alert-danger'>{error}</div> : null}
                <div>
                    <span>Don't have an account ?</span>
                    <span onClick={signup}>
                        Signup
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Login;
