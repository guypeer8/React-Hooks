import gql from 'graphql-tag';

export const ADD_TODO = gql`
    mutation ADD_TODO($text: String!) {
        addTodo(text: $text) { 
            id,
            text,
            completed
        }
    }    
`;

export const EDIT_TODO = gql`
   mutation EDIT_TODO($id: ID!, $text: String!) {
        editTodo(id: $id, text: $text) { 
            id,
            text,
            completed
        }
   }  
`;

export const TOGGLE_TODO = gql`
   mutation TOGGLE_TODO($id: ID!) {
        toggleTodo(id: $id) { 
            id,
            text,
            completed
        }
   }  
`;

export const DELETE_TODO = gql`
   mutation DELETE_TODO($id: ID!) {
        deleteTodo(id: $id) {
            id,
            text,
            completed
        }
   }
`;

export const DELETE_COMPLETED_TODOS = gql`
   mutation DELETE_COMPLETED_TODOS {
        deleteCompletedTodos {
            id,
            text,
            completed
        }
   }
`;
