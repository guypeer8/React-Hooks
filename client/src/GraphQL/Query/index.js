import gql from 'graphql-tag';

export const GET_USER = gql`
    query GET_USER {
        user {
            id,
            username
        }
    }
`;

export const GET_TODOS = gql`
    query GET_TODOS {
        todos {
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
