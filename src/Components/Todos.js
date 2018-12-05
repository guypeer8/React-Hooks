import React, { useContext } from 'react';
import AppContext from '../Contexts/AppContext';
import Todo from "./Todo";

const Todos = () => {
    const context =  useContext(AppContext);
    const { todos, filter } = context.data;
    const visibleTodos = getVisibleTodos(todos, filter);

    return (
        <ul className='Todos-Container'>
            {visibleTodos.map(todo =>
                <Todo key={todo.id} {...todo} />
            )}
        </ul>
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
