import React from 'react';
import { getStore } from '../Providers/Store';
import { useValidation } from '../../Helpers/FormHelpers';

const Signup = ({ history }) => {
    const { state, dispatch } = getStore();
    const { username, password, confirm, error } = state.auth;

    const signup = (e) => {
        e.preventDefault();
        if (!useValidation({ state, dispatch, confirm_pwd: true }))
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
        <div className='Auth-Form'>
            <h4>Sign Up</h4>
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
                    <input
                        type='password'
                        name='confirm'
                        placeholder='Confirm Password'
                        value={confirm}
                        onChange={updateUser}
                    />
                </div>
                {error.type === 'confirm' ? <div className='alert-danger'>{error.message}</div> : null}
                <div>
                    <button
                        type='submit'
                    >
                        Login
                    </button>
                </div>
                <div>
                    <span>Already have an account ?</span> {' '}
                    <span
                        className='Navigate-Auth'
                        onClick={login}
                    >
                        Login
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Signup;
