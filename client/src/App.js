import React from 'react';
import './App.css';

// Providers
import GraphQL from './Components/Providers/GraphQL';
import Store from './Components/Providers/Store';

// Components
import TodoInput from './Components/TodoInput';
import Todos from './Components/Todos';
import Filters from './Components/Filters';

export const App = ({ match: { params } }) => (
    <GraphQL>
        <Store routeParams={params}>
            <div className='App'>
                <TodoInput />
                <Todos />
                <Filters />
            </div>
        </Store>
    </GraphQL>
);


