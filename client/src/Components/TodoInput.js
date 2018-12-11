import React, { useRef, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import { getStore } from './Providers/Store';
import { ADD_TODO, EDIT_TODO } from '../GraphQL/Mutation';

let nextTodoId = 1;
const createTodo = value => ({
    id: nextTodoId++,
    text: value,
    completed: false,
});

const TodoInput = () => {
    const { state, dispatch } = getStore();
    const { id, text } = state.todoInput;

    const $inputEl = useRef(null);

    const setTodo = setTodoMutation => {
        const _text = text.trim();
        if (!_text)
            return;

        setTodoMutation();

        (state.todoInput.id
            ? dispatch.todos({
                type: 'EDIT_TODO',
                id,
                text: _text,
            })
            : dispatch.todos({
                type: 'ADD_TODO',
                ...createTodo(_text),
            })
        );

        dispatch.todoInput({
            type: 'CLEAR_TODO',
        });

        focusInput();
    };

    const actionButtonText = `${id ? 'Edit' : 'Add'} Todo`;

    const onChange = (e) => dispatch.todoInput({
        type: 'CHANGE_TODO',
        text: e.target.value,
    });

    const focusInput = () =>
        $inputEl.current.focus();

    useEffect(focusInput);

    return (
        <Mutation
            mutation={id ? EDIT_TODO : ADD_TODO}
            variables={{
                text,
                ...(id ? {id} : {})
            }}
        >
            {(setTodoMutation, { loading }) => (
                <div className='Todo-Input'>
                    <input
                        type='text'
                        placeholder='Add Todo'
                        value={text}
                        onChange={onChange}
                        onKeyPress={e => (
                            (e.key === 'Enter')
                            && setTodo(setTodoMutation)
                        )}
                        disabled={loading}
                        ref={$inputEl}
                    />
                    <button onClick={() => setTodo(setTodoMutation)}>
                        {actionButtonText}
                    </button>
                </div>
            )}
        </Mutation>
    );
};

export default TodoInput;
