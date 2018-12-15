const initialState = {
    username: '',
    password: '',
    confirm: '',
    error: {
        message: '',
        type: '',
    },
    is_logged_in: false,
};

const authReducer = (auth = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...auth,
                ...(action.username ? {username: action.username} : {}),
                ...(action.password ? {password: action.password} : {}),
                ...(action.confirm ? {confirm: action.confirm} : {}),
            };

        case 'SET_USER':
            return {
                ...auth,
                username: action.username,
                is_logged_in: true,
            };

        case 'SET_LOGOUT':
            return initialState;

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
