const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat
} = require('graphql');
const GraphQLDate = require('graphql-date');

module.exports = new GraphQLObjectType({
    name: 'NetworkOutput',
    fields: {
        _id: { type: GraphQLString },
        symbol: { type: GraphQLString },
        result: { type: GraphQLFloat },
        createdAt: { type: GraphQLDate }
    }
});
