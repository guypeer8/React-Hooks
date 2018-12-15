import React, {createContext, useContext, useReducer} from 'react';
import todoInputReducer from '../../Reducers/TodoInputReducer';
import todosReducer from '../../Reducers/TodosReducer';
import authReducer from '../../Reducers/AuthReducer';

const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
    const [auth, dispatchAuth] = useReducer(
        authReducer,
        {username: '', password: '', confirm: '', error: {type: '', message: ''}, is_logged_in: false}
    );

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
