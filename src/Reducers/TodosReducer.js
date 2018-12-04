const todosReducer = (todos, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            const { id, text, completed } = action;
            return [...todos, {id, text, completed}];

        case 'TOGGLE_TODO':
            return todos.map(todo =>
                todo.id === action.id
                    ? {...todo, completed: !todo.completed}
                    : todo
            );

        default:
            return todos;
    }
}

export default todosReducer;
