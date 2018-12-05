import React, { useContext } from 'react';
import PropTypes from "prop-types";
import AppContext from '../Contexts/AppContext';

const Todo = ({ id, text, completed }) => {
    const { dispatchTodos, dispatchTodoInput } = useContext(AppContext);

    const onToggleTodo = () => dispatchTodos({
        type: 'TOGGLE_TODO',
        id,
    });

    const onTextClick = () => {
        !completed && dispatchTodoInput({
            type: 'START_EDIT',
            id,
            text,
        });
    };

    return (
        <li>
            <input
                type="checkbox"
                checked={completed}
                onChange={onToggleTodo}
            />
            <span
                style={{
                    textDecoration: completed ? 'line-through' : 'none'
                }}
                onClick={onTextClick}
            >
                {text}
            </span>
        </li>
    );
};

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
};

export default Todo;
