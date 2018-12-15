export function useValidation({ state, dispatch, confirm_pwd = false }) {
    let { username, password, confirm } = state.auth;
    [username, password, confirm].forEach(field => field = field.trim);

    const setError = (message, type) => {
        dispatch.auth({
            type: 'SET_ERROR',
            error: {
                type,
                message,
            },
        });
    };

    if (!username) {
        setError('Please provide your username.', 'username');
        return false;
    }

    if (!password.trim()) {
        setError('Please provide a password.', 'password');
        return false;
    }

    if (password.length < 6) {
        setError('Password must include at least 6 characters.', 'password');
        return false;
    }

    if (confirm_pwd && (password !== confirm)) {
        setError('Passwords do not match.', 'confirm');
        return false;
    }

    return true;
};
