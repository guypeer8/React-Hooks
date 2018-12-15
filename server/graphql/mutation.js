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
                text: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: ({ id }, { text }) =>
                Mutation.addTodo(id, text),
        },
        editTodo: {
            type: TodoType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                text: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (user, { id, text }) =>
                Mutation.editTodo(user.id, id, text),
        },
        toggleTodo: {
            type: TodoType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve: (user, { id }) =>
                Mutation.toggleTodo(user.id, id),
        },
        deleteTodo: {
            type: TodoType,
            args: { id: { type: GraphQLNonNull(GraphQLID) } },
            resolve: (user, { id }) =>
                Mutation.deleteTodo(user.id, id),
        },
        deleteCompletedTodos: {
            type: new GraphQLList(TodoType),
            resolve: ({ id }) =>
                Mutation.deleteCompletedTodos(id),
        },
    },
});

module.exports = MutationType;
