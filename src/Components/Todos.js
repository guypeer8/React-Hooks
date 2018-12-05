import React, { useContext } from 'react';
import AppContext from '../Contexts/AppContext';
import Todo from "./Todo";

const Todos = () => {
    const {todos, filter} = useContext(AppContext);
    const visibleTodos = getVisibleTodos(todos, filter);

    return (
        <div>
            {visibleTodos.map(todo =>
                <Todo key={todo.id} {...todo} />
            )}
        </div>
    );
};

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'active':
            return todos.filter(({completed}) => !completed);
        case 'completed':
            return todos.filter(({completed}) => completed);
        default:
            return todos;
    }
};

export default Todos;
