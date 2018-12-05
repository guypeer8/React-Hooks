import React, { useContext, useRef, useEffect } from 'react';
import AppContext from '../Contexts/AppContext';

let nextTodoId = 1;
const createTodo = value => ({
    id: nextTodoId++,
    text: value,
    completed: false,
});

const TodoInput = () => {
    const { todoInput, dispatchTodos, dispatchTodoInput } = useContext(AppContext);
    const $inputEl = useRef(null);

    const createNewTodo = () => {
        const text = todoInput.text.trim();
        if (!text) return;

        if (todoInput.id) {
            dispatchTodos({
                type: 'EDIT_TODO',
                id: todoInput.id,
                text,
            });
        }
        else {
            dispatchTodos({
                type: 'ADD_TODO',
                ...createTodo(text),
            });
        }

        dispatchTodoInput({
            type: 'CLEAR_TODO',
        });

        focusInput();
    };

    const onChange = (e) => dispatchTodoInput({
        type: 'CHANGE_TODO',
        text: e.target.value,
    });

    const focusInput = () =>
        $inputEl.current.focus();

    useEffect(focusInput);

    return (
        <div>
            <input
                placeholder='Add Todo'
                value={todoInput.text}
                onChange={onChange}
                onKeyPress={e =>
                    (e.key === 'Enter') && createNewTodo()
                }
                ref={$inputEl}
            />
            <button
                onClick={createNewTodo}
            >
                {todoInput.id ? 'Edit': 'Add'} Todo
            </button>
        </div>
    );
};

export default TodoInput;
