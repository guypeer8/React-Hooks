import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { getStore } from './Providers/Store';

const Todo = ({ id, text, completed, index }) => {
    const { dispatch } = getStore();

    const onToggleTodo = () => dispatch.todos({
        type: 'TOGGLE_TODO',
        id,
    });

    const startEdit = () => {
        !completed && dispatch.todoInput({
            type: 'START_EDIT',
            id,
            text,
        });
    };

    const deleteTodo = () => dispatch.todos({
        type: 'DELETE_TODO',
        id,
    });

    return (
        <li>
            <span>{index}.{' '}</span>
            <input
                type="checkbox"
                checked={completed}
                onChange={onToggleTodo}
            />
            <span
                style={{
                    textDecoration: completed ? 'line-through' : 'none'
                }}
                onClick={startEdit}
            >
                {text}
            </span>
            <span>
                <button onClick={startEdit}>
                    <FaEdit/>
                </button>
                <button onClick={deleteTodo}>
                    <FaTimes/>
                </button>
            </span>
        </li>
    );
};

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
};

export default Todo;
