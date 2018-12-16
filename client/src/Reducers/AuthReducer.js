const initialState = {
    id: null,
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
                ...(action.id ? {id: action.id} : {}),
                ...(action.username ? {username: action.username} : {}),
                ...(action.password ? {password: action.password} : {}),
                ...(action.confirm ? {confirm: action.confirm} : {}),
            };

        case 'SET_USER':
            return {
                ...auth,
                id: action.id,
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
