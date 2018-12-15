const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
} = require('graphql');

const Query = require('../redis/query');

const UserType = require('./types/user');
const TodoType = require('./types/todo');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve: (_, { id }) =>
                Query.getUser(id),
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: () =>
                Query.getUsers(),
        },
        todo: {
            type: TodoType,
            args: {
                user_id: { type: GraphQLID },
                todo_id: { type: GraphQLID },
            },
            resolve: (_, { user_id, todo_id }) =>
                Query.getTodo(user_id, todo_id),
        },
        todos: {
            type: new GraphQLList(TodoType),
            args: { user_id: { type: GraphQLID } },
            resolve: (_, { user_id }) =>
                Query.getTodos(user_id),
        },
    },
});

module.exports = RootQuery;
