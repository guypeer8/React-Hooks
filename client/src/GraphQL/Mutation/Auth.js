import gql from 'graphql-tag';

export const SIGN_USER = gql`
  mutation SIGN_USER($username: String!, $password: String!) {
      signUser(username: $username, password: $password) {
        id,
        username,
      }
    }  
`;

export const LOGIN_USER = gql`
  mutation LOGIN_USER($username: String!, $password: String!) {
      loginUser(username: $username, password: $password) {
        id,
        username,
      }
    }  
`;

export const LOGOUT_USER = gql`
    mutation LOGOUT_USER {
        logoutUser {
            id
        }
    }
`;
