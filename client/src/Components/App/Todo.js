import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { FaTimes, FaEdit, FaBan } from 'react-icons/fa';
import { getStore } from '../Providers/Store';
import { TOGGLE_TODO, DELETE_TODO } from '../../GraphQL/Mutation/Todos';

const Todo = ({ id, text, completed, index }) => {
    const { state, dispatch } = getStore();

    const startEdit = () => (
        !completed
        && dispatch.todoInput({
            type: 'START_EDIT',
            id,
            text,
        })
    );

    const postToggleTodo = () => (
        dispatch.todos({
            type: 'TOGGLE_TODO',
            id,
        })
    );

    const postDeleteTodo = () => (
        dispatch.todos({
            type: 'DELETE_TODO',
            id,
        })
    );

    return (
        <li>
            <span>{index}.{' '}</span>
            <Mutation
                mutation={TOGGLE_TODO}
                variables={{
                    user_id: state.auth.id,
                    id,
                }}
                onCompleted={postToggleTodo}
            >
                {(toggleTodo, { loading }) => (
                    <input
                        type="checkbox"
                        checked={completed}
                        disabled={loading}
                        onChange={toggleTodo}
                    />
                )}
            </Mutation>

            <span
                onClick={startEdit}
                className='todo-text'
                style={{
                    textDecoration: completed ? 'line-through': 'none'
                }}
            >
            {text}
            </span>
            <span>
                <button
                    onClick={startEdit}
                    disabled={completed}
                    style={{
                        cursor: completed ? 'not-allowed' : ''
                    }}
                >
                    {completed ? <FaBan/> : <FaEdit/>}
                </button>
                <Mutation
                    mutation={DELETE_TODO}
                    variables={{
                        user_id: state.auth.id,
                        id,
                    }}
                    onCompleted={postDeleteTodo}
                >
                    {(deleteTodo, { loading }) => (
                        <button
                            disabled={loading}
                            onClick={deleteTodo}
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
