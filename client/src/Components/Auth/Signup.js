import React from 'react';
import { Mutation } from 'react-apollo';
import { getStore } from '../Providers/Store';
import { SIGN_USER } from '../../GraphQL/Mutation/Auth';
import { useValidation } from '../../Helpers/FormHelpers';

const Signup = ({ history }) => {
    const { state, dispatch } = getStore();
    const { username, password, confirm, error } = state.auth;

    const canSubmit = () =>
        useValidation({ state, dispatch, confirm_pwd: true });

    const signupError = () => (
        dispatch.auth({
            type: 'SET_ERROR',
            error: {
                type: 'confirm',
                message: 'Failed to sign up.',
            },
        })
    );

    const postSignup = ({ signUser }) => {
        if (!(signUser && signUser.id))
            return signupError();

        dispatch.auth({
            type: 'SET_USER',
            id: signUser.id,
            username: signUser.username,
        });

        history.push('/all');
    };

    const login = () => {
        dispatch.auth({ type: 'CLEAR_ERROR' });
        history.push('/login');
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
            mutation={SIGN_USER}
            variables={{ username, password }}
            onCompleted={postSignup}
        >
            {(signUser, { loading }) => (
                <div className='Auth-Form'>
                    <h4>Sign Up</h4>
                    <form onSubmit={e => {
                        e.preventDefault();
                        if (canSubmit())
                            signUser();
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
                            <input
                                type='password'
                                name='confirm'
                                placeholder='Confirm Password'
                                value={confirm}
                                onChange={e =>
                                    updateUser(e.target.value, 'confirm')
                                }
                            />
                        </div>
                        <FormError type='confirm' />
                        <div>
                            <button
                                type='submit'
                                disabled={loading}
                            >
                                Submit
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
            )}
        </Mutation>
    );
};

export default Signup;
