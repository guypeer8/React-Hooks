import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GraphQL from './Components/Providers/GraphQL';
import Store from './Components/Providers/Store';
import Index from './Components/Index';

const Root = () => (
    <GraphQL>
        <Store>
            <Index/>
        </Store>
    </GraphQL>
);

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
