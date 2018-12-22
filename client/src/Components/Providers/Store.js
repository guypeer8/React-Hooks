import React, {createContext, useContext, useReducer} from 'react';
import todoInputReducer from '../../Reducers/TodoInputReducer';
import todosReducer from '../../Reducers/TodosReducer';
import authReducer from '../../Reducers/AuthReducer';
import {
    AUTH as initialAuthState,
    TODO_INPUT as initialTodoInputState,
    TODOS as initialTodosState,
} from '../../Reducers/InitialState';

const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
    const [auth, dispatchAuth] = useReducer(authReducer, initialAuthState);
    const [todos, dispatchTodos] = useReducer(todosReducer, initialTodosState);
    const [todoInput, dispatchTodoInput] = useReducer(todoInputReducer, initialTodoInputState);

    const store = {
        state: {
            auth,
            todoInput,
            todos,
        },
        dispatch: {
            auth: dispatchAuth,
            todoInput: dispatchTodoInput,
            todos: dispatchTodos,
        },
    };

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};

export const getStore = () =>
    useContext(StoreContext);

export default StoreProvider;
