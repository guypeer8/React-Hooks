const todosReducer = (todos = [], action) => {
    switch (action.type) {
        case 'APPEND_TODOS':
            return [...todos, ...action.todos];

        case 'ADD_TODO':
            const { id, text, completed } = action;
            return [...todos, {id, text, completed}];

        case 'EDIT_TODO':
            return todos.map(todo =>
                todo.id === action.id
                    ? {...todo, text: action.text}
                    : todo
            );

        case 'TOGGLE_TODO':
            return todos.map(todo =>
                todo.id === action.id
                    ? {...todo, completed: !todo.completed}
                    : todo
            );

        case 'DELETE_TODO':
            return todos.filter(({id}) => id !== action.id);

        case 'DELETE_COMPLETED':
            return todos.filter(({completed}) => !completed);

        default:
            return todos;
    }
};

export default todosReducer;
