const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} = require('graphql');

const GraphQLDate = require('graphql-date');

module.exports = new GraphQLObjectType({
    name: 'Tweet',
    fields: {
        _id: { type: GraphQLString },
        key: { type: GraphQLString },
        date: { type: GraphQLDate },
        symbol: { type: GraphQLString },
        text: { type: GraphQLString },
        screen_name: { type: GraphQLString },
        followers_count: { type: GraphQLInt },
        absolute_sentiment: { type: GraphQLInt },
        relative_sentiment: { type: GraphQLInt }
    }
});
