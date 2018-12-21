const initialState = {
    data: [],
    fetched: false,
};

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FETCHED':
            return {
                ...state,
                fetched: true,
            };

        case 'SET_UNFETCHED':
            return {
                ...state,
                fetched: false,
            };

        case 'APPEND_TODOS':
            return {
                ...state,
                data: [
                    ...state.data,
                    ...action.todos,
                ],
            };

        case 'ADD_TODO':
            const { id, text, completed } = action;
            return {
                ...state,
                data: [
                    ...state.data,
                    {id, text, completed},
                ],
            };

        case 'EDIT_TODO':
            return {
                ...state,
                data: state.data.map(todo =>
                    todo.id === action.id
                        ? {...todo, text: action.text}
                        : todo
                ),
            };

        case 'TOGGLE_TODO':
            return {
                ...state,
                data: state.data.map(todo =>
                    todo.id === action.id
                        ? {...todo, completed: !todo.completed}
                        : todo
                ),
            };

        case 'DELETE_TODO':
            return {
                ...state,
                data: state.data.filter(({id}) => id !== action.id),
            };

        case 'DELETE_COMPLETED':
            return {
                ...state,
                data: state.data.filter(({completed}) => !completed),
            };

        case 'CLEAR_TODOS':
            return initialState;

        default:
            return initialState;
    }
};

export default todosReducer;
