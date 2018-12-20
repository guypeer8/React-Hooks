const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLID,
} = require('graphql');

const Redis = require('../../redis/query');
const TodoType = require('./todo');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        todos: {
            type: new GraphQLList(TodoType),
            resolve: (_, __, { user }) =>
                Redis.getTodos(user.id),
        },
    }),
});

module.exports = UserType;
