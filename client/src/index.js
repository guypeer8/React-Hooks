import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import GraphQL from './Components/Providers/GraphQL';
import Store from './Components/Providers/Store';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import PrivateRoute from './Components/Auth/PrivateRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Root = () => (
    <GraphQL>
        <Store>
            <div className='App'>
                <Router>
                    <Switch>
                        <Route path='/signup' exact component={Signup} />
                        <Route path='/login' exact component={Login} />
                        <PrivateRoute path='/:filter?' component={App} />
                    </Switch>
                </Router>
            </div>
        </Store>
    </GraphQL>
);

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
