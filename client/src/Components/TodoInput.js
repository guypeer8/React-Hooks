import React, { useRef, useEffect } from 'react';
import { getStore } from './Providers/Store';

let nextTodoId = 1;
const createTodo = value => ({
    id: nextTodoId++,
    text: value,
    completed: false,
});

const TodoInput = () => {
    const { state, dispatch } = getStore();

    const $inputEl = useRef(null);

    const createNewTodo = () => {
        const text = state.todoInput.text.trim();
        if (!text) return;

        (state.todoInput.id
            ? dispatch.todos({
                type: 'EDIT_TODO',
                id: state.todoInput.id,
                text,
            })
            : dispatch.todos({
                type: 'ADD_TODO',
                ...createTodo(text),
            })
        );

        dispatch.todoInput({
            type: 'CLEAR_TODO',
        });

        focusInput();
    };

    const actionButtonText = `${state.todoInput.id ? 'Edit' : 'Add'} Todo`;

    const onChange = (e) => dispatch.todoInput({
        type: 'CHANGE_TODO',
        text: e.target.value,
    });

    const onKeyPress = (e) => (
        (e.key === 'Enter')
        && createNewTodo()
    );

    const focusInput = () =>
        $inputEl.current.focus();

    useEffect(focusInput);

    return (
        <div className='Todo-Input'>
            <input
                type='text'
                placeholder='Add Todo'
                value={state.todoInput.text}
                onChange={onChange}
                onKeyPress={onKeyPress}
                ref={$inputEl}
            />
            <button onClick={createNewTodo}>
                {actionButtonText}
            </button>
        </div>
    );
};

export default TodoInput;
