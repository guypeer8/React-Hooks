import React, { useContext } from 'react';
import { useFormInput }  from '../Helpers/State-Helpers';
import AppContext from '../Contexts/AppContext';

let nextTodoId = 1;

const TodoInput = () => {
    const {value, setValue, onChange} = useFormInput('');
    const dispatch = useContext(AppContext);

    function createNewTodo() {
        dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: value,
            completed: false,
        });
        setValue('');
    }

    return (
        <div>
            <input
                placeholder='Add Todo'
                value={value}
                onChange={onChange}
            />
            <button
                onClick={createNewTodo}
            >
                Add Todo
            </button>
        </div>
    );
};

export default TodoInput;
