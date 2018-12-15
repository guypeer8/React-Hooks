import React from 'react';
import './App.css';

import TodoInput from './Components/App/TodoInput';
import Todos from './Components/App/Todos';
import Filters from './Components/App/Filters';

export const App = ({ history: { location: { pathname } } }) => {
    const filter = pathname.slice(1);

    return (
        <div>
            <TodoInput/>
            <Todos filter={filter}/>
            <Filters filter={filter}/>
        </div>
    );
};
