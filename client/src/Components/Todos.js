import React from 'react';
import { getStore } from './Providers/Store';
import Todo from './Todo';

const Todos = () => {
    const { state } = getStore();

    const visibleTodos = getVisibleTodos(state.todos, state.filter);

    if (visibleTodos.length > 0) {
        return (
            <ul className='Todos-Container'>
                <TodosHeader />
                <div className='Todos-List'>
                    {visibleTodos.map((todo, index) =>
                        <Todo
                            key={todo.id}
                            {...todo}
                            index={index + 1}
                        />
                    )}
                </div>
            </ul>
        );
    }

    return null;
};

const TodosHeader = () => (
    <>
        <li className='Todos-Header'>
            <span>#.</span>
            <span>Status</span>
            <span>Todo</span>
            <span>Delete</span>
        </li>
        <hr />
    </>
);

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
