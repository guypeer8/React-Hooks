import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { getStore } from './Providers/Store';
import { TOGGLE_TODO, DELETE_TODO } from '../GraphQL/Mutation';

const Todo = ({ id, text, completed, index }) => {
    const { dispatch } = getStore();

    const startEdit = () => (
        !completed
        && dispatch.todoInput({
            type: 'START_EDIT',
            id,
            text,
        })
    );

    return (
        <li>
            <span>{index}.{' '}</span>
            <Mutation
                mutation={TOGGLE_TODO}
                variables={{id}}
            >
                {(toggleTodo, { loading }) => (
                    <input
                        type="checkbox"
                        checked={completed}
                        disabled={loading}
                        onChange={() => {
                            toggleTodo();
                            dispatch.todos({
                                type: 'TOGGLE_TODO',
                                id,
                            });
                        }}
                    />
                )}
            </Mutation>

            <span
                onClick={startEdit}
                style={{
                    textDecoration: (
                        completed
                            ? 'line-through'
                            : 'none'
                    )
                }}
            >
            {text}
        </span>
            <span>
            <button onClick={startEdit}>
                <FaEdit/>
            </button>
            <Mutation
                mutation={DELETE_TODO}
                variables={{id}}
            >
                {(deleteTodo, { loading }) => (
                    <button
                        disabled={loading}
                        onClick={() => {
                            deleteTodo();
                            dispatch.todos({
                                type: 'DELETE_TODO',
                                id,
                            });
                        }}
                    >
                        <FaTimes/>
                    </button>
                )}
            </Mutation>
        </span>
        </li>
    );
};

Todo.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
};

export default Todo;
