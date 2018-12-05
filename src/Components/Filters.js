import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AppContext from "../Contexts/AppContext";

const filters = ['all', 'active', 'completed'];

const Filters = () => {
    const context = useContext(AppContext);
    const { todos, filter } = context.data;
    const { dispatchTodos } = context.methods;

    const isActive = aFilter => aFilter === filter;

    const navigate = (e, filter) =>
        isActive(filter) && e.preventDefault();

    const countActiveTodos = () =>
        todos.filter(({completed}) => !completed).length;

    const countCompletedTodos = () =>
        todos.filter(({completed}) => completed).length;

    const deleteCompleted = () => dispatchTodos({
        type: 'DELETE_COMPLETED',
    });

    const active_todos = countActiveTodos();
    const completed_todos = countCompletedTodos();

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
                <button
                    onClick={deleteCompleted}
                    disabled={completed_todos === 0}
                >
                    Delete Completed
                </button>
            </div>
        </div>
    );
};

export default Filters;
