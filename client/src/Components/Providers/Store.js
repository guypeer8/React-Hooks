import React, {createContext, useContext, useReducer} from 'react';
import todoInputReducer from "../../Reducers/TodoInputReducer";
import todosReducer from "../../Reducers/TodosReducer";

const StoreContext = createContext(null);

const StoreProvider = ({ children, routeParams }) => {
    const [todos, dispatchTodos] = useReducer(
        todosReducer,
        []
    );

    const [todoInput, dispatchTodoInput] = useReducer(
        todoInputReducer,
        {id: null, text: ''}
    );

    const store = {
        state: {
            todoInput,
            todos,
            filter: routeParams.filter || 'all',
        },
        dispatch: {
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
