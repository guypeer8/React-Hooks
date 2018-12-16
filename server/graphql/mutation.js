const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLID,
} = require('graphql');

const Redis = require('../redis/mutation');

const UserType = require('./types/user');
const TodoType = require('./types/todo');

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signUser: {
            type: UserType,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { username, password }) =>
                Redis.signUser(username, password),
        },
        loginUser: {
            type: UserType,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { username, password }) =>
                Redis.loginUser(username, password),
        },
        authenticateUser: {
            type: UserType,
            args: { token: { type: GraphQLNonNull(GraphQLString) } },
            resolve: (_, { token }) =>
                Redis.authenticateUser(token),
        },
        addTodo: {
            type: TodoType,
            args: {
                user_id: { type: GraphQLNonNull(GraphQLID) },
                text: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { user_id, text }) =>
                Redis.addTodo(user_id, text),
        },
        editTodo: {
            type: TodoType,
            args: {
                user_id: { type: GraphQLNonNull(GraphQLID) },
                id: { type: GraphQLNonNull(GraphQLID) },
                text: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { user_id, id, text }) =>
                Redis.editTodo(user_id, id, text),
        },
        toggleTodo: {
            type: TodoType,
            args: {
                user_id: { type: GraphQLNonNull(GraphQLID) },
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve: (_, { user_id, id }) =>
                Redis.toggleTodo(user_id, id),
        },
        deleteTodo: {
            type: TodoType,
            args: { id: { type: GraphQLNonNull(GraphQLID) } },
            resolve: (_, { user_id, id }) =>
                Redis.deleteTodo(user_id, id),
        },
        deleteCompletedTodos: {
            type: new GraphQLList(TodoType),
            args: { user_id: { type: GraphQLNonNull(GraphQLID) } },
            resolve: (_, { user_id }) =>
                Redis.deleteCompletedTodos(user_id),
        },
    },
});

module.exports = MutationType;
