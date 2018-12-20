import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import GraphQL from './Components/Providers/GraphQL';
import Store from './Components/Providers/Store';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import Navbar from './Components/Presentation/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Root = () => (
    <GraphQL>
        <Store>
            <Navbar />
            <div className='App'>
                <Router>
                    <Switch>
                        <Route path='/signup' component={Signup} />
                        <Route path='/login' component={Login} />
                        <ProtectedRoute path='/:filter?' component={App} />
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
