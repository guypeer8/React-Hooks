import { AUTH as initialState } from './InitialState';

const authReducer = (auth = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            delete action.type;
            return {
                ...auth,
                ...action,
            };

        case 'SET_USER':
            return {
                ...auth,
                id: action.id,
                username: action.username,
                is_logged_in: true,
                logged_out: false,
            };

        case 'LOGOUT':
            return {
                ...initialState,
                logged_out: true,
            };

        case 'SET_ERROR':
            return {
                ...auth,
                error: {
                    ...auth.error,
                    ...action.error,
                },
            };

        case 'CLEAR_ERROR':
            return {
                ...auth,
                error: {
                    message: '',
                    type: '',
                },
            };

        default:
            return initialState;
    }
};

export default authReducer;
