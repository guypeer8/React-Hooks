import React, { useReducer } from 'react';
import './App.css';

import TodoInput from './Components/TodoInput';
import Todos from './Components/Todos';
import Filters from './Components/Filters';

import AppContext from './Contexts/AppContext';
import FiltersContext from './Contexts/FiltersContext';

import todosReducer from './Reducers/TodosReducer';

export const App = ({ match: { params } }) => {
    const [todos, dispatch] = useReducer(todosReducer, []);

    return (
        <AppContext.Provider value={dispatch}>
            <FiltersContext.Provider value={params.filter || 'all'}>
                <div className='App'>
                    <header className='App-header'>
                        <TodoInput />
                        <Todos todos={todos} />
                        <Filters />
                    </header>
                </div>
            </FiltersContext.Provider>
        </AppContext.Provider>
    );
}


