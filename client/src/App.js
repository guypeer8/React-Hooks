import React from 'react';
import './App.css';

import TodoInput from './Components/Todos/TodoInput';
import Todos from './Components/Todos/Todos';
import Filters from './Components/Todos/Filters';

export const App = ({ match: { params: { filter = 'all' } } }) => (
    <div>
        <TodoInput />
        <Todos filter={filter} />
        <Filters filter={filter} />
    </div>
);
