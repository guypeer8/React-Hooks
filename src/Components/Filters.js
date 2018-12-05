import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AppContext from "../Contexts/AppContext";

const filters = ['all', 'active', 'completed'];

const Filters = () => {
    const { dispatchTodos, todos, filter } = useContext(AppContext);

    const isActive = aFilter =>
        aFilter === filter;

    const navigate = (e, filter) =>
        isActive(filter) && e.preventDefault();

    const countActiveTodos = () =>
        todos.filter(({completed}) => !completed).length;

    const countCompletedTodos = () =>
        todos.filter(({completed}) => completed).length;

    const deleteCompleted = () => dispatchTodos({
        type: 'DELETE_COMPLETED',
    });

    return (
        <div>
            <div>
                {filters.map(filter => (
                    <NavLink
                        key={filter}
                        to={`/${filter}`}
                        onClick={e => navigate(e, filter)}
                        style={{
                            color: isActive(filter) ? 'orange' : ''
                        }}
                    >
                        {filter + ' '}
                    </NavLink>
                ))}
            </div>
            <div>
                <p>Active Todos: {countActiveTodos()}</p>
                <p>Completed Todos: {countCompletedTodos()}</p>
                <button
                    onClick={deleteCompleted}
                    disabled={countActiveTodos() === 0}
                >
                    Delete Completed
                </button>
            </div>
        </div>
    );
};

export default Filters;
