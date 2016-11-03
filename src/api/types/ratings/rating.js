const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

const GraphQLDate = require('graphql-date');

module.exports = new GraphQLObjectType({
    name: 'Rating',
    fields: {
        _id: { type: GraphQLString },
        date: { type: GraphQLDate },
        symbol: { type: GraphQLString },
        firmKey: { type: GraphQLString },
        firmFullText: { type: GraphQLString },
        value: { type: GraphQLString }
    }
});
