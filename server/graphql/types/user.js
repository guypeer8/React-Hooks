const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLID,
} = require('graphql');

const TodoType = require('./todo');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        todos: {
            type: new GraphQLList(TodoType),
            resolve: (_, __, { user, dataLoaders: { todosLoader } }) =>
                todosLoader.load(`todos:${user.id}`),
        },
    }),
});

module.exports = UserType;
