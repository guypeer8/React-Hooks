import React, { useRef, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import { getStore } from './Providers/Store';
import { ADD_TODO, EDIT_TODO } from '../GraphQL/Mutation';

const createTodo = (id, text) => ({
    id,
    text,
    completed: false,
});

const TodoInput = () => {
    const { state, dispatch } = getStore();
    const { id, text } = state.todoInput;

    const $inputEl = useRef(null);

    const canMutate = () => {
        const _text = text.trim();
        if (!_text)
            return false;

        if (text !== _text) {
            dispatch.todoInput({
                type: 'CHANGE_TODO',
                text: _text,
            });
        }

        return true;
    };

    const postEditTodo = () => {
        dispatch.todos({
            type: 'EDIT_TODO',
            id,
            text,
        });

        clearTodo();
        focusInput();
    };

    const postAddTodo = ({ addTodo: { id } }) => {
        dispatch.todos({
            type: 'ADD_TODO',
            ...createTodo(id, text),
        });

        clearTodo();
        focusInput();
    };


    const onChange = (e) => dispatch.todoInput({
        type: 'CHANGE_TODO',
        text: e.target.value,
    });

    const clearTodo = () =>  dispatch.todoInput({
        type: 'CLEAR_TODO',
    });

    const focusInput = () =>
        $inputEl.current.focus();

    useEffect(focusInput);

    if (id) {
        return (
            <Mutation
                mutation={EDIT_TODO}
                variables={{ text, id }}
                onCompleted={postEditTodo}
            >
                {(editTodo, { loading }) => (
                    <div className='Todo-Input'>
                        <input
                            type='text'
                            placeholder='Edit Todo'
                            value={text}
                            onChange={onChange}
                            onKeyPress={e => (
                                (e.key === 'Enter')
                                && canMutate()
                                && editTodo()
                            )}
                            disabled={loading}
                            ref={$inputEl}
                        />
                        <button onClick={() =>
                            canMutate() && editTodo()
                        }>
                            Edit Todo
                        </button>
                    </div>
                )}
            </Mutation>
        );
    }

    return (
        <Mutation
            mutation={ADD_TODO}
            variables={{ text }}
            onCompleted={postAddTodo}
        >
            {(addTodo, { loading }) => (
                <div className='Todo-Input'>
                    <input
                        type='text'
                        placeholder='Add Todo'
                        value={text}
                        onChange={onChange}
                        onKeyPress={e => (
                            (e.key === 'Enter')
                            && canMutate()
                            && addTodo()
                        )}
                        disabled={loading}
                        ref={$inputEl}
                    />
                    <button onClick={() =>
                        canMutate() && addTodo()
                    }>
                        Add Todo
                    </button>
                </div>
            )}
        </Mutation>
    );
};

export default TodoInput;
