import React from 'react';
import { getStore } from '../Providers/Store';

const Signup = ({ history }) => {
    const { state, dispatch } = getStore();
    const { username, password, confirm, error } = state.auth;

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

        if (password !== confirm) {
            dispatch.auth({
                type: 'SET_ERROR',
                error: 'Passwords do not match.',
            });
            return false;
        }

        return true;
    };

    const signup = (e) => {
        e.preventDefault();
        if (!validateForm())
            return;

        dispatch.auth({
            type: 'SET_USER',
            username,
        });

        history.push('/all');
    };

    const login = () => {
        dispatch.auth({ type: 'CLEAR_ERROR' });
        history.push('/login');
    };

    const updateUser = (e) => {
        const attr = e.target.getAttribute('name');
        const value = e.target.value;

        const payload = (
            attr === 'username'
                ? {username: value}
                : (
                    attr === 'password'
                        ? {password: value}
                        : {confirm: value}
                )
        );

        dispatch.auth({
            type: 'UPDATE_USER',
            ...payload,
        });
    };

    return (
        <div className='signup'>
            <h4>Signup</h4>
            <form onSubmit={signup}>
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
                    <input
                        type='password'
                        name='confirm'
                        placeholder='Confirm Password'
                        value={confirm}
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
                    <span>Already have an account?</span>
                    <span onClick={login}>
                        Login
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Signup;
