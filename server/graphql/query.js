const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
} = require('graphql');

const TodoQuery = require('../redis/query');
const TodoType = require('./types/todo');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        todo: {
            type: TodoType,
            args: { id: { type: GraphQLID } },
            resolve: (_, { id }) =>
                TodoQuery.getTodo(id),
        },
        todos: {
            type: GraphQLList(TodoType),
            resolve: () =>
                TodoQuery.getTodos(),
        },
    },
});

module.exports = RootQuery;
