import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Root = () => (
    <Router>
        <Route path='/:filter?' component={App} />
    </Router>
);

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
