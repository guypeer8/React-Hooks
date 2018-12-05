import React, { useReducer } from 'react';
import './App.css';

import TodoInput from './Components/TodoInput';
import Todos from './Components/Todos';
import Filters from './Components/Filters';

import AppContext from './Contexts/AppContext';

import todosReducer from './Reducers/TodosReducer';
import todoInputReducer from './Reducers/TodoInputReducer';

export const App = ({ match: { params } }) => {
    const [todos, dispatchTodos] = useReducer(todosReducer, []);
    const [todoInput, dispatchTodoInput] = useReducer(
        todoInputReducer,
        {id: null, text: ''}
    );

    const context = {
        data: {
            todoInput,
            todos,
            filter: params.filter || 'all',
        },
        methods: {
            dispatchTodos,
            dispatchTodoInput,
        },
    };

    return (
        <AppContext.Provider value={context}>
            <div className='App'>
                <TodoInput />
                <Todos />
                <Filters />
            </div>
        </AppContext.Provider>
    );
}


