const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLID,
} = require('graphql');

const Mutation = require('../redis/mutation');

const UserType = require('./types/user');
const TodoType = require('./types/todo');

const MutationType= new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { username, password }) =>
                Mutation.createUser(username, password),
        },
        addTodo: {
            type: TodoType,
            args: {
                user_id: { type: GraphQLNonNull(GraphQLID) },
                text: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { user_id, text }) =>
                Mutation.addTodo(user_id, text),
        },
        editTodo: {
            type: TodoType,
            args: {
                user_id: { type: GraphQLNonNull(GraphQLID) },
                id: { type: GraphQLNonNull(GraphQLID) },
                text: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { user_id, id, text }) =>
                Mutation.editTodo(user_id, id, text),
        },
        toggleTodo: {
            type: TodoType,
            args: {
                user_id: { type: GraphQLNonNull(GraphQLID) },
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve: (_, { user_id, id }) =>
                Mutation.toggleTodo(user_id, id),
        },
        deleteTodo: {
            type: TodoType,
            args: { id: { type: GraphQLNonNull(GraphQLID) } },
            resolve: (_, { user_id, id }) =>
                Mutation.deleteTodo(user_id, id),
        },
        deleteCompletedTodos: {
            type: new GraphQLList(TodoType),
            args: { user_id: { type: GraphQLNonNull(GraphQLID) } },
            resolve: (_, { user_id }) =>
                Mutation.deleteCompletedTodos(user_id),
        },
    },
});

module.exports = MutationType;
