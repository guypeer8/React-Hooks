import gql from 'graphql-tag';

export const GET_USER = gql`
    query GET_USER($id: ID!) {
        user(id: $id) {
            id,
            username,
            password
            todos {
                id,
                text,
                completed
            }
        }
    }
`;

export const GET_TODOS = gql`
    query GET_TODOS($user_id: ID!) {
        todos(user_id: $user_id) {
            id,
            text,
            completed
        }
    }
`;

export const GET_TODO = gql`
    query GET_TODO($id: ID!) {
        todo(id: $id) {  
            id,
            text,
            completed
        }
    }
`;
