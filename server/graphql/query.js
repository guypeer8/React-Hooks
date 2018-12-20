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
            resolve: (_, __, { user }) =>
                (user && user.id) ? Redis.getUser(user.id) : null,
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: () =>
                Redis.getUsers(),
        },
        todo: {
            type: TodoType,
            args: {
                todo_id: { type: GraphQLID },
            },
            resolve: (_, { todo_id }, { user }) =>
                Redis.getTodo(user.id, todo_id),
        },
        todos: {
            type: new GraphQLList(TodoType),
            resolve: (_, __, { user }) =>
                Redis.getTodos(user.id),
        },
    },
});

module.exports = RootQuery;
