import React, { useContext } from 'react';
import PropTypes from "prop-types";
import AppContext from '../Contexts/AppContext';

const Todo = ({ id, text, completed }) => {
    const dispatch = useContext(AppContext);

    const onToggleTodo = () => dispatch({
        type: 'TOGGLE_TODO',
        id,
    });

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
