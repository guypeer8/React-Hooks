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

    return (
        <AppContext.Provider value={{
            dispatchTodos,
            dispatchTodoInput,
            todoInput,
            todos,
            filter: params.filter || 'all',
        }}>
            <div className='App'>
                <header className='App-header'>
                    <TodoInput />
                    <Todos />
                    <Filters />
                </header>
            </div>
        </AppContext.Provider>
    );
}


