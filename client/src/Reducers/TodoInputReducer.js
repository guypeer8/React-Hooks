import { TODO_INPUT as initialState } from './InitialState';

const todoInputReducer = (todoInput = initialState, action) => {
    switch (action.type) {
        case 'START_EDIT':
            return {
                ...todoInput,
                id: action.id,
                text: action.text,
            };

        case 'CHANGE_TODO':
            return {
                ...todoInput,
                text: action.text,
            };

        case 'CLEAR_TODO':
            return initialState;

        default:
            return todoInput;
    }
};

export default todoInputReducer;
