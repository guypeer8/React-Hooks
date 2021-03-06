import React from 'react';
import { Query } from 'react-apollo';
import Todo from './Todo';
import { getStore } from '../Providers/Store';
import { GET_TODOS } from '../../GraphQL/Query';

const Todos = ({ filter }) => {
    const { state, dispatch } = getStore();

    if (state.todos.fetched) {
        const visibleTodos = getVisibleTodos(state.todos.data, filter);
        if (visibleTodos.length === 0)
            return null;

        return (
            <ul className='Todos-Container'>
                <div className='Todos-List'>
                    <TodosHeader />
                    {visibleTodos.map((todo, index) =>
                        <Todo
                            key={todo.id}
                            {...todo}
                            index={index + 1}
                        />
                    )}
                </div>
            </ul>
        );
    }

    return (
        <Query
            query={GET_TODOS}
            variables={{
                user_id: state.auth.id,
            }}
        >
            {({ data: { todos }, loading, error }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>{error.message}</div>;

                dispatch.todos({ type: 'SET_FETCHED' });
                dispatch.todos({
                    type: 'APPEND_TODOS',
                    todos,
                });

                return null;
            }}
        </Query>
    );
};

const TodosHeader = () => (
    <>
        <li className='Todos-Header'>
            <span>#.</span>
            <span>Status</span>
            <span>Todo</span>
            <span>Delete</span>
        </li>
        <hr />
    </>
);

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'active':
            return todos.filter(({completed}) => !completed);
        case 'completed':
            return todos.filter(({completed}) => completed);
        default:
            return todos;
    }
};

export default Todos;
