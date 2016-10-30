const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} = require('graphql');

const GraphQLDate = require('graphql-date');

module.exports = new GraphQLObjectType({
    name: 'Article',
    fields: {
        _id: { type: GraphQLString },
        date: { type: GraphQLDate },
        symbol: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        url: { type: GraphQLString },
        sentiment: { type: GraphQLInt }
    }
});
