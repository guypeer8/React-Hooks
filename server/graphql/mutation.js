const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
} = require('graphql');

const TodoMutation = require('../redis/mutation');
const TodoType = require('./types/todo');

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTodo: {
            type: TodoType,
            args: {
                text: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { text }) =>
                TodoMutation.addTodo(text),
        },
        editTodo: {
            type: TodoType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                text: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { id, text }) =>
                TodoMutation.editTodo(id, text),
        },
        toggleTodo: {
            type: TodoType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                completed: { type: GraphQLNonNull(GraphQLBoolean) },
            },
            resolve: (_, { id }) =>
                TodoMutation.toggleTodo(id),
        },
        deleteTodo: {
            type: TodoType,
            args: { id: { type: GraphQLNonNull(GraphQLID) } },
            resolve: (_, { id }) =>
                TodoMutation.deleteTodo(id),
        },
        deleteCompletedTodos: {
            type: TodoType,
            resolve: () =>
                TodoMutation.deleteCompletedTodos(),
        },
    },
});

module.exports = Mutation;
