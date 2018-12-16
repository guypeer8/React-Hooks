const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
} = require('graphql');

const Redis = require('../redis/query');

const UserType = require('./types/user');
const TodoType = require('./types/todo');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve: (_, { id }) =>
                Redis.getUser(id),
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: () =>
                Redis.getUsers(),
        },
        todo: {
            type: TodoType,
            args: {
                user_id: { type: GraphQLID },
                todo_id: { type: GraphQLID },
            },
            resolve: (_, { user_id, todo_id }) =>
                Redis.getTodo(user_id, todo_id),
        },
        todos: {
            type: new GraphQLList(TodoType),
            args: { user_id: { type: GraphQLID } },
            resolve: (_, { user_id }) =>
                Redis.getTodos(user_id),
        },
    },
});

module.exports = RootQuery;
