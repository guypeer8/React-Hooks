import React from 'react';
import { Mutation } from 'react-apollo';
import { NavLink } from 'react-router-dom';
import { getStore } from './Providers/Store';
import { DELETE_COMPLETED_TODOS } from '../GraphQL/Mutation';

const filters = ['all', 'active', 'completed'];

const Filters = () => {
    const { state, dispatch } = getStore();

    const isActive = aFilter =>
        aFilter === state.filter;

    const navigate = (e, filter) =>
        isActive(filter) && e.preventDefault();

    const countActiveTodos = () =>
        state.todos.filter(({completed}) => !completed).length;

    const countCompletedTodos = () =>
        state.todos.filter(({completed}) => completed).length;

    const active_todos = countActiveTodos();
    const completed_todos = countCompletedTodos();

    const postDeleteCompleted = () => dispatch.todos({
        type: 'DELETE_COMPLETED',
    });

    return (
        <div className='Footer'>
            <div className='Filters'>
                {filters.map(filter => (
                    <NavLink
                        key={filter}
                        to={`/${filter}`}
                        onClick={e => navigate(e, filter)}
                        className={isActive(filter) ? 'Active' : ''}
                    >
                        {filter}
                    </NavLink>
                ))}
            </div>
            <div className='Info'>
                <p>Active Todos: {active_todos}</p>
                <p>Completed Todos: {completed_todos}</p>
            </div>
            <div className='Actions'>
                <Mutation
                    mutation={DELETE_COMPLETED_TODOS}
                    onCompleted={postDeleteCompleted}
                >
                    {(deleteCompleted, { loading }) =>
                        <button
                            onClick={deleteCompleted}
                            disabled={loading || (completed_todos === 0)}
                        >
                            Delete Completed
                        </button>
                    }
                </Mutation>
            </div>
        </div>
    );
};

export default Filters;
