import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import FiltersContext from '../Contexts/FiltersContext';

const filters = ['all', 'active', 'completed'];

const Filters = () => {
    const currentFilter = useContext(FiltersContext);

    const isActive = filter => currentFilter === filter;

    const navigate = (e, filter) =>
        isActive(filter) && e.preventDefault();

    return (
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
    );
};

export default Filters;
