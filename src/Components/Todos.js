import React, { useContext } from 'react';
import PropTypes from "prop-types";
import FiltersContext from '../Contexts/FiltersContext';
import Todo from "./Todo";

const Todos = ({ todos }) => {
    const filter = useContext(FiltersContext);
    const visibleTodos = getVisibleTodos(todos, filter);

    return (
        <div>
            {visibleTodos.map(todo => (
                <Todo
                    key={todo.id}
                    {...todo}
                />
            ))}
        </div>
    );
};

Todos.defaultProps = {
    todos: [],
};

Todos.propTypes = {
    todos: PropTypes.array.isRequired,
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
}

export default Todos;
