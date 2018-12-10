const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
} = require('graphql');

const TodoType = new GraphQLObjectType({
    name: 'TodoType',
    fields: () => ({
        id: { type: GraphQLID },
        text: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
    }),
});

module.exports = TodoType;
