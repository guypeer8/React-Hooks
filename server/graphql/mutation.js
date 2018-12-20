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
            resolve: (_, { username, password }, { res }) =>
                Redis.signUser(username, password, res),
        },
        loginUser: {
            type: UserType,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { username, password }, { res }) =>
                Redis.loginUser(username, password, res),
        },
        logoutUser: {
            type: UserType,
            resolve: (_, args, { user, res }) =>
                (user && user.id && res.clearCookie('token')),
        },
        addTodo: {
            type: TodoType,
            args: {
                text: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { text }, { user }) =>
                Redis.addTodo(user.id, text),
        },
        editTodo: {
            type: TodoType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                text: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { id, text }, { user }) =>
                Redis.editTodo(user.id, id, text),
        },
        toggleTodo: {
            type: TodoType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve: (_, { id }, { user }) =>
                Redis.toggleTodo(user.id, id),
        },
        deleteTodo: {
            type: TodoType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve: (_, { id }, { user }) =>
                Redis.deleteTodo(user.id, id),
        },
        deleteCompletedTodos: {
            type: new GraphQLList(TodoType),
            resolve: (_, __, { user }) =>
                Redis.deleteCompletedTodos(user.id),
        },
    },
});

module.exports = MutationType;
