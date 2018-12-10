const { GraphQLSchema } = require('graphql');

const Mutation = require('./mutation');
const Query = require('./query');

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
