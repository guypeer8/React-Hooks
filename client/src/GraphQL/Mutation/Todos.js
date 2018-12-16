import gql from 'graphql-tag';

export const ADD_TODO = gql`
    mutation ADD_TODO($user_id: ID!, $text: String!) {
        addTodo(user_id: $user_id, text: $text) { 
            id,
            text,
            completed
        }
    }    
`;

export const EDIT_TODO = gql`
   mutation EDIT_TODO($user_id: ID!, $id: ID!, $text: String!) {
        editTodo(user_id: $user_id, id: $id, text: $text) { 
            id,
            text,
            completed
        }
   }  
`;

export const TOGGLE_TODO = gql`
   mutation TOGGLE_TODO($user_id: ID!, $id: ID!) {
        toggleTodo(user_id: $user_id, id: $id) { 
            id,
            text,
            completed
        }
   }  
`;

export const DELETE_TODO = gql`
   mutation DELETE_TODO($user_id: ID!, $id: ID!) {
        deleteTodo(user_id: $user_id, id: $id) {
            id,
        }
   }
`;

export const DELETE_COMPLETED_TODOS = gql`
   mutation DELETE_COMPLETED_TODOS($user_id: ID!) {
        deleteCompletedTodos(user_id: $user_id) {
            id,
        }
   }
`;
